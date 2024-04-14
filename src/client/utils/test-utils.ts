import * as jsdom from 'jsdom'

const j = new jsdom.JSDOM(undefined, {
  url: 'http://localhost',
  pretendToBeVisual: true,
})

Object.getOwnPropertyNames(j.window)
  .filter((k) => !k.startsWith('_') && !(k in global))
  // @ts-expect-error implicit any, this is okay
  .forEach((k) => global[k] = j.window[k])

// @ts-expect-error implicit any, this is okay
global.IS_REACT_ACT_ENVIRONMENT = true
