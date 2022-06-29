import '../styles/globals.css'
import { appWithTranslation } from "next-i18next"
import ErrorBoundary from '../components/ErrorBoundary'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default appWithTranslation(MyApp)
