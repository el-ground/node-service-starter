import type { Request, Response, NextFunction } from 'express'
import { logError } from '../logger'

/*
    Errors that affect router response
*/
export class ResError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

/*
    Errors that require handling
*/
export class ErrorWCode extends Error {
  code: string
  constructor(code: string, message: string) {
    super(message)
    this.code = code
  }
}

export const errorHandler =
  () => (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      logError(
        `ErrorHandle caught:\nmessage↓\n${err.message}\nstack↓\n${err.stack}`,
      )
    }

    if (res.headersSent) {
      // error happened but was handled in front
      return next(err)
    }

    if (err instanceof ResError) {
      res.status(err.status)
      res.send(err.message)
      return
    }

    // error was not handled, return 500
    res.status(500)
    res.send('Internal server error')
  }
