import express from 'express'
import { logger } from '../logger/index.js'

export class ResError extends Error {
  code: number
  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

export const errorHandler =
  () =>
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err) {
      // eslint-disable-next-line
      let message = err.message
      if (typeof message === `object`) {
        message = JSON.stringify(message, null, 2)
      }
      logger.error(`error! ${message} ${err.stack}`)
    }

    if (res.headersSent) {
      // error happened but was handled in front
      return next(err)
    }

    if (err instanceof ResError) {
      res.status(err.code)
      if (typeof err.message === 'object') {
        res.json(err.message)
      } else {
        res.send(err.message)
      }
      return
    }

    // error was not handled, return 500
    res.status(500)
    res.send('Internal server error')
  }
