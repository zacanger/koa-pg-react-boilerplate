import React, { useEffect } from 'react'
import { useHelmet } from '../utils/use-helmet'

export const About: React.FC<Record<string, any>> = (_props) => {
  const helmet = useHelmet()

  useEffect(() => {
    helmet.setTitle('About')
  },[helmet])

  return (
    <h1>About Page</h1>
  )
}
