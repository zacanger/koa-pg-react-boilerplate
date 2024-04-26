import React from 'react'
import { Outlet } from 'react-router-dom'
import { Reset } from 'styled-reset'
import styled, { createGlobalStyle } from 'styled-components'
import { Link } from './link'

const GlobalStyle = createGlobalStyle`
:root {
  --mainDark: #121212;
  --mainLight: #ededed;
  --primaryLight: #8085e4;
  --primaryDark: #1923da;
  --buttonBg: #0b492a;
  font-family: monospace;
  color-scheme: light dark;
  color: var(--mainLight);
  background-color: var(--mainDark);
}

body {
  margin: 0;
  min-width: 320px;
  padding: 0;
}

#app {
  text-align: center;
  width: 100%;
}

@media (prefers-color-scheme: light) {
  :root {
    -webkit-filter: invert(100%);
    filter: invert(100%);
  }
}
`

const Li = styled.li({
  display: 'inline-block',
  margin: '0 1em',
})

const Ul = styled.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  overflowX: 'scroll',
})

export const Layout: React.FC<Record<string, any>> = (_props) => {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <nav>
        <Ul>
          <Li>
            <Link to={'/'}>Home</Link>
          </Li>
          <Li>
            <Link to={'another'}>Another Page</Link>
          </Li>
        </Ul>
      </nav>

      <Outlet />
    </>
  )
}
