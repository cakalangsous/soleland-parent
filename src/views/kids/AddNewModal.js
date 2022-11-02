// ** Reactstrap Imports
import {
    Modal,
    Input,
    Label,
    Button,
    ModalHeader,
    ModalBody,
    Form,
    FormFeedback,
} from "reactstrap"

import Spinner from "../../@core/components/spinner/Fallback-spinner"
import InputPasswordToggle from "@components/input-password-toggle"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"

const AddNewModal = ({ open, toggleSideBar, protectedAxios }) => {
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
    })

    const {
        control,
        handleSubmit,
        // setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    })

    const onSubmitHandle = async (data) => {
        try {
            const res = await protectedAxios.get("/parent/kids")
            console.log(res, data)
        } catch (err) {
            console.log(err)
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
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        color="primary"
                        block
                    >
                        Sign up
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default AddNewModal
