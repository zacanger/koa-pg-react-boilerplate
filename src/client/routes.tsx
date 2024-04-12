/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from 'react-router-dom'
import loadable from '@loadable/component'
import Layout from './components/layout'
import Home from './components/home'
import homeLoader from './utils/home-loader'

const About = loadable(() => import('./components/about'), { fallback: <div>Loading...</div> })

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader
      }, {
        path: 'about',
        element: <About />,
      },
    ]
  }
]

export default routes