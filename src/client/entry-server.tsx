import type * as Koa from 'koa'
import ReactDomServer from 'react-dom/server'
import { StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { App } from './app'
import { routes } from './routes'

export const render = async (ctx: Koa.Context) => {
  const helmetContext = {}

  const { query, dataRoutes } = createStaticHandler(routes)
  const remixRequest = createFetchRequest(ctx)
  const context = await query(remixRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  const html = ReactDomServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <App>
        <StaticRouterProvider
          router={router}
          context={context}
          nonce='the-nonce'
        />
      </App>
    </HelmetProvider>
  )

  return { html, ...helmetContext }
}

export const createFetchRequest = (ctx: Koa.Context): Request => {
  const origin = `${ctx.protocol}://${ctx.host}`
  const url = new URL(ctx.originalUrl || ctx.url, origin)

  const controller = new AbortController()
  const headers = new Headers()

  for (const [key, values] of Object.entries(ctx.header)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init: RequestInit = {
    method: ctx.req.method,
    headers,
    signal: controller.signal,
  }

  if (ctx.req.method !== 'GET' && ctx.req.method !== 'HEAD') {
    init.body = ctx.request.body as BodyInit
  }

  return new Request(url.href, init)
}
