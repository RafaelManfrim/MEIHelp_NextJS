import type { AppProps } from 'next/app'
import { GlobalStyle } from "../styles/global";
import { AuthContextProvider } from "../contexts/AuthContext"
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <GlobalStyle />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthContextProvider>
  )
}

export default MyApp
