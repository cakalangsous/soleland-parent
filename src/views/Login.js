// ** React Imports
import { Link, useLocation, useNavigate } from "react-router-dom"

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle"

// ** Reactstrap Imports
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Form,
    Label,
    Input,
    Button,
    Alert,
    FormFeedback,
} from "reactstrap"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import {
    handleLogin,
    handleRegisterSuccess,
    changeLoginState,
} from "../redux/auth"

import * as yup from "yup"
import jwtDecode from "jwt-decode"

import { login } from "../api/auth"

import "@styles/react/pages/page-authentication.scss"

const LoginBasic = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { accessToken, registerSuccess } = useSelector((state) => state.auth)
    const { state } = useLocation()

    useEffect(() => {
        if (accessToken) {
            navigate("/dashboard")
        }
    }, [])

    const [visible, setVisible] = useState(true)

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        const { email, password } = data

        const res = await login(email, password)

        if (res.status === false) {
            setVisible(true)
            setError("general", {
                type: "manual",
                message: res.message,
            })
        } else {
            const decoded = jwtDecode(res.data.data.token)

            dispatch(
                handleLogin({
                    accessToken: res.data.data.token,
                    user: decoded,
                })
            )
            dispatch(changeLoginState(true))
            localStorage.setItem("isLoggedIn", true)
            navigate("/dashboard")
        }
    }

    return (
        <div className="auth-wrapper auth-basic px-2">
            <div className="auth-inner my-2">
                <Card className="mb-0">
                    <CardBody>
                        <Link
                            className="brand-logo"
                            to="/"
                            onClick={(e) => e.preventDefault()}
                        >
                            <img
                                src={
                                    require("@src/assets/images/logo/logo-landscape.png")
                                        .default
                                }
                            />
                        </Link>
                        <CardTitle tag="h4" className="mb-1">
                            Welcome to Soleland!
                        </CardTitle>
                        <CardText className="mb-2">
                            Please sign-in to your account and start the
                            adventure
                        </CardText>
                        {registerSuccess ||
                            (state?.verifyStatus === false && (
                                <Alert
                                    color="success"
                                    isOpen={visible}
                                    toggle={() => {
                                        setVisible(false)
                                        dispatch(handleRegisterSuccess(false))
                                    }}
                                >
                                    <div className="alert-body">
                                        {state?.verifyStatus
                                            ? state?.verifyMessage
                                            : `Congratulations! You're successfully
                                    registered. Please verify your email to`}
                                        login.
                                    </div>
                                </Alert>
                            ))}

                        {errors.general && (
                            <Alert
                                color="danger"
                                isOpen={visible}
                                toggle={() => setVisible(false)}
                            >
                                <div className="alert-body">
                                    {errors.general.message}
                                </div>
                            </Alert>
                        )}
                        <Form
                            className="auth-login-form mt-2"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="mb-1">
                                <Label className="form-label" for="login-email">
                                    Email
                                </Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, onBlur },
                                    }) => (
                                        <Input
                                            type="email"
                                            id="login-email"
                                            placeholder="email@example.com"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            invalid={Boolean(errors.email)}
                                            autoFocus
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <FormFeedback>
                                        {errors.email.message}
                                    </FormFeedback>
                                )}
                            </div>
                            <div className="mb-1">
                                <Label
                                    className="form-label"
                                    for="login-password"
                                >
                                    Password
                                </Label>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, onBlur },
                                    }) => (
                                        <InputPasswordToggle
                                            className="input-group-merge"
                                            id="login-password"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            invalid={Boolean(errors.password)}
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <FormFeedback>
                                        {errors.password.message}
                                    </FormFeedback>
                                )}
                            </div>
                            <Button
                                disabled={isSubmitting}
                                color="primary"
                                block
                            >
                                Sign in
                            </Button>
                        </Form>
                        <p className="text-center mt-2">
                            <span className="me-25">New on our platform?</span>
                            <Link to="/register">
                                <span>Create an account</span>
                            </Link>
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default LoginBasic
