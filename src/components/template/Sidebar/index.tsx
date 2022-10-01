import {
  House,
  Clock,
  Wallet,
  Package,
  User,
  CaretLeft,
  CaretRight,
} from "phosphor-react"

import { SidebarCategory } from '../../SidebarCategory'
import { NavLink } from '../../NavLink'

import { SidebarContainer, SidebarMenuArea, SidebarArrowArea } from './styles'

interface SidebarProps {
  expanded: boolean
  changeMode: () => void
}

export const Sidebar = ({ expanded, changeMode }: SidebarProps) => {
  return (
    <SidebarContainer>
      {expanded && (
        <SidebarMenuArea>
          <SidebarCategory name="Menu" />
          <NavLink name="Home" icon={<House weight="fill" />} url="/dashboard" />
          <NavLink name="Atividades" icon={<Clock weight="fill" />} url="/activities" />
          <NavLink name="DAS" icon={<Wallet weight="fill" />} url="/das" />
          <NavLink name="Estoque" icon={<Package weight="fill" />} url="/stock" />
          <NavLink name="Perfil" icon={<User weight="fill" />} url="/profile" />
        </SidebarMenuArea>
      )}
      <SidebarArrowArea onClick={changeMode}>
        {expanded ? (
          <CaretLeft size={20} weight="bold" />
        ) : (
          <CaretRight size={20} weight="bold" />
        )}
      </SidebarArrowArea>
    </SidebarContainer>
  )
}
