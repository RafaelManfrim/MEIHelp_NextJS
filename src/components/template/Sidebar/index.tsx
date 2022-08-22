import { SidebarCategory } from '../../SidebarCategory'
import { SidebarContainer, SidebarMenuArea, SidebarArrowArea } from './styles'
import {
  IoBookSharp,
  IoFileTraySharp,
  IoLibrarySharp,
  IoPersonSharp,
  IoRepeatSharp,
  IoScaleSharp,
  IoTimeSharp,
  IoTrophySharp,
  IoWalletSharp,
} from 'react-icons/io5'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineApps,
} from 'react-icons/md'
import { NavLink } from '../../NavLink'
import { useState } from 'react'

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(true)

  return (
    <SidebarContainer>
      {expanded && (
        <SidebarMenuArea>
          <SidebarCategory name="Menu" />
          <NavLink name="Home" icon={<MdOutlineApps />} url="/dashboard" />
          <NavLink name="Atividades" icon={<IoTimeSharp />} url="/activities" />
          {/* <NavLink name="DAS" icon={<IoWalletSharp />} url="/dashboard" />
                    <NavLink name="DRE" icon={<IoFileTraySharp />} url="/dashboard" />
                    <NavLink name="Fluxo de caixa" icon={<IoRepeatSharp />} url="/dashboard" />
                    <NavLink name="Relatórios" icon={<IoLibrarySharp />} url="/dashboard" /> */}
          <NavLink name="Estoque" icon={<IoScaleSharp />} url="/stock" />
          <NavLink
            name="Encontre outros MEI"
            icon={<IoTrophySharp />}
            url="/meeting"
          />
          <NavLink name="Perfil" icon={<IoPersonSharp />} url="/profile" />
        </SidebarMenuArea>
      )}
      <SidebarArrowArea onClick={() => setExpanded(!expanded)}>
        {expanded ? (
          <MdKeyboardArrowLeft size={24} />
        ) : (
          <MdKeyboardArrowRight size={24} />
        )}
      </SidebarArrowArea>
    </SidebarContainer>
  )
}
