import Layout from '../components/Layout'
import AppProvider from '../context/AppProvider'
import AuthMessProvider from '../context/AuthMessProvider'
import AuthProvider from '../context/AuthProvider'
import MessProvider from '../context/MessProvider'
import PostProvider from '../context/PostProvider'
import StoreProvider from '../context/StoreProvider'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import MessageBox from './messagebox'

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  if (Component.getLayout && router.pathname == '/messagebox') {
    return Component.getLayout(
      <AuthMessProvider>
        <MessProvider>
          <StoreProvider>
            <Component {...pageProps} />
          </StoreProvider>
        </MessProvider>
      </AuthMessProvider>
    )
  } else if (Component.getLayout && router.pathname == '/login') {
    return Component.getLayout(
      <Component {...pageProps} />
    )
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
