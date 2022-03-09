import styled from "styled-components"

interface NavLinkIconProps {
    isActive: boolean
}

interface NavLinkTextProps {
    isActive: boolean
}

export const NavLinkContainer = styled.a`
    text-decoration: none;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    transition: filter 0.1s linear;

    &:hover {
        filter: brightness(0.85);
    }
`

export const NavLinkIcon = styled.div<NavLinkIconProps>`
    margin-right: 0.5rem;
    font-size: 1.25rem;
    background-color: var(--white);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    padding: 0.25rem;
    color: ${({ isActive }) => isActive ? 'var(--dark-blue)' : 'var(--light-blue)'};
`

export const NavLinkText = styled.span<NavLinkTextProps>`
    color: ${({ isActive }) => isActive ? 'var(--dark-blue)' : 'var(--white)'};
    font-size: 1rem;
    line-height: 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
`