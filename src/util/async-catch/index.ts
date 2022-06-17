// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncCatch = async <T>(fn: Promise<T>): Promise<[any, T]> => {
  try {
    return [null, await fn]
  } catch (e) {
    return [e, null as unknown as T] // type sugar
  }
}
