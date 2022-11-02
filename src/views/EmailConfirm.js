import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { confirm } from "../api/auth"

function EmailConfirm() {
    const { verifyToken } = useParams()
    const navigate = useNavigate()

    if (!verifyToken) {
        navigate("/")
    }

    const confirmCall = async () => {
        try {
            const res = await confirm(verifyToken)
            if (res.data && res.data.status === true) {
                navigate("/login", {
                    state: {
                        verifyStatus: true,
                        verifyMessage: "Email verified. You can login now.",
                    },
                })
            } else {
                navigate("/register", {
                    state: {
                        verifyStatus: false,
                        verifyMessage: "Unknown verify token. Please try again",
                    },
                })
            }
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        confirmCall()
    }, [])

    return <></>
}

export default EmailConfirm
