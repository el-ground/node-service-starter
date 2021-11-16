import 'source-map-support/register.js'

import { bind, listen } from '#src/app'
import router from '#src/routers/example/index'

;(async () => {
  bind([router])
  listen()
})()
