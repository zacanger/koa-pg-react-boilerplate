import type { Generated } from 'kysely'
import { Kysely, PostgresDialect } from 'kysely'
import * as pg from 'pg'

export interface Schema {
  boilerplate: {
    stuff: string
    id: Generated<number>
  }
}


const getDb = () => {
  const dialect = new PostgresDialect({
    pool: new pg.Pool({
      password: process.env.POSTGRES_PASSWORD ?? 'password',
      database: process.env.POSTGRES_DB ?? 'database',
      host: process.env.POSTGRES_HOST ?? 'db',
      user: process.env.POSTGRES_USER ?? 'username',
      port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
      max: 10,
    })
  })

  return new Kysely<Schema>({
    dialect,
  })
}

export const db = getDb()

export const setupDb = async (): Promise<void> => {
  await db.schema.createTable('boilerplate')
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('stuff', 'jsonb', (cb) => cb.notNull())
    .execute()
}
