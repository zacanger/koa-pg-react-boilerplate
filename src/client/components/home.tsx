import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  background-color: var(--primaryDark);
  color: var(--mainLight);
  cursor: pointer;
  transition: border-color 0.25s;
  &:hover {
    border-color: var(--primaryLight);
  }
`

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
