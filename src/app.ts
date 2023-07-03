/* customize for your own needs! */
import express from 'express'
import ip from 'ip'
import { bind } from './framework/express'
import { exampleRouter } from './routers/example'
import { initialize as initializeRequestId } from './framework/express/middlewares/request-id'
import { initialize as intiializeLogger } from './framework/express/middlewares/logger'

initializeRequestId()
intiializeLogger()

const app = express()

// on production only http port is used!
const httpPort = process.env.PORT ? Number(process.env.PORT) : undefined
const httpsPort = process.env.HTTPS_PORT
  ? Number(process.env.HTTPS_PORT)
  : undefined

// enable cors while development!
const corsAllowOrigins = []
if (process.env.NODE_ENV === `development`) {
  const address = ip.address()
  if (httpPort) {
    corsAllowOrigins.push(
      `http://localhost:${httpPort}`,
      `http://${address}:${httpPort}`,
    )
  }

  if (httpsPort) {
    corsAllowOrigins.push(
      `https://localhost:${httpsPort}`,
      `https://${address}:${httpsPort}`,
    )
  }
}

// bind routers
bind(app, [exampleRouter], {
  corsAllowOrigins,
})

export { app }
