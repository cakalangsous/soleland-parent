import jwtDecode from "jwt-decode"
import axios from "../../api/customAxios"
import { useDispatch } from "react-redux"
import { handleLogin, changeLoginState } from "../../redux/auth"
import { useNavigate } from "react-router-dom"

function useRefreshToken() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const refreshToken = async () => {
        try {
            const res = await axios.get("/parent/token")

            const decoded = jwtDecode(res.data.accessToken)

            dispatch(
                handleLogin({
                    accessToken: res.data.accessToken,
                    user: decoded,
                }),
            )

            dispatch(changeLoginState(true))
        } catch (error) {
            dispatch(handleLogin({ accessToken: null, user: null }))
            dispatch(changeLoginState(null))
            navigate("/login")
        }
    }

    return refreshToken
}

export default useRefreshToken
