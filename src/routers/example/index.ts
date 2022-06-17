import { wrapAsyncRouteHandler } from '#src/framework/express/router/index.js'
import express, { Router } from 'express'
import fetch from 'node-fetch'

console.log(fetch)

const router = Router()

router.get(
  `/search`,
  wrapAsyncRouteHandler(async (req: express.Request, res: express.Response) => {
    res.status(200)
    res.send(`Hello world!`)
  }),
)

export default router
