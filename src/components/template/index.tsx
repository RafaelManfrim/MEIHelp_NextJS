import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { ContentWrapper, MainContainer, Content } from "./styles"

interface BaseProps {
    children: React.ReactNode
}

export const Base = ({ children }: BaseProps) => {
    return (
        <MainContainer>
            <Header />
            <ContentWrapper>
                <Sidebar />
                <Content>
                    {children}
                </Content>
            </ContentWrapper>
        </MainContainer>
    )
}