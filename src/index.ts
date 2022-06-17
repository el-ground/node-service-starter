import 'source-map-support/register.js'

import { bind, listen } from '#src/app.js'
import router from '#src/routers/example/index.js'

;(async () => {
  bind([router])
  listen()
})()
