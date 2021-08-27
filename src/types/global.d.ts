import winston from 'winston'
import * as errorHandler from 'src/framework/express/middlewares/error-handler'

// export {}
declare global {
  let logger: winston.Logger
  let ResError: typeof errorHandler.ResError

  namespace NodeJS {
    interface Global {
      logger: winston.Logger
      ResError: typeof errorHandler.ResError
    }
  }
}
