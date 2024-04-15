import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './app'
import { routes } from './routes'

const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
  document.getElementById('app') as HTMLElement,
  <App>
    <RouterProvider router={router} fallbackElement={null} />
  </App>
)
