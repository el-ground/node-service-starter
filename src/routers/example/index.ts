import { asyncHandler } from '#src/framework/express'
import { Router } from 'express'

const exampleRouter = Router()

exampleRouter.get(
  `/example`,
  asyncHandler(async (req, res) => {
    res.status(200)
    res.send(`Hello world!`)
  }),
)

export { exampleRouter }
