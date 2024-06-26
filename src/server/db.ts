import { Kysely, PostgresDialect } from 'kysely'
import * as pg from 'pg'
import { isTest, MockDb } from './utils'
import type { Generated } from 'kysely'

export interface Schema {
  boilerplate: {
    stuff: string
    id: Generated<number>
  }
}

const getConn = () => ({
  password: process.env.POSTGRES_PASSWORD ?? 'password',
  database: process.env.POSTGRES_DB ?? 'database',
  host: process.env.POSTGRES_HOST ?? 'db',
  user: process.env.POSTGRES_USER ?? 'username',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  max: 10,
})

const getDb = () => {
  if (isTest) {
    return new MockDb()
  }

  const dialect = new PostgresDialect({
    pool: new pg.Pool(getConn())
  })

  return new Kysely<Schema>({
    dialect,
  })
}

export const db = getDb()

export const setupDb = async (): Promise<void> => {
  const p = new pg.Client(getConn())
  await p.connect()
  await p.query(/* sql */`
    create table if not exists boilerplate(
      id serial,
      stuff jsonb
    )
   `)
}
