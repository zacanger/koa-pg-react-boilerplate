import { rand, sleep } from './utils'

const homeLoader = async () => {
  await sleep()
  return { data: `Home loader - random value ${rand()}` }
}

export default homeLoader