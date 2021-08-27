export const to = async (fn: Promise<any>) => {
  try {
    return [null, await fn]
  } catch (e) {
    return [e]
  }
}
