import { useState } from "react"

import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { ContentWrapper, MainContainer, Content } from "./styles"

interface BaseProps {
    children: React.ReactNode
}

export const Base = ({ children }: BaseProps) => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

    function handleChangeSidebarExpanded() {
        setIsSidebarExpanded(!isSidebarExpanded)
    }

    return (
        <MainContainer>
            <Header />
            <ContentWrapper>
                <Sidebar expanded={isSidebarExpanded} changeMode={handleChangeSidebarExpanded} />
                <Content isSidebarExpanded={isSidebarExpanded}>
                    {children}
                </Content>
            </ContentWrapper>
        </MainContainer>
    )
}