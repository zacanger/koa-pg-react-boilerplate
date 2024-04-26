import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Link = styled(NavLink)`
  display: block;
  color: var(--primaryLight);
  text-align: center;
  padding: 12px;
  text-decoration: none;

  &.active {
    background-color: var(--mainLight);
    color: var(--primaryDark);
  }

  &:hover {
    color: var(--primaryDark);
  }
`
