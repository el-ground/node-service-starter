// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/

import { createLogger, format, transports } from 'winston'
import { getRequestId } from '@src/framework/express/middlewares/request-id'

const { combine, colorize, simple } = format

const prependRequestId = format((info) => {
  const requestId = getRequestId()
  if (requestId) {
    info.message = `[#${requestId}] ${info.message}`
  }

  return info
})

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: combine(prependRequestId(), colorize(), simple()),
    }),
  ],
  exitOnError: false,
})

global.logger = logger

export default logger
export const stream = {
  write: (message: string) => {
    logger.info(message)
  },
}
