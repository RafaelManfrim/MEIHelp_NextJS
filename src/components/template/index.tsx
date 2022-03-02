import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

interface BaseProps {
    children: React.ReactNode
}

export const Base = ({ children }: BaseProps) => {
    return (
        <main>
            <Header></Header>
            <div>
                <Sidebar></Sidebar>
                {children}
            </div>
        </main>
    )
}