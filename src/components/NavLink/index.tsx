import { NavLinkContainer, NavLinkIcon, NavLinkText } from "./styles"

interface NavLinkProps {
    icon: React.ReactNode;
    url: string;
    name: string;
}

export const NavLink = ({ icon, url, name }: NavLinkProps) => {
    return (
        <NavLinkContainer href={url}>
            <NavLinkIcon>{icon}</NavLinkIcon>
            <NavLinkText>{name}</NavLinkText>
        </NavLinkContainer>
    )
}