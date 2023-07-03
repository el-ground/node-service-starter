import type { Request, Response, NextFunction, RequestHandler } from 'express'
import expressRequestId from 'express-request-id'
import { Namespace, createNamespace } from 'cls-hooked'

interface RequestWithId extends Request {
  id: string
}

// cls session to pass request Id to use in logging.
// global resource!

let requestIdsNamespace: Namespace | null = null
let initialized = false

export const initialize = () => {
  if (initialized) {
    throw new Error(`RequestId already initialized!`)
  }

  initialized = true
  requestIdsNamespace = createNamespace('requestIds')
}

export const getRequestId = () => {
  if (!requestIdsNamespace) {
    throw new Error(`Request cls namespace not initialized!`)
  }

  return requestIdsNamespace.get(`requestId`)
}

export const requestId = () => {
  if (!requestIdsNamespace) {
    throw new Error(`Request cls namespace not initialized!`)
  }
  const namespace = requestIdsNamespace

  const addRequestId: RequestHandler = expressRequestId({
    setHeader: true,
  })

  const storeExpressRequestIdToCls = (
    req: RequestWithId,
    res: Response,
    next: NextFunction,
  ) => {
    namespace.run(() => {
      // assumes addRequestId has appended request id.
      namespace.set(`requestId`, req.id)
      next()
    })
  }

  return [
    addRequestId, // adds request Id
    storeExpressRequestIdToCls as RequestHandler, // stores in cls
  ]
}
