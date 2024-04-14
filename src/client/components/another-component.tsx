import React, { useEffect, useState } from 'react'
import { useHelmet } from '../utils/use-helmet'

export const Another: React.FC<Record<string, any>> = (_props) => {
  const [dateHash, setDateHash] = useState('')
  const helmet = useHelmet()

  useEffect(() => {
    helmet.setTitle('Another Page')
  },[helmet])

  useEffect(() => {
    void fetch('/api/hash')
      .then((res) => res.json())
      .then(setDateHash)
  }, [])

  return (
    <>
      <h1>hello, date hash is {dateHash}</h1>
    </>
  )
}
