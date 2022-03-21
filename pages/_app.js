import Layout from '../components/Layout'
import AuthProvider from '../context/AuthProvider'
import StoreProvider from '../context/StoreProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }


  return <div>
    <AuthProvider>
      <StoreProvider>
      <Layout>
        <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </AuthProvider>
  </div>

}

export default MyApp
