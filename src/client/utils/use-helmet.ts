import { helmetContext } from './helmet-context'
import { useContext } from 'react'

export const useHelmet = (): helmetContextType =>
  useContext(helmetContext) as helmetContextType
