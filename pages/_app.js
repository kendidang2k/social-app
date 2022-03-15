import Layout from '../components/Layout'
import AuthProvider from '../context/AuthProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }


  return <div>
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  </div>

}

export default MyApp
