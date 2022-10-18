import expressRequestId from 'express-request-id'
import { createNamespace } from 'cls-hooked'
import type { Request, Response, NextFunction, RequestHandler } from 'express'

interface RequestWithId extends Request {
  id: string
}

const addRequestId: RequestHandler = expressRequestId({
  setHeader: true,
})

const session = createNamespace('request')

const namespaceWrapper = (
  req: RequestWithId,
  res: Response,
  next: NextFunction,
) => {
  session.run(() => {
    session.set(`reqId`, req.id.split('-')[0])
    next()
  })
}

export const getRequestId = () => {
  return session.get(`reqId`)
}

export const requestIdMiddleware = [
  addRequestId,
  namespaceWrapper as RequestHandler,
]
