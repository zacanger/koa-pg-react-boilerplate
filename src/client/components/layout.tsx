import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export const Layout: React.FC<Record<string, any>> = (_props) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'about'}>About</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}
