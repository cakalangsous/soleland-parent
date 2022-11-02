import {
    Modal,
    Input,
    Label,
    Button,
    ModalHeader,
    ModalBody,
    Form,
    FormFeedback,
    Spinner,
} from "reactstrap"

import Flatpickr from "react-flatpickr"
import InputPasswordToggle from "@components/input-password-toggle"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import useProtectedAxios from "../../utility/hooks/useProtectedAxios"

const AddNewModal = ({
    open,
    toggleSideBar,
    setKids,
    kids,
    setSidebarOpen,
    setSuccess,
}) => {
    const protectedAxios = useProtectedAxios()

    const schema = yup.object().shape({
        name: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
        confirmPassword: yup
            .string()
            .required("confirm password is required")
            .oneOf(
                [yup.ref("password"), null],
                "Confirm password doesn't match with Password"
            ),
        gender: yup.string().required(),
        dob: yup.date().required("Date of birth is required"),
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
        const { name, username, gender, password, confirmPassword, dob } = data
        try {
            const res = await protectedAxios.post("/parent/kids", {
                name,
                username,
                password,
                password_confirmation: confirmPassword,
                gender,
                dob,
            })

            if (res.data.status === true) {
                setKids([...kids, res.data.data])
                setSidebarOpen(false)
                setSuccess(true)
            }
        } catch (err) {
            if (err.response.data.status === false) {
                const { username, name, gender, dob } = err.response.data.error
                let fieldError = false

                if (username !== undefined) fieldError = username
                if (name !== undefined) fieldError = name
                if (gender !== undefined) fieldError = gender
                if (dob !== undefined) fieldError = gender

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
                        message: res.message
                            ? res.message
                            : "Something went wrong",
                    })
                }
            }
        }
    }

    return (
        <Modal
            isOpen={open}
            toggle={toggleSideBar}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={toggleSideBar}>Add Kid Form</ModalHeader>
            <ModalBody className="mb-2">
                <Form
                    className="auth-register-form mt-2"
                    onSubmit={handleSubmit(onSubmitHandle)}
                >
                    <div className="mb-1">
                        <Label className="form-label" for="register-name">
                            Name
                        </Label>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur } }) => (
                                <Input
                                    type="text"
                                    id="register-name"
                                    placeholder="John Doe"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    invalid={Boolean(errors.name)}
                                />
                            )}
                        />
                        {errors.name && (
                            <FormFeedback>{errors.name.message}</FormFeedback>
                        )}
                    </div>
                    <div className="mb-1">
                        <Label className="form-label" for="register-username">
                            Username
                        </Label>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur } }) => (
                                <Input
                                    type="text"
                                    id="register-username"
                                    placeholder="username"
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
                        <Label className="form-label" for="register-password">
                            Password
                        </Label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur } }) => (
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
                            render={({ field: { onChange, onBlur } }) => (
                                <InputPasswordToggle
                                    className="input-group-merge"
                                    id="register-confirm-password"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    invalid={Boolean(errors.confirmPassword)}
                                />
                            )}
                        />
                        {errors.confirmPassword && (
                            <FormFeedback>
                                {errors.confirmPassword.message}
                            </FormFeedback>
                        )}
                    </div>

                    <div className="form-group my-2">
                        <Label className="form-label">Gender</Label>
                        <Controller
                            name="gender"
                            id="gender"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur } }) => {
                                return (
                                    <div className="d-flex">
                                        <div className="form-radio me-3">
                                            <Input
                                                type="radio"
                                                value="male"
                                                id="gender-male"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                invalid={Boolean(errors.gender)}
                                                name="gender"
                                            />

                                            <Label className="form-label ms-1">
                                                Male
                                            </Label>
                                        </div>

                                        <div className="form-radio">
                                            <Input
                                                type="radio"
                                                value="female"
                                                id="gender-female"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                invalid={Boolean(errors.gender)}
                                                name="gender"
                                            />
                                            <Label className="form-label ms-1">
                                                Female
                                            </Label>
                                        </div>
                                    </div>
                                )
                            }}
                        />
                        {errors.gender && (
                            <FormFeedback>{errors.gender.message}</FormFeedback>
                        )}
                    </div>
                    <div className="mb-1">
                        <Label className="form-label" for="register-dob">
                            Date of birth
                        </Label>
                        <Controller
                            name="dob"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <Flatpickr
                                    name="dob"
                                    value={value}
                                    id="hf-picker"
                                    className={
                                        Boolean(errors.dob)
                                            ? "form-control flatpickr-input is-invalid"
                                            : "form-control"
                                    }
                                    placeholder="Date of birth"
                                    onChange={onChange}
                                    options={{
                                        altInput: true,
                                        altFormat: "F j, Y",
                                        dateFormat: "Y-m-d",
                                    }}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {errors.dob && (
                            <FormFeedback>{errors.dob.message}</FormFeedback>
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
                                <span className="ms-50">Please wait...</span>
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default AddNewModal
