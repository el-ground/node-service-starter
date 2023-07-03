import { describe, it } from 'node:test'
import assert from 'node:assert'
import { app } from '#src/app'
import request from 'supertest'

// https://nodejs.dev/en/api/v18/test/

describe(`test works`, async () => {
  await it(`should work`, async () => {
    await request(app).get(`/`).expect(200)

    assert.strictEqual(1, 1)
  })
})
