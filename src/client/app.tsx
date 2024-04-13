import { Helmet } from 'react-helmet-async'
import { HelmetProvider } from './utils/helmet-context'

export const App = (props: any) => {
  return (
    <>
      <Helmet>
        <title>Example</title>
      </Helmet>

      <HelmetProvider>
        {props.children}
      </HelmetProvider>
    </>
  )
}
