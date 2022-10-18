/*
    We've split index and app for unit testing purpose.
    we need to bind and initialize app without listening to port.
*/
import { app, bind } from '#src/framework/express'
import { router } from '#src/routers/example'

bind([router])

export { app }
