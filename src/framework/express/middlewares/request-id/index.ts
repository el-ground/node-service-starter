import expressRequestId from 'express-request-id'
import { createNamespace } from 'cls-hooked'
import express from 'express'

interface RequestWithId extends express.Request {
  id: string
}

const addRequestId: express.RequestHandler = expressRequestId({
  setHeader: true,
})

const session = createNamespace('request')

const namespaceWrapper = (
  req: RequestWithId,
  res: express.Response,
  next: express.NextFunction,
) => {
  session.run(() => {
    session.set(`reqId`, req.id.split('-')[0])
    next()
  })
}

export const getRequestId = () => {
  return session.get(`reqId`)
}

export default [addRequestId, namespaceWrapper as express.RequestHandler]
