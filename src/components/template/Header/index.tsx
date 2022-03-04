import { HeaderContainer, LogoArea, ActionsArea, InfoArea, LogoutButton } from "./styles"

export const Header = () => {
    return (
        <HeaderContainer>
            <LogoArea>LOGO</LogoArea>
            <ActionsArea>
                <InfoArea>NOME</InfoArea>
                <LogoutButton>SAIR</LogoutButton>
            </ActionsArea>
        </HeaderContainer>
    )
}