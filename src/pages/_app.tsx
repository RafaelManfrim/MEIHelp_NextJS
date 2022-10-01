import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import { AuthContextProvider } from '../contexts/AuthContext'

import { GlobalStyle } from '../styles/global'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <GlobalStyle />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthContextProvider>
  )
}
