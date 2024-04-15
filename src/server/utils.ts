export const isTest = process.env.NODE_ENV === 'test'
export const port = process.env.PORT ?? 3000
export const isProd = process.env.NODE_ENV === 'production'
export const root: string = process.cwd()

export class MockDb {
  insertInto = (_t: string) => this
  values = (_v: any) => this
  executeTakeFirst = () => this
}
