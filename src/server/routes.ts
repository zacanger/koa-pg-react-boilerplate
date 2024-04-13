import type * as Koa from 'koa'
import Router from '@koa/router'
import { db } from './db'
import * as pkg from '../../package.json'
import { getFreeMemory, getHashFromDate } from 'zeelib'

export const apiRoutes = new Router({ prefix: '/api' })

apiRoutes.get('/diag', async (ctx: Koa.Context) => {
  ctx.type = 'application/json'
  ctx.body = {
    version: pkg.version,
    name: pkg.name,
    free: getFreeMemory(),
  }
})

apiRoutes.get('/hash', async (ctx: Koa.Context) => {
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(getHashFromDate())
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
