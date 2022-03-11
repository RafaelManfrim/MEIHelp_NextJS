import { SidebarCategory } from "../../SidebarCategory"
import { SidebarContainer, SidebarMenuArea, SidebarArrowArea } from "./styles"
import { IoAmericanFootballSharp, IoAirplaneSharp, IoBuildSharp, IoLockClosed } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineApps } from "react-icons/md"
import { NavLink } from "../../NavLink";
import { useState } from "react";

export const Sidebar = () => {
    const [expanded, setExpanded] = useState(true)

    return (
        <SidebarContainer>
            {expanded && (
                <SidebarMenuArea>
                    <SidebarCategory name="Principal" />
                    <NavLink name="Home" icon={<MdOutlineApps />} url="/dashboard" />
                    <NavLink name="Cadastrar" icon={<IoAmericanFootballSharp />} url="/cadastrar" />
                    <SidebarCategory name="Menu" />
                    <NavLink name="Link 3" icon={<IoAirplaneSharp />} url="/link3" />
                    <NavLink name="Link 4" icon={<IoBuildSharp />} url="/link4" />
                    <NavLink name="Link 5" icon={<IoLockClosed />} url="/link5" />
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