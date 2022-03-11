import { IoLogOutOutline } from "react-icons/io5"
import { HeaderContainer, LogoArea, ActionsArea, HeaderButton, InfoArea, LogoutButton, LogoutButtonText, UserAccountButton } from "./styles"

export const Header = () => {
    const isAuthenticated = true

    return (
        <HeaderContainer>
            <LogoArea>LOGO</LogoArea>
            {!isAuthenticated ? (
                <ActionsArea>
                    <HeaderButton>Entrar</HeaderButton>
                    <HeaderButton>Registrar-se</HeaderButton>
                </ActionsArea>
            ) : (
                <ActionsArea>
                    <InfoArea>
                        <UserAccountButton>Nome do Usuário (Empresa)</UserAccountButton>
                    </InfoArea>
                    <LogoutButton>
                        <IoLogOutOutline />
                        <LogoutButtonText>Sair</LogoutButtonText>
                    </LogoutButton>
                </ActionsArea>
            )}
        </HeaderContainer>
    )
}