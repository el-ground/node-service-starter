import request from 'supertest'
import app from '@src/app'

/* eslint-disable */
global.model = (description, callback) => describe(`model: ${description}`, callback)
global.api = (description, callback) => describe(`api: ${description}`, callback)
global.purpose = (description, callback) => describe(`purpose: ${description}`, callback)
global.input = (description, callback) => describe(`input: ${description}`, callback)
/* eslint-enable */

global.app = request(app)

type Describe = (description: string, callback: jest.EmptyFunction) => void

// export {}
declare global {
  let model: Describe
  let api: Describe
  let purpose: Describe
  let input: Describe
  let app: request.SuperTest<request.Test>

  namespace NodeJS {
    interface Global {
      model: Describe
      api: Describe
      purpose: Describe
      input: Describe
      app: request.SuperTest<request.Test>
    }
  }
}
