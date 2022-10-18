import { wrapAsyncRouteHandler } from '#framework/express/router'
import express, { Router } from 'express'
import fetch from 'node-fetch' // testing module imports :)

console.log(fetch)

const router = Router()

router.get(
  `/search`,
  wrapAsyncRouteHandler(async (req: express.Request, res: express.Response) => {
    logger.info(`wow!`)

    res.status(200)
    res.send(`Hello world!`)
  }),
)

export default router
