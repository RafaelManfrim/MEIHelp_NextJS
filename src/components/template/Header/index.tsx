import Image from "next/image"
import { IoLogOutOutline } from "react-icons/io5"
import { HeaderContainer, LogoArea, ActionsArea, HeaderButton, InfoArea, LogoutButton, LogoutButtonText, UserAccountButton } from "./styles"
import logo from "../../../../public/logo-horizontal.png"

export const Header = () => {
    const isAuthenticated = true

    return (
        <HeaderContainer>
            <LogoArea>
                <Image src={logo} alt="MEIHelp" layout="responsive" />
            </LogoArea>
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