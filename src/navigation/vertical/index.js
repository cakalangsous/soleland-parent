import { Users, Home } from "react-feather"

export default [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: <Home size={20} />,
        navLink: "/dashboard",
    },
    {
        id: "secondPage",
        title: "Kids",
        icon: <Users size={20} />,
        navLink: "/kids",
    },
]
