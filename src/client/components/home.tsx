import React, { useEffect, useState } from 'react'
import { Button } from './button'

export const Home: React.FC<Record<string, any>> = (_props) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = 'Home'
  })

  return (
    <>
      <h1>Home</h1>
      <div>
        <Button onClick={() => setCount((count) => count + 1)}>
          you've clicked {count} times
        </Button>
      </div>
    </>
  )
}
