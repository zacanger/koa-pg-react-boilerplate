import React, { useEffect, useState } from 'react'

export const Another: React.FC<Record<string, any>> = (_props) => {
  const [dateHash, setDateHash] = useState('')

  useEffect(() => {
    document.title = 'Another Page'
  })

  useEffect(() => {
    void fetch('/api/hash')
      .then((res) => res.json())
      .then(setDateHash)
  }, [])

  return <h1>hello, date hash is {dateHash}</h1>
}
