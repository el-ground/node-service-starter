import app from '../../app'
import './'

console.log(`app is ${app }`)

describe (`foo`, () => {
    test(`bar` , () => {
        expect(1).toBe(1)

    })
})