import type { AppProps } from 'next/app'
import { GlobalStyle } from "../styles/global";
import { AuthContextProvider } from "../contexts/AuthContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </AuthContextProvider>
  )
}

export default MyApp
