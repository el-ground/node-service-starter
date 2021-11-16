import { wrap } from '#src/framework/express/router/index'
import express, { Router } from 'express'
import fetch from 'node-fetch'

console.log(fetch)

const router = Router()

router.get(
  `/search`,
  wrap(async (req: express.Request, res: express.Response) => {
    res.status(200)
    res.send(`Hello world!`)
  }),
)

export default router
