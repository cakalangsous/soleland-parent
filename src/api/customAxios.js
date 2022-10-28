import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_API_URL

export default axios.create({
    withCredentials: true,
    credentials: "include",
})
