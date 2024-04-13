import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Reset } from 'styled-reset'
import styled from 'styled-components'

const Nav = styled.nav`
ul {
  list-style: none;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
}

> li {
  display: inline-block;
}
`

export const Layout: React.FC<Record<string, any>> = (_props) => {
  return (
    <>
      <Reset />
      <Nav>
        <ul>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'about'}>About</NavLink>
          </li>
        </ul>
      </Nav>

      <Outlet />
    </>
  )
}
