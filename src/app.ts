import https from 'https'
import http from 'http'
import fs from 'fs'

import express from 'express'

import morgan from 'morgan'

import compression from 'compression'
import cors from 'cors'

import ip from 'ip'

import errorHandler from '#src/framework/express/middlewares/error-handler/index.js'
import requestId from '#src/framework/express/middlewares/request-id/index.js'
import { stream as loggerStream } from '#src/framework/express/middlewares/logger/index.js'

import { EventEmitter } from 'events'

EventEmitter.defaultMaxListeners = 100

// default port 
const port = process.env.PORT || 9000
const httpsPort = process.env.HTTPS_PORT || 9443

// populate me!
const configCORSOrigins: string[] = []

const app = express()

let isBound = false
export const bind = (routers: express.Router[]) => {
  if (isBound) {
    throw new Error(`app already bound!`)
  }

  let corsAllowOrigins = [...configCORSOrigins]

  if (process.env.NODE_ENV === 'development') {
    // enable LAN development
    const address = ip.address()
    corsAllowOrigins = [
      ...configCORSOrigins,
      `https://localhost:${httpsPort}`,
      `http://localhost:${port}`,
      `https://${address}:${httpsPort}`,
      `http://${address}:${port}`,
    ]
  }

  const corsOptions = {
    origin : corsAllowOrigins,
  }

  app.use(requestId)

  app.use(
    morgan('[:date[iso]] Started :method :url for :remote-addr', {
      immediate: true,
      stream: {
        write: loggerStream.write,
      },
    }),
  )

  app.use(
    morgan(
      '[:date[iso]] Completed :status :res[content-length] in :response-time ms',
      {
        stream: {
          write: loggerStream.write,
        },
      },
    ),
  )

  app.use(compression())
  app.use(cors(corsOptions))

  app.get(`/healthy`, (req, res) => {
    res.status(200)
    res.send(`healthy!`)
  })

  app.get(`/`, (req, res) => {
    res.send(`hello world!`)
  })

  // bind!
  routers.forEach((router) => app.use(router))

  app.use(errorHandler())

  isBound = true
}

export const listen = () => {
  // listen https only when certs are provided.
  if (process.env.CERT && process.env.CERT_KEY) {
    const options = {
      key: fs.readFileSync(process.env.CERT_KEY),
      cert: fs.readFileSync(process.env.CERT),
    }

    logger.info(`https server listening on port : ${httpsPort}`)
    https.createServer(options, app).listen(httpsPort)
  }

  logger.info(`http server listening on port : ${port}`)
  http.createServer(app).listen(port)
}

export default app
