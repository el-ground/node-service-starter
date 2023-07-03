import https from 'https'
import http from 'http'
import fs from 'fs'
import { EventEmitter } from 'events'
import { logInfo } from './util/log'
import { app } from './app'

EventEmitter.defaultMaxListeners = 100

// on production only http port is used!
const httpPort = process.env.PORT ? Number(process.env.PORT) : undefined
const httpsPort = process.env.HTTPS_PORT
  ? Number(process.env.HTTPS_PORT)
  : undefined

// listen http
if (httpPort) {
  http.createServer(app).listen(httpPort)
  logInfo(`http server listening on port : ${httpPort}`)
} else {
  throw new Error(`PORT not provided!`)
}

// listen htpts
if (httpsPort) {
  const certPath = process.env.CERT || undefined
  const certKeyPath = process.env.CERT_KEY || undefined

  if (!certPath) {
    throw new Error(`cert path : process.env.CERT not provided!`)
  }

  if (!certKeyPath) {
    throw new Error(`cert key path : process.env.CERT_KEY not provided!`)
  }

  const options = {
    key: fs.readFileSync(certKeyPath),
    cert: fs.readFileSync(certPath),
  }

  https.createServer(options, app).listen(httpsPort)
  logInfo(`https server listening on port : ${httpsPort}`)
}
