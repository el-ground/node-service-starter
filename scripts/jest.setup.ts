import request from 'supertest'
import app from '#src/app'

global.model = (description, callback) => describe(`model: ${description}`, callback)
global.api = (description, callback) => describe(`api: ${description}`, callback)
global.purpose = (description, callback) => describe(`purpose: ${description}`, callback)
global.input = (description, callback) => describe(`input: ${description}`, callback)
global.app = request(app)

type Describe = (description: string, callback: jest.EmptyFunction) => void

declare global {
  var model: Describe
  var api: Describe
  var purpose: Describe
  var input: Describe
  var app: request.SuperTest<request.Test>
}