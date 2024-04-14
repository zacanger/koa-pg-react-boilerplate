import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Reset } from 'styled-reset'
import styled from 'styled-components'

const Li = styled.li`
  display: inline-block;
  margin: 0 1em;
`

const Ul = styled.ul`
  list-style: none;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
`

export const Layout: React.FC<Record<string, any>> = (_props) => {
  return (
    <>
      <Reset />
      <nav>
        <Ul>
          <Li>
            <NavLink to={'/'}>Home</NavLink>
          </Li>
          <Li>
            <NavLink to={'another'}>Another Page</NavLink>
          </Li>
        </Ul>
      </nav>

      <Outlet />
    </>
  )
}
