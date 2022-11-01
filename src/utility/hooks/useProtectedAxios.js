import jwtDecode from "jwt-decode"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleLogin } from "../../redux/auth"
import axios from "../../api/customAxios"
import refreshToken from "../../api/refreshToken"
import { useNavigate } from "react-router-dom"

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const useProtectedAxios = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { accessToken } = useSelector((state) => state.auth)

    const protectedAxios = axios.create({
        withCredentials: true,
        credentials: "include",
    })

    let tempAccessToken = accessToken

    useEffect(() => {
        protectedAxios.interceptors.request.use(async (config) => {
            if (!tempAccessToken) {
                tempAccessToken = await refreshToken()
                if (tempAccessToken.status === false) {
                    navigate("/login")
                } else {
                    tempAccessToken = tempAccessToken.data.accessToken
                }
            }
            const decodedAccessToken = jwtDecode(tempAccessToken)
            const currentDate = new Date()

            config.headers.Authorization = `Bearer ${tempAccessToken}`

            console.log(config.headers)

            if (decodedAccessToken.exp * 1000 < currentDate.getTime()) {
                try {
                    const res = await refreshToken()
                    const decoded = jwtDecode(res.data.accessToken)
                    dispatch(
                        handleLogin({
                            accessToken: res.data.accessToken,
                            user: decoded,
                        })
                    )
                    config.headers.Authorization = `Bearer ${res.data.accessToken}`
                } catch (error) {
                    console.log("error refresh token ", error)
                }
            }

            return config
        })
    }, [])

    return protectedAxios
}

export default useProtectedAxios
