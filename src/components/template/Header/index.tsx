import { IoLogOutOutline } from "react-icons/io5"
import { HeaderContainer, LogoArea, ActionsArea, HeaderButton, InfoArea, LogoutButton, LogoutButtonText } from "./styles"

interface HeaderProps {
    landingHeader?: boolean;
}

export const Header = ({ landingHeader }: HeaderProps) => {
    return (
        <HeaderContainer>
            <LogoArea>LOGO</LogoArea>
            {landingHeader ? (
                <ActionsArea>
                    <HeaderButton>Entrar</HeaderButton>
                    <HeaderButton>Registrar-se</HeaderButton>
                </ActionsArea>
            ) : (
                <ActionsArea>
                    <InfoArea>
                        Nome do usuário(empresa)
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