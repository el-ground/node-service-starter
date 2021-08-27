import { to } from '@framework/util/async'

type PromiseReturningFunction = (...any: any[]) => Promise<any>

export const wrap = (fn: PromiseReturningFunction) => async (
  ...args: any[]
) => {
  const [err] = await to(fn(...args))
  if (err) args[2](err)
}
