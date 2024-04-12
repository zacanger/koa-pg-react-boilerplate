import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Layout: React.FC<LayoutProps> = (_props) => {
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
          <li>
            <NavLink to={'contact'}>Contact</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

interface LayoutProps {
  [key: string]: any
}

export default Layout