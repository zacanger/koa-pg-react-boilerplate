import { helmetContext } from './helmet-context'
import { useContext } from 'react'

const useHelmet = (): helmetContextType => {
  return useContext(helmetContext) as helmetContextType
}

export default useHelmet