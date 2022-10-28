// ** Reactstrap Imports
import {
    Modal,
    Input,
    Label,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"

const AddNewModal = ({ open, handleModal }) => {
    return (
        <Modal
            isOpen={open}
            toggle={handleModal}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={handleModal}>Login Form</ModalHeader>
            <ModalBody>
                <div className="mb-2">
                    <Label className="form-label" for="email">
                        Email:
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Email Address"
                    />
                </div>
                <div className="mb-2">
                    <Label className="form-label" for="password">
                        Password:
                    </Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(e) => e.preventDefault()}>
                    Login
                </Button>{" "}
            </ModalFooter>
        </Modal>
    )
}

export default AddNewModal
