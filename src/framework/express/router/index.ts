import { asyncCatch } from '#src/util/async-catch/index.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PromiseReturningFunction = (...any: any[]) => Promise<any>

export const wrapAsyncRouteHandler =
  (fn: PromiseReturningFunction) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (...args: any[]) => {
    const [err] = await asyncCatch(fn(...args))
    if (err) args[2](err)
  }
