import request from 'supertest'
import app from '#src/app.js'

global.app = request(app)

declare global {
  var app: request.SuperTest<request.Test>
}
