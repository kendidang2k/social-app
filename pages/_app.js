import Layout from '../components/Layout'
import AppProvider from '../context/AppProvider'
import AuthProvider from '../context/AuthProvider'
import PostProvider from '../context/PostProvider'
import StoreProvider from '../context/StoreProvider'
import '../styles/globals.css'
import MessageBox from './messagebox'

function MyApp({ Component, pageProps }) {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }


  return <div>
    <AuthProvider>
      <AppProvider>
        <PostProvider>
          <StoreProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StoreProvider>
        </PostProvider>
      </AppProvider>
    </AuthProvider>
  </div>

}

export default MyApp
