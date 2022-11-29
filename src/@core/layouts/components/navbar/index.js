// ** React Imports
import { Fragment } from "react"

// ** Custom Components
import NavbarUser from "./NavbarUser"

// ** Third Party Components
// import { Menu } from "react-feather"

// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap"
import { Link } from "react-router-dom"

const ThemeNavbar = (props) => {
    // ** Props
    const { skin, setSkin, setMenuVisibility } = props

    // ** Function to toggle Theme (Light/Dark)
    // const ThemeToggler = () => {
    //   if (skin === "dark") {
    //     return <Sun className="ficon" onClick={() => setSkin("light")} />
    //   } else {
    //     return <Moon className="ficon" onClick={() => setSkin("dark")} />
    //   }
    // }

    return (
        <Fragment>
            <div className="bookmark-wrapper d-flex align-items-center">
                <ul className="navbar-nav d-flex align-items-center">
                    {/* <NavItem className="mobile-menu me-auto">
                        <NavLink
                            className="nav-menu-main menu-toggle hidden-xs is-active"
                            onClick={() => setMenuVisibility(true)}
                        >
                            <Menu className="ficon" />
                        </NavLink>
                    </NavItem> */}

                    <NavItem className="">
                        <NavLink
                            className="nav-menu hidden-xs"
                            tag={Link}
                            to="/dashboard"
                        >
                            <img
                                src={
                                    require("@src/assets/images/logo/logo-landscape.png")
                                        .default
                                }
                                alt="logo"
                                width={"55%"}
                            />
                        </NavLink>
                    </NavItem>
                </ul>
            </div>
            <NavbarUser
                skin={skin}
                setSkin={setSkin}
                setMenuVisibility={setMenuVisibility}
            />
        </Fragment>
    )
}

export default ThemeNavbar
