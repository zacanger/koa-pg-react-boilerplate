import type * as Koa from 'koa'
import Router from '@koa/router'
import { timeBasedGuid } from './utils'
import { db } from './db'

export const apiRoutes = new Router({ prefix: '/api' })

apiRoutes.get('/guid', async (ctx: Koa.Context) => {
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(timeBasedGuid())
})

apiRoutes.get('/params-example/:anything', async (ctx: Koa.Context) => {
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(ctx.params.anything)
})

apiRoutes.post('/data', async (ctx: Koa.Context) => {
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
