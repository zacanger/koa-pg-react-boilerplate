import type { RouteObject } from 'react-router-dom'
import loadable from '@loadable/component'
import { Layout } from './components/layout'
import { Home } from './components/home'
import { homeLoader } from './utils/home-loader'

// eslint-disable-next-line react-refresh/only-export-components
const About = loadable(() =>
  import('./components/about').then(({ About }) => ({ default: About })), { fallback: <div>Loading...</div> })

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
        path: 'about',
        element: <About />,
      },
    ]
  }
]
