import { wrap } from '@src/framework/express/router'
import express, { Router } from 'express'

const router = Router()

router.get(
  `/search`,
  wrap(async (req: express.Request, res: express.Response) => {
    res.status(200)
    res.send(`Hello world!`)
  }),
)

export default router
