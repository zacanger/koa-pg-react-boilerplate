import { useContext } from 'react'
import { helmetContext } from './helmet-context'

type helmetContextType = {
  title: string
  setTitle: (title: string) => void
  meta: any
  setMeta: (meta: any) => void
  link: any
  setLink: (link: any) => void
  script: any
  setScript: (script: any) => void
  style: string | []
  setStyle: (style: string | []) => void
}

export const useHelmet = (): helmetContextType =>
  useContext(helmetContext) as helmetContextType
