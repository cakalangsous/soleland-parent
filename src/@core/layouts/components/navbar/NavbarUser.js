import { NavItem, NavLink } from "reactstrap"

// ** Dropdowns Imports
import UserDropdown from "./UserDropdown"
import { Sun, Moon, Menu } from "react-feather"

const NavbarUser = (props) => {
    const { skin, setSkin, setMenuVisibility } = props
    const ThemeToggler = () => {
        if (skin === "dark") {
            return <Sun className="ficon" onClick={() => setSkin("light")} />
        } else {
            return <Moon className="ficon" onClick={() => setSkin("dark")} />
        }
    }
    return (
        <ul className="nav navbar-nav align-items-center ms-auto">
            <UserDropdown />
            <NavItem className="d-none d-lg-block">
                <NavLink className="nav-link-style ms-1 me-2 ">
                    <ThemeToggler />
                </NavLink>
            </NavItem>
            <NavItem className="mobile-menu me-auto">
                <NavLink
                    className="d-lg-none nav-menu-main menu-toggle hidden-xs is-active sole-mobile-menu-trigger"
                    onClick={() => setMenuVisibility(true)}
                >
                    <Menu className="ficon" />
                </NavLink>
            </NavItem>
        </ul>
    )
}
export default NavbarUser
