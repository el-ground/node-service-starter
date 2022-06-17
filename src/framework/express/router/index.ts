import { asyncCatch } from '#framework/util/async-catch/index.js'

type PromiseReturningFunction = (...any: any[]) => Promise<any>

export const wrapAsyncRouteHandler = (fn: PromiseReturningFunction) => async (
  ...args: any[]
) => {
  const [err] = await asyncCatch(fn(...args))
  if (err) args[2](err)
}
