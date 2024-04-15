import { describe, it, beforeEach, afterEach } from 'node:test'
import * as assert from 'node:assert'
import * as http from 'node:http'
import request from 'supertest'
import { app } from '../'

void describe.skip('example', async () => {
  let server: http.Server | null = null

  beforeEach(() => {
    server = http.createServer(app.callback())
  })

  afterEach(() => {
    server!.close()
  })

  await it('/api/params-example/foo', async () => {
    const res = await request(server!).get('/api/params-example/foo')
    assert.equal(res.status, 200)
    assert.equal(res.body, 'foo')
  })

  await it('/api/hash', async () => {
    const res = await request(server!).get('/api/guid')
    assert.equal(res.status, 200)
    assert.equal(typeof res.body, 'string')
  })

  await it('/api/data', async () => {
    const res = await request(server!).post('/api/data').send({ a: 1 })
    assert.equal(res.status, 200)
    assert.equal(res.body.ok, 'yup')
  })
})
