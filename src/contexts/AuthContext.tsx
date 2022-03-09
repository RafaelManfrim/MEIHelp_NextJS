import { createContext, useContext } from "react";

const AuthContext = createContext({})

interface AuthContextProviderProps {
    children: React.ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)