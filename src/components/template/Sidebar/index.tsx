import { SidebarCategory } from "../../SidebarCategory"
import { SidebarContainer } from "./styles"
import { IoAnalyticsSharp, IoAmericanFootballSharp, IoAirplaneSharp, IoBuildSharp, IoLockClosed } from "react-icons/io5";
import { NavLink } from "../../NavLink";

export const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarCategory name="Categoria 1" />
            <NavLink name="Link 1" icon={<IoAnalyticsSharp />} url="/link1" />
            <NavLink name="Link 2" icon={<IoAmericanFootballSharp />} url="/link2" />
            <SidebarCategory name="Categoria 2" />
            <NavLink name="Link 3" icon={<IoAirplaneSharp />} url="/link3" />
            <NavLink name="Link 4" icon={<IoBuildSharp />} url="/link4" />
            <NavLink name="Link 5" icon={<IoLockClosed />} url="/link5" />
        </SidebarContainer>
    )
}