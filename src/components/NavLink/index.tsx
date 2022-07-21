import { ReactNode } from 'react'
import { useRouter } from 'next/router'

import { NavLinkContainer, NavLinkIcon, NavLinkText } from './styles'
interface NavLinkProps {
  icon: ReactNode
  url: string
  name: string
}

export const NavLink = ({ icon, url, name }: NavLinkProps) => {
  const { asPath, push } = useRouter()

  function handleNavigate() {
    push(url)
  }

  return (
    <NavLinkContainer onClick={handleNavigate}>
      <NavLinkIcon isActive={asPath === url}>{icon}</NavLinkIcon>
      <NavLinkText isActive={asPath === url}>{name}</NavLinkText>
    </NavLinkContainer>
  )
}
