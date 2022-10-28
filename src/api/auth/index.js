import axios from "../customAxios"

export const register = async ({
    username,
    email,
    password,
    confirmPassword,
}) => {
    try {
        return await axios.post("/parent/register", {
            username,
            email,
            password,
            password_confirmation: confirmPassword,
        })
    } catch (err) {
        if (err.response.data) {
            return err.response.data
        }
    }
}

export const login = async (email, password) => {
    try {
        return await axios.post("/parent/login", { email, password })
    } catch (err) {
        if (err.response.data) {
            return err.response.data
        }
    }
}
