import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { api } from '../services/api'

type User = {
  corporate_name: string
  description: string | null
  cep?: string
  phone?: string
  email?: string
}

type Tokens = {
  access: string
  refresh: string
}

interface AuthContextProps {
  user: User
  tokens: Tokens
  signIn: (cnpj: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [tokens, setTokens] = useState<Tokens>({} as Tokens)

  const router = useRouter()

  async function signIn(cnpj: string, password: string) {
    try {
      const response = await api.post('/login/', { cnpj, password })

      const { status, access, refresh, user } = response.data

      if (status === 200) {
        setCookie(undefined, 'meihelp.accessToken', access, {
          maxAge: 60 * 5,
          path: '/',
        })
        setCookie(undefined, 'meihelp.refreshToken', refresh, {
          maxAge: 60 * 60 * 24,
          path: '/',
        })
        setUser(user)
        setTokens({ access, refresh })
        router.push('/dashboard/')
      } else {
        throw new Error(status)
      }
    } catch (err: any) {
      throw new Error(err.response.data.detail)
    }
  }

  function signOut() {
    setTokens({} as Tokens)
    destroyCookie(undefined, 'meihelp.accessToken')
    destroyCookie(undefined, 'meihelp.refreshToken')
    if (!router.asPath.startsWith('/login')) {
      router.push('/login')
    }
  }

  const refreshToken = async () => {
    const { 'meihelp.refreshToken': refresh } = parseCookies()

    if (refresh) {
      setTokens({ ...tokens, refresh })
      if (router.asPath.startsWith('/login')) {
        router.push('/dashboard')
      }

      if (!user.corporate_name) {
        await getUserFullData()
      }
    } else {
      if (router.asPath !== '/') {
        router.push('/login')
      }
    }
  }

  async function getUserFullData() {
    try {
      const response = await api.get('/companies/full_data/')
      if (!response.data.description) {
        toast('Cadastre uma descrição para ser visto por outros MEI!', {
          icon: '🔔',
        })
      }
      setUser(response.data)
    } catch (err: any) {
      if (err.response) {
        toast.error('Houve um erro ao buscar dados de usuário.')
      }
    }
  }

  useEffect(() => {
    refreshToken()
  }, [router.asPath])

  return (
    <AuthContext.Provider value={{ user, tokens, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
