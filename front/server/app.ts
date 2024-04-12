import type { Router } from 'express'
import express from 'express'
class App {
  public router: Router = express.Router()
  constructor() {
    this.router.get('/', (_, res) => {
      res.send('Welcome to the API!')
    })
  }
}

const api = new App()

export default api