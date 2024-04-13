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
import { Kysely, PostgresDialect } from 'kysely'
import type { Generated } from 'kysely'

export const app: Koa = new Koa()

const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST
const port = process.env.PORT ?? 3000
const router = new Router()
const root: string = process.cwd()

const isProd = process.env.NODE_ENV === 'production'

const indexHtml = isProd
  ? fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8')
  : ''

interface Schema {
  boilerplate: {
    stuff: string
    id: Generated<number>
  }
}

const getDb = () => {
  const dialect = new PostgresDialect({
    pool: new pg.Pool({
      password: process.env.POSTGRES_PASSWORD ?? 'password',
      database: process.env.POSTGRES_DB ?? 'database',
      host: process.env.POSTGRES_HOST ?? 'db',
      user: process.env.POSTGRES_USER ?? 'username',
      port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
      max: 10,
    })
  })

  return new Kysely<Schema>({
    dialect,
  })
}

const db = getDb()

const setupDb = async (): Promise<void> => {
  await db.schema.createTable('boilerplate')
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('stuff', 'jsonb', (cb) => cb.notNull())
    .execute()
}

router.get('/guid', async (ctx: Koa.Context) => {
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(timeBasedGuid())
})

router.post('/data', async (ctx: Koa.Context) => {
  try {
    await db
      .insertInto('boilerplate')
      .values({ stuff: JSON.stringify(ctx.request.body) })
      .executeTakeFirst()
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

const errorHandler = async (
  ctx: Koa.Context,
  next: Koa.Next
): Promise<void> => {
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

app.use(async (ctx: Koa.Context) => {
  let vite: any
  try {
    const url = ctx.originalUrl

    let template
    let render
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

    if (!isProd) {
      template = await fs.promises.readFile(path.resolve(root, 'index.html'), 'utf8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule(resolve(root, '/src/client/entry-server.tsx'))).render
    }

    if (isProd) {
      template = indexHtml
      // @ts-expect-error TODO:
      render = (await import('../entry/entry-server.js')).render
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
  void main()
}
