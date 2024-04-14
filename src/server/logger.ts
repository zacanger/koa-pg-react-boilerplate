import * as winston from 'winston'
import koaWinston from 'koa-logger-winston'
import * as pkg from '../../package.json'
import type * as Koa from 'koa'

const isLive = (): boolean =>
  !!(process.env.KUBERNETES_SERVICE_HOST || process.env.GITHUB_SHA)

const defaultLogLevel = isLive() ? 'info' : 'debug'

export const log = winston.createLogger({
  level: (process.env.LOG_LEVEL || defaultLogLevel),
  format: isLive() ? winston.format.json() : winston.format.cli(),
  defaultMeta: { service: pkg.name, version: pkg.version },
  transports: [
    new winston.transports.Console({
      format: isLive() ? winston.format.json() : winston.format.cli(),
    }),
  ],
})

const setLogger = (app: Koa): void => {
  app.use(
    async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
      ctx.log = log
      await next()
    }
  )
}

export const logger = (app: Koa): void => {
  app.on('error', (err: Error): void => {
    log.error(err)
  })

  app.use(koaWinston(log))
  setLogger(app)
}
