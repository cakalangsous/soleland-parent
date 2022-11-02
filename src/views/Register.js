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
    FormFeedback,
    Alert,
    Spinner,
} from "reactstrap"

// import Spinner from "../@core/components/spinner/Loading-spinner"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useDispatch, useSelector } from "react-redux"
import { handleRegisterSuccess } from "@store/auth"

// ** Styles
import "@styles/react/pages/page-authentication.scss"
import { register } from "../api/auth"
import { useEffect } from "react"

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { accessToken } = useSelector((state) => state.auth)
    const { state } = useLocation()

    useEffect(() => {
        if (accessToken) {
            navigate("/dashboard")
        }
    }, [])

    const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirmPassword: yup
            .string()
            .required("confirm password is required")
            .oneOf(
                [yup.ref("password"), null],
                "Confirm password doesn't match with Password"
            ),
        tnc: yup
            .bool()
            .required("You need to accept the terms and conditions")
            .oneOf([true], "You need to accept the terms and conditions"),
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

    const onSubmitHandle = async (data) => {
        const res = await register(data)

        if (state !== null && state.verifyStatus === false) {
            state.verifyStatus = true
        }

        if (res.status === false) {
            const { username, email } = res.error
            let fieldError = false

            if (username !== undefined) fieldError = username
            if (email !== undefined) fieldError = email

            if (fieldError) {
                setError(fieldError.param, {
                    type: "manual",
                    message: fieldError.msg
                        ? fieldError.msg
                        : "Something went wrong",
                })
            } else {
                setError("general", {
                    type: "manual",
                    message: res.message ? res.message : "Something went wrong",
                })
            }
        } else if (res.data.status === true) {
            dispatch(handleRegisterSuccess(true))
            navigate("/login")
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
                            Adventure starts here 🚀
                        </CardTitle>
                        <CardText className="mb-2">
                            Make your app management easy and fun!
                        </CardText>

                        {state?.verifyStatus === false && (
                            <Alert color="danger" isOpen={!state?.verifyStatus}>
                                <div className="alert-body">
                                    {state?.verifyMessage}
                                </div>
                            </Alert>
                        )}

                        <Form
                            className="auth-register-form mt-2"
                            onSubmit={handleSubmit(onSubmitHandle)}
                        >
                            <div className="mb-1">
                                <Label
                                    className="form-label"
                                    for="register-username"
                                >
                                    Username
                                </Label>
                                <Controller
                                    name="username"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, onBlur },
                                    }) => (
                                        <Input
                                            type="text"
                                            id="register-username"
                                            placeholder="johndoe"
                                            autoFocus
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            invalid={Boolean(errors.username)}
                                        />
                                    )}
                                />
                                {errors.username && (
                                    <FormFeedback>
                                        {errors.username.message}
                                    </FormFeedback>
                                )}
                            </div>
                            <div className="mb-1">
                                <Label
                                    className="form-label"
                                    for="register-email"
                                >
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
                                            id="register-email"
                                            placeholder="email@example.com"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            invalid={Boolean(errors.email)}
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
                                    for="register-password"
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
                                            id="register-password"
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
                            <div className="mb-1">
                                <Label
                                    className="form-label"
                                    for="register-confirm-password"
                                >
                                    Confirm Password
                                </Label>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, onBlur },
                                    }) => (
                                        <InputPasswordToggle
                                            className="input-group-merge"
                                            id="register-confirm-password"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            invalid={Boolean(
                                                errors.confirmPassword
                                            )}
                                        />
                                    )}
                                />
                                {errors.confirmPassword && (
                                    <FormFeedback>
                                        {errors.confirmPassword.message}
                                    </FormFeedback>
                                )}
                            </div>
                            <div className="form-check mb-1">
                                <Controller
                                    name="tnc"
                                    id="tnc"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange, onBlur },
                                    }) => (
                                        <Input
                                            type="checkbox"
                                            name="tnc"
                                            value={value}
                                            id="tnc"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            invalid={Boolean(errors.tnc)}
                                        />
                                    )}
                                />
                                <Label className="form-check-label" for="tnc">
                                    I agree to
                                    <a
                                        className="ms-25"
                                        href="/"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        privacy policy & terms
                                    </a>
                                </Label>
                                {errors.tnc && (
                                    <FormFeedback>
                                        {errors.tnc.message}
                                    </FormFeedback>
                                )}
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                color="primary"
                                block
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner color="white" size="sm" />
                                        <span className="ms-50">
                                            Please wait...
                                        </span>
                                    </>
                                ) : (
                                    "Sign up"
                                )}
                            </Button>
                        </Form>
                        <p className="text-center mt-2">
                            <span className="me-25">
                                Already have an account?
                            </span>
                            <Link to="/login">
                                <span>Sign in instead</span>
                            </Link>
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Register
