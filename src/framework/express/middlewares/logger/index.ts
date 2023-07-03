// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/

import { createLogger, format, transports } from 'winston'
import type { Logger } from 'winston'
import { getRequestId } from '../request-id'

const { combine, colorize, simple } = format

const prependRequestId = format((info) => {
  const requestId = getRequestId() // accesses request-id
  if (requestId) {
    info.message = `[#${requestId}] ${info.message}`
  }

  return info
})

let logger: Logger | null = null
let initialized = false

export const initialize = () => {
  if (initialized) {
    throw new Error(`Logger already initialized!`)
  }

  initialized = true
  logger = createLogger({
    transports: [
      new transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: combine(prependRequestId(), colorize(), simple()),
      }),
    ],
    exitOnError: false,
  })
}

/* 
    TODO : log objects 
    TODO : log errors 
*/
export const logInfo = (message: string) => {
  if (!logger) {
    throw new Error(`Logger not initialized!`)
  }

  logger.info(message)
}

export const logError = (message: string) => {
  if (!logger) {
    throw new Error(`Logger not initialized!`)
  }

  logger.error(message)
}

export const logDebug = (message: string) => {
  if (!logger) {
    throw new Error(`Logger not initialized!`)
  }

  logger.debug(message)
}
