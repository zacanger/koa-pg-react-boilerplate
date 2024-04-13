import { rand, sleep } from './utils'

export const homeLoader = async () => {
  await sleep()
  return { data: `Home loader - random value ${rand()}` }
}
