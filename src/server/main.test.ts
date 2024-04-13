import { describe, it, beforeEach, afterEach } from 'node:test'
import * as assert from 'node:assert'
import * as http from 'node:http'
import request from 'supertest'
import { app } from './main'

void describe('example', async () => {
  let server: http.Server | null = null

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    server = http.createServer(app.callback())
  })

  afterEach(() => {
    server!.close()
  })

  await it('/params-example/foo', async () => {
    const res = await request(server!).get('/params-example/foo')
    assert.equal(res.status, 200)
    assert.equal(res.body, 'foo')
  })

  await it('/hash', async () => {
    const res = await request(server!).get('/guid')
    assert.equal(res.status, 200)
    assert.equal(typeof res.body, 'string')
  })

  await it('/data', async () => {
    const res = await request(server!).post('/data').send({ a: 1 })
    assert.equal(res.status, 200)
    assert.equal(res.body.ok, 'yup')
  })
})
