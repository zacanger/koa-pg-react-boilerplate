import React, { useEffect, useState } from 'react'
import { useHelmet } from '../utils/use-helmet'

export const Home: React.FC<Record<string, any>> = (_props) => {
  const [count, setCount] = useState(0)
  const helmet = useHelmet()

  useEffect(() => {
    helmet.setTitle('Home')
  }, [helmet])

  return (
    <>
      <h1>Hello</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          you've clicked {count} times
        </button>
      </div>
    </>
  )
}
