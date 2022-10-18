import { wrapAsyncRouteHandler } from '#framework/express/router'
import { Request, Response, Router } from 'express'
import fetch from 'node-fetch' // testing module imports :)

console.log(fetch)

const router = Router()

router.get(
  `/search`,
  wrapAsyncRouteHandler(async (req: Request, res: Response) => {
    logger.info(`wow!`)

    res.status(200)
    res.send(`Hello world!`)
  }),
)

export { router }
