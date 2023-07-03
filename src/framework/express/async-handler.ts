import type { Query, ParamsDictionary } from 'express-serve-static-core'
import type { RequestHandler } from 'express'

/* eslint-disable @typescript-eslint/no-unused-vars, no-use-before-define, @typescript-eslint/no-explicit-any */
// https://github.com/Microsoft/TypeScript/issues/26019#issuecomment-408520542
type Parameters<T> = T extends (...args: infer T) => any ? T : never
type ReturnType<T> = T extends (...args: any[]) => infer T ? T : never

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts#L120
export const asyncHandler =
  <
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = Query,
    Locals extends Record<string, any> = Record<string, any>,
  >(
    handler: (
      ...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
    ) => Promise<
      ReturnType<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
    >,
  ) =>
  async (
    ...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ) => {
    try {
      /* run it! */
      return await handler(...args)
    } catch (e) {
      /* if throws, catch it with next */
      const next = args[2]
      next(e)
    }
  }
