import { SidebarCategory } from "../../SidebarCategory"
import { SidebarContainer } from "./styles"
import { IoAmericanFootballSharp, IoAirplaneSharp, IoBuildSharp, IoLockClosed } from "react-icons/io5";
import { MdOutlineApps } from "react-icons/md"
import { NavLink } from "../../NavLink";

export const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarCategory name="Principal" />
            <NavLink name="Home" icon={<MdOutlineApps />} url="/dashboard" />
            <NavLink name="Cadastrar" icon={<IoAmericanFootballSharp />} url="/cadastrar" />
            <SidebarCategory name="Menu" />
            <NavLink name="Link 3" icon={<IoAirplaneSharp />} url="/link3" />
            <NavLink name="Link 4" icon={<IoBuildSharp />} url="/link4" />
            <NavLink name="Link 5" icon={<IoLockClosed />} url="/link5" />
        </SidebarContainer>
    )
}