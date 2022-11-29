// ** React Imports
import { Link, useNavigate } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import {
    User,
    Mail,
    CheckSquare,
    MessageSquare,
    Settings,
    CreditCard,
    HelpCircle,
    Power,
    LogOut,
} from "react-feather"

import { IoPerson } from "react-icons/io5"
import { FaCog } from "react-icons/fa"
import { MdLogout } from "react-icons/md"

// ** Reactstrap Imports
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
} from "reactstrap"

import { useDispatch, useSelector } from "react-redux"
import { handleLogin, changeLoginState } from "@store/auth"

// ** Default Avatar Image
// import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg"
import useProtectedAxios from "../../../../utility/hooks/useProtectedAxios"

const UserDropdown = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const protectedAxios = useProtectedAxios()

    const { user, accessToken } = useSelector((state) => state.auth)

    const handleLogout = async () => {
        const res = await protectedAxios.delete("/parent/logout", {
            headers: { authorization: `Bearer ${accessToken}` },
        })

        if (res.status === false) {
            console.log(res)
        } else {
            dispatch(handleLogin({ accessToken: null, user: null }))
            dispatch(changeLoginState(false))
            localStorage.removeItem("isLoggedIn")
            navigate("/login")
        }
    }

    return (
        <UncontrolledDropdown
            tag="li"
            className="d-none d-lg-block dropdown-user nav-item"
        >
            <DropdownToggle
                href="/"
                tag="a"
                className="nav-link dropdown-user-link"
                onClick={(e) => e.preventDefault()}
            >
                <div className="user-nav d-sm-flex d-none">
                    <span className="user-name fw-bold">
                        {user && user.email}
                    </span>
                    <span className="user-status">{user && user.username}</span>
                </div>
                <Avatar
                    img="./assets/images/avatar/parent-default.png"
                    imgHeight="40"
                    imgWidth="40"
                    status="online"
                />
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem
                    tag={Link}
                    to="/"
                    onClick={(e) => e.preventDefault()}
                >
                    <IoPerson size={14} className="me-75" />
                    <span className="align-middle">My Account</span>
                </DropdownItem>

                <DropdownItem tag={Link} to="/kids">
                    <FaCog size={14} className="me-75" />
                    <span className="align-middle">Manage Kids</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout} className="logout">
                    <MdLogout size={14} className="me-75" />
                    <span className="align-middle">Logout</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default UserDropdown
