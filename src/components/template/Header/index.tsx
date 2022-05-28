import Image from "next/image"
import { useRouter } from "next/router"
import { IoLogOutOutline } from "react-icons/io5"

import logo from "../../../../public/logo-horizontal.png"
import { useAuth } from "../../../contexts/AuthContext"

import { HeaderContainer, LogoArea, ActionsArea, HeaderButton, InfoArea, LogoutButton, LogoutButtonText, UserAccountButton } from "./styles"

export const Header = () => {
    const { user, tokens, signOut } = useAuth()
    const router = useRouter()

    function handleLogin() {
        router.push('/login')
    }

    function handleProfile() {
        router.push('/profile')
    }

    return (
        <HeaderContainer>
            <LogoArea>
                <Image src={logo} alt="MEIHelp" layout="responsive" />
            </LogoArea>
            {!tokens.refresh ? (
                <HeaderButton onClick={handleLogin}>Entrar</HeaderButton>
            ) : (
                <ActionsArea>
                    <InfoArea>
                        <UserAccountButton onClick={handleProfile}>{user.corporate_name}</UserAccountButton>
                    </InfoArea>
                    <LogoutButton>
                        <IoLogOutOutline />
                        <LogoutButtonText onClick={signOut}>Sair</LogoutButtonText>
                    </LogoutButton>
                </ActionsArea>
            )}
        </HeaderContainer>
    )
}
