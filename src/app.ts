import { app, bind } from '#src/framework/express/index.js'
import router from '#src/routers/example/index.js'

bind([router])

export { app }
