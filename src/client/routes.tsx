import loadable from '@loadable/component'
import { Layout } from './components/layout'
import { Home } from './components/home'
import { homeLoader } from './utils/home-loader'
import type { RouteObject } from 'react-router-dom'

// eslint-disable-next-line react-refresh/only-export-components
const AnotherPage = loadable(() =>
  import('./components/another-component').then(({ Another }) => ({ default: Another })), { fallback: <div>Loading...</div> })

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader
      }, {
        path: 'another',
        element: <AnotherPage />,
      },
    ]
  }
]
