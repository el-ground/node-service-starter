export const asyncCatch = async (fn: Promise<any>) => {
  try {
    return [null, await fn]
  } catch (e) {
    return [e]
  }
}
