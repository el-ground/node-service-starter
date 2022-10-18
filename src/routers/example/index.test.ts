import { app } from '#src/app'
import request from 'supertest'

describe(`foo`, () => {
  test(`bar`, async () => {
    await request(app).get(`/`).expect(200)
  })
})
