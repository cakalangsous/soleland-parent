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
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg"
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
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
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
                    img={defaultAvatar}
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
                    <User size={14} className="me-75" />
                    <span className="align-middle">Profile</span>
                </DropdownItem>
                <DropdownItem
                    tag={Link}
                    to="/"
                    onClick={(e) => e.preventDefault()}
                >
                    <Mail size={14} className="me-75" />
                    <span className="align-middle">Inbox</span>
                </DropdownItem>
                <DropdownItem
                    tag={Link}
                    to="/"
                    onClick={(e) => e.preventDefault()}
                >
                    <CheckSquare size={14} className="me-75" />
                    <span className="align-middle">Tasks</span>
                </DropdownItem>
                <DropdownItem
                    tag={Link}
                    to="/"
                    onClick={(e) => e.preventDefault()}
                >
                    <MessageSquare size={14} className="me-75" />
                    <span className="align-middle">Chats</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                    tag={Link}
                    to="/pages/"
                    onClick={(e) => e.preventDefault()}
                >
                    <Settings size={14} className="me-75" />
                    <span className="align-middle">Settings</span>
                </DropdownItem>
                <DropdownItem
                    tag={Link}
                    to="/"
                    onClick={(e) => e.preventDefault()}
                >
                    <CreditCard size={14} className="me-75" />
                    <span className="align-middle">Pricing</span>
                </DropdownItem>
                <DropdownItem
                    tag={Link}
                    to="/"
                    onClick={(e) => e.preventDefault()}
                >
                    <HelpCircle size={14} className="me-75" />
                    <span className="align-middle">FAQ</span>
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                    <Power size={14} className="me-75" />
                    <span className="align-middle">Logout</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default UserDropdown
