import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { ContentWrapper, MainContainer } from "./styles"

interface BaseProps {
    children: React.ReactNode
}

export const Base = ({ children }: BaseProps) => {
    return (
        <MainContainer>
            <Header />
            <ContentWrapper>
                <Sidebar />
                {children}
            </ContentWrapper>
        </MainContainer>
    )
}