/*
    We've split index and app for unit testing purpose.
    we need to bind and initialize app without listening to port.
*/
import { app, bind } from '#src/framework/express/index.js'
import router from '#src/routers/example/index.js'

bind([router])

export { app }
