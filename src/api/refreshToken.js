import axios from "./customAxios"
const refreshToken = async () => {
    try {
        return await axios.get("/parent/token")
    } catch (error) {
        if (error.response.data.status === false) {
            return error.response.data
        }
    }
}

export default refreshToken
