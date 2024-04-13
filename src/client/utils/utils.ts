export const sleep = (n: number = 500): Promise<void> =>
  new Promise((r) => setTimeout(r, n))

export const rand = (): number =>
  Math.round(Math.random() * 100)
