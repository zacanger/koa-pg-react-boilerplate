import type * as Koa from 'koa'
import compression from 'koa-compress'
import body from 'koa-bodyparser'
import cookie from 'koa-cookie'
import logger from './logger'
import helmet from 'koa-helmet'
import lower from 'koa-lowercase'
import Router from '@koa/router'
import serve from 'koa-simple-static'
import { renderPage } from 'vike'
import connect from 'koa-connect'
import vite from 'vite'
import { resolve } from 'node:path'

const root: string = process.cwd()
const isProd = process.env.NODE_ENV === 'production'
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

export const setupClientServer = async (
  app: Koa<Koa.DefaultState, Koa.DefaultContext>
) => {
  const router = new Router()
  if (isProd) {
    app.use(serve({ dir: resolve(__dirname, '..', 'client') }))
  } else {
    const viteDevMiddleware = (await vite.createServer({
      root,
      server: { middlewareMode: true }
    })).middlewares
    app.use(connect(viteDevMiddleware))
  }

  router.get('(.*)', async (ctx: Koa.Context, next: Koa.Next) => {
    const pageContextInit = { urlOriginal: ctx.originalUrl, }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) {
      return next()
    }

    ctx.status = httpResponse.statusCode
    ctx.type = httpResponse.contentType
    ctx.body = httpResponse.body
  })
  app.use(router.routes())
}

export const mid = async (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  app.use(body())
  app.use(cookie())
  await setupClientServer(app)
  app.use(helmet())
  app.use(lower)
  app.use(compression())
  app.use(errorHandler)
  logger(app)
}
