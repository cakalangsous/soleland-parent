import { createSlice } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        registerSuccess: false,
        accessToken: null,
        user: null,
        isLoggedIn: localStorage.getItem("isLoggedIn"),
    },
    reducers: {
        handleRegisterSuccess: (state, action) => {
            state.registerSuccess = action.payload
        },
        handleLogin: (state, action) => {
            state.accessToken = action.payload.accessToken

            if (action.payload.accessToken) {
                const decoded = jwtDecode(action.payload.accessToken)
                state.user = decoded
            }
        },
        changeLoginState: (state, action) => {
            state.isLoggedIn = action.payload
        },
    },
})

export const { handleRegisterSuccess, handleLogin, changeLoginState } =
    authSlice.actions

export default authSlice.reducer
