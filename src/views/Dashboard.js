import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import refreshToken from "../api/refreshToken"

const Dashboard = () => {
    const navigate = useNavigate()
    const { accessToken } = useSelector((state) => state.auth)
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    useEffect(() => {
        if (!isLoggedIn && !accessToken) {
            navigate("/login")
        }

        if (isLoggedIn && !accessToken) {
            refreshToken()
        }
    }, [])
    return <div></div>
}

export default Dashboard
