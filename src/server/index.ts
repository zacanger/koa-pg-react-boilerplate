import * as fs from 'node:fs'
import * as path from 'node:path'
import * as http from 'node:http'
import { resolve } from 'node:path'
import cluster from 'node:cluster'
import Koa from 'koa'
import Router from '@koa/router'
import body from 'koa-bodyparser'
import lower from 'koa-lowercase'
import cookie from 'koa-cookie'
import helmet from 'koa-helmet'
import serve from 'koa-simple-static'
import { timeBasedGuid } from './utils'
import logger, { log } from './logger'
import * as pg from 'pg'

export const app: Koa = new Koa()

const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST
const port = process.env.PORT ?? 3000
const router = new Router()
const root: string = process.cwd()
const pgUser = process.env.POSTGRES_USER ?? 'username'
const pgPass = process.env.POSTGRES_PASSWORD ?? 'password'
const pgHost = process.env.POSTGRES_HOST ?? 'db'
const pgDb = process.env.POSTGRES_DB ?? 'database'
const pgPort = parseInt(process.env.POSTGRES_PORT ?? '5432', 10)
const isProd = process.env.NODE_ENV === 'production'

const indexHtml = isProd
  ? fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8')
  : ''

const fakePg = {
  query: async (..._args: any[]): Promise<null> => null,
  connect: async (): Promise<null> => null
}

const db = isTest
  ? fakePg
  : new pg.Client({
    database: pgDb,
    host: pgHost,
    password: pgPass,
    port: pgPort,
    user: pgUser
  })

router.get('/guid', async (ctx: Koa.Context) => {
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(timeBasedGuid())
})

router.post('/data', async (ctx: Koa.Context) => {
  try {
    await db.query(
      'insert into boilerplate (stuff) values($1)',
      [JSON.stringify(ctx.request.body)]
    )

    ctx.type = 'application/json'
    ctx.body = { ok: 'yup' }
  } catch (e) {
    ctx.body = e
  }
})

router.get('/params-example/:anything', async (ctx: Koa.Context) => {
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(ctx.params.anything)
})

const errorHandler = async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
  try {
    await next()
  } catch (err: any) {
    ctx.status = err.status ?? 500
    ctx.app.emit('error', err, ctx)
    ctx.body = err
  }
}

app.use(body())
app.use(cookie())
app.use(helmet())
app.use(lower)
app.use(router.routes())
if (isProd) app.use(serve({ dir: resolve(__dirname, '..', 'client') }))
app.use(errorHandler)
logger(app)

let vite: any
app.use(async (ctx: Koa.Context) => {
  try {
    const url = ctx.originalUrl

    let template
    let render

    if (!isProd) {
      template = fs.readFileSync(path.resolve(root, 'index.html'), 'utf8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).default.render
    }

    if (isProd) {
      template = indexHtml
      // @ts-expect-error TODO:
      render = (await import('../entry/entry-server.js')).default.render
    }

    const context: any = {}
    const appHtml = await render(ctx.req)
    const { helmet } = appHtml

    if (context.url) {
      ctx.status = 301
      ctx.url = context.url
      return

    }

    let html = template.replace('<!--app-html-->', appHtml.html)

    const helmetData = `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${helmet.style.toString()}
    `

    html = html.replace('<!--app-head-->', helmetData)
    html = html.replace('<!--app-scripts-->', helmet.script.toString())

    ctx.status = 200
    ctx.type = 'text/html'
    ctx.body = html
  } catch (e: any) {
    !isProd && vite.ssrFixStacktrace(e)
    console.error(e.stack)
    ctx.status = 500
    ctx.body = e.stack
  }
})
if (!isProd) {
  vite = await (await import('vite')).createServer({
    root,
    logLevel: isTest ? 'error' : 'info',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100
      }
    },
    appType: 'custom'
  })

  app.use(vite.middlewares)
}

const setupDb = async (): Promise<void> => {
  await db.connect()
  await db.query(`
   create table if not exists boilerplate(
     id serial,
     stuff jsonb
   )
  `)
}

const main = async (): Promise<void> => {
  await setupDb()
  const handler = app.callback()
  const server = http.createServer((req, res) => {
    void handler(req, res)
  })

  server.listen(port, () => {
    log.info(`example ${cluster?.worker?.id ?? 0} listening on ${port}`)
  })

  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0)
    })
  })
}

if (!isTest) {
  main()
}
