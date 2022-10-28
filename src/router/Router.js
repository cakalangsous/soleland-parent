// ** Router imports
import { useRoutes } from "react-router-dom"

// ** GetRoutes
import { getRoutes } from "./routes"

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout"
import useRefreshToken from "../utility/hooks/useRefreshToken"
import { useSelector } from "react-redux"

const Router = () => {
    // ** Hooks
    const { layout } = useLayout()

    const allRoutes = getRoutes(layout)

    const routes = useRoutes([...allRoutes])

    const { isLoggedIn, accessToken } = useSelector((state) => state.auth)

    const refreshToken = useRefreshToken()

    if (isLoggedIn && accessToken === null) {
        refreshToken()
    }
    return routes
}

export default Router
