// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/

import winston from 'winston'
import { getRequestId } from '#src/framework/express/middlewares/request-id/index.js'

const { createLogger, format, transports } = winston
const { combine, colorize, simple } = format

const prependRequestId = format((info) => {
  const requestId = getRequestId()
  if (requestId) {
    info.message = `[#${requestId}] ${info.message}`
  }

  return info
})

export const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: combine(prependRequestId(), colorize(), simple()),
    }),
  ],
  exitOnError: false,
})

export const stream = {
  write: (message: string) => {
    logger.info(message)
  },
}
