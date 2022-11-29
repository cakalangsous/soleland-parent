import AvatarGroup from "@components/avatar-group"
import { Fragment, useEffect, useState } from "react"
import {
    Button,
    Alert,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap"

import { FaPlus, FaPen, FaTrashAlt } from "react-icons/fa"
import { SlOptionsVertical } from "react-icons/sl"

import useProtectedAxios from "../../utility/hooks/useProtectedAxios"
import AddNewModal from "./AddNewModal"
import { Link } from "react-router-dom"

const Kids = () => {
    const protectedAxios = useProtectedAxios()
    const [kids, setKids] = useState(false)

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [success, setSuccess] = useState(false)

    const toggleSideBar = () => setSidebarOpen(!sidebarOpen)

    useEffect(() => {
        if (kids) return
        const getKids = async () => {
            try {
                const res = await protectedAxios.get("/parent/kids")

                if (res.data.status === true) {
                    setKids(res.data.kids)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getKids()
    }, [kids])
    return (
        <Fragment>
            <div className="row pt-3">
                <div className="col-12 w-full d-flex justify-content-end">
                    {success && (
                        <div className="mt-2">
                            <Alert
                                color="success"
                                isOpen={success}
                                toggle={() => setSuccess(false)}
                            >
                                <div className="alert-body">
                                    Success! New kid data are stored
                                    successfully
                                </div>
                            </Alert>
                        </div>
                    )}
                    <Button
                        color="primary"
                        onClick={() => {
                            toggleSideBar()
                            setSuccess(false)
                        }}
                        className="d-flex items-center"
                    >
                        <FaPlus className="me-1" /> Add Kid
                    </Button>
                </div>
            </div>

            <div className="row my-3">
                <div className="col-12 text-center">
                    <h3>Manage Kids</h3>
                    <p className="mt-1">Manage your Kid's accounts.</p>
                </div>
            </div>

            <div className="row d-lg-none kids-list-mobile">
                {kids &&
                    kids.map((kid) => (
                        <Fragment key={kid.id}>
                            <div className="col-12 kid-list-item">
                                <div className="info-wrapper">
                                    <img
                                        src={`./assets/images/avatar/${kid.gender}.png`}
                                        alt=""
                                    />
                                    <h4 className="ms-2">{kid.name}</h4>
                                </div>
                                <div className="kid-menu">
                                    <div className="breadcrumb-right dropdown">
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle
                                                color="transparent"
                                                className="btn-icon btn-round dropdown-toggle"
                                            >
                                                <SlOptionsVertical size={14} />
                                            </DropdownToggle>
                                            <DropdownMenu tag="ul" end>
                                                <DropdownItem
                                                    tag={Link}
                                                    to="/apps/todo"
                                                >
                                                    <FaPen
                                                        className="me-1"
                                                        size={14}
                                                    />
                                                    <span className="align-middle">
                                                        Edit
                                                    </span>
                                                </DropdownItem>
                                                <hr className="my-0" />
                                                <DropdownItem
                                                    tag={Link}
                                                    to="/apps/todo"
                                                >
                                                    <FaTrashAlt
                                                        className="me-1"
                                                        size={14}
                                                    />
                                                    <span className="align-middle">
                                                        Delete
                                                    </span>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-1" />
                        </Fragment>
                    ))}
            </div>

            <div className="row d-none d-lg-flex">
                {kids &&
                    kids.map((kid) => (
                        <div
                            className="col-lg-4 p-0 kid-list-card"
                            key={kid.id}
                        >
                            <div className="image-bg px-1">
                                <img
                                    src={`./assets/images/card/mobile-card-${kid.gender}.png`}
                                    alt=""
                                    className="card-bg"
                                />
                            </div>
                            <div className="px-1">
                                <div className="kid-info-wrapper">
                                    <div className="kid-info">
                                        <img
                                            src={`./assets/images/avatar/kid-card-${kid.gender}.png`}
                                            alt=""
                                            width={60}
                                            className="kid-avatar"
                                        />

                                        <h3>{kid.name}</h3>
                                    </div>

                                    <div className="row kid-btn-wrapper container">
                                        <button
                                            className={`col-5 kid-card-btn btn-${kid.gender}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={`col-5 kid-card-btn btn-${kid.gender}`}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <AddNewModal
                open={sidebarOpen}
                toggleSideBar={toggleSideBar}
                setKids={setKids}
                kids={kids}
                setSidebarOpen={setSidebarOpen}
                setSuccess={setSuccess}
            />
        </Fragment>
    )
}

export default Kids
