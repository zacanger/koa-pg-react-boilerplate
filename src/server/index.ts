import * as http from 'node:http'
import Koa from 'koa'
import dnsCache from 'dnscache'
import { log } from './logger'
import { setupDb } from './db'
import { apiRoutes } from './routes'
import { mid } from './mid'
import { port, isTest } from './utils'

export const app: Koa = new Koa()

void mid(app)
app.use(apiRoutes.routes())

const setupServer = async (httpServer: http.Server): Promise<void> => {
  dnsCache({
    enable: true,
    ttl: 300,
    cachesize: 1000
  })

  // @ts-expect-error yes it does
  http.globalAgent.keepAlive = true
  // @ts-expect-error yes it does
  http.globalAgent.keepAliveMsecs = 60000

  process.on('unhandledRejection', console.error)

  process.on('SIGTERM', () => {
    httpServer.close(() => {
      process.exit(0)
    })
  })
}

const main = async (): Promise<void> => {
  await setupDb()
  const handler = app.callback()
  const server = http.createServer((req, res) => {
    void handler(req, res)
  })

  await setupServer(server)

  server.listen(port, () => {
    log.info(`example listening on ${port}`)
  })
}

if (!isTest) {
  void main()
}
