import winston from 'winston'
import * as errorHandler from 'src/framework/express/middlewares/error-handler'
declare global {
  var logger: winston.Logger
  var ResError: typeof errorHandler.ResError
}