import * as http from 'node:http'
import cluster from 'node:cluster'
import Koa from 'koa'
import { log } from './logger'
import { setupDb } from './db'
import { apiRoutes } from './routes'
import { mid } from './mid'

export const app: Koa = new Koa()
const isTest = process.env.NODE_ENV === 'test'
const port = process.env.PORT ?? 3000

void mid(app)
app.use(apiRoutes.routes())

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
