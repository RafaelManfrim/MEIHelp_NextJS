import { NavLinkContainer, NavLinkIcon, NavLinkText } from "./styles"
import { useRouter } from "next/router"

interface NavLinkProps {
    icon: React.ReactNode;
    url: string;
    name: string;
}

export const NavLink = ({ icon, url, name }: NavLinkProps) => {
    const { asPath } = useRouter()

    return (
        <NavLinkContainer href={url}>
            <NavLinkIcon isActive={asPath === url}>{icon}</NavLinkIcon>
            <NavLinkText isActive={asPath === url}>{name}</NavLinkText>
        </NavLinkContainer>
    )
}