import type { Application, Router } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import compression from 'compression'
import { requestId } from './middlewares/request-id'
import { logInfo } from './middlewares/logger'
import { errorHandler } from './middlewares/error-handler'

/* 
    Binds routers and handlers to given express app.
*/
export const bind = (
  app: Application,
  routers: Router[],
  {
    corsAllowOrigins,
  }: {
    corsAllowOrigins?: string[]
  },
) => {
  /*
        1. request id log
    */
  app.use(requestId())

  app.use(
    morgan('[:date[iso]] Started :method :url for :remote-addr', {
      immediate: true,
      stream: {
        write: logInfo,
      },
    }),
  )

  app.use(
    morgan(
      '[:date[iso]] Completed :status :res[content-length] in :response-time ms',
      {
        stream: {
          write: logInfo,
        },
      },
    ),
  )

  /*
        2. allow CORS
    */
  if (corsAllowOrigins && corsAllowOrigins.length > 0) {
    const corsOptions = {
      origin: corsAllowOrigins,
    }

    app.use(cors(corsOptions))
  }

  /*
        compression
    */
  app.use(compression())

  app.get([`/`, `/healthy`, `/ping`], (req, res) => {
    res.status(200)
    res.send(`healthy!`)
  })

  // bind routers!
  routers.forEach((router) => app.use(router))

  app.use(errorHandler())
}
