import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './app'
import routes from './routes'
import '@assets/styles.css'

const router = createBrowserRouter(routes)

const context = {}

ReactDOM.hydrateRoot(
  document.getElementById('app') as HTMLElement,
  <HelmetProvider context={context}>
    <App>
      <RouterProvider router={router} fallbackElement={null} />
    </App>
  </HelmetProvider>
)
