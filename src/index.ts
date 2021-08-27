import 'source-map-support/register'
import 'module-alias/register'

import { bind, listen } from '@src/app'
import router from '@src/routers/example'

;(async () => {
  bind([router])
  listen()
})()
