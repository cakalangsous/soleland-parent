import AvatarGroup from "@components/avatar-group"
import { Fragment, useEffect, useState } from "react"
import { Edit, Trash } from "react-feather"
import {
    Table,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Button,
    Spinner,
    Alert,
} from "reactstrap"

import Breadcrumbs from "@components/breadcrumbs"

import useProtectedAxios from "../../utility/hooks/useProtectedAxios"
import AddNewModal from "./AddNewModal"

const TableBasic = (props) => {
    const { kids } = props

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Level</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {kids === false && (
                    <tr>
                        <td colSpan={7} align="center">
                            <div className="d-flex align-items-center justify-content-center w-100 mt-2">
                                <Spinner color="primary" size="lg" />
                                <span className="ms-50">
                                    Loading Kids data...
                                </span>
                            </div>
                        </td>
                    </tr>
                )}
                {kids &&
                    kids.map((value, index) => {
                        return (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{value.name}</td>
                                <td>{value.username}</td>
                                <td>{value.gender}</td>
                                <td>{value.dob}</td>
                                <td>{value.level}</td>
                                <td>
                                    <Button
                                        className="btn-icon me-1"
                                        color="flat-warning"
                                    >
                                        <Edit size={14} />
                                    </Button>

                                    <Button
                                        className="btn-icon"
                                        color="flat-danger"
                                    >
                                        <Trash size={14} />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </Table>
    )
}

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
            <Breadcrumbs title="Kids" data={[{ title: "Kids" }]} />

            <Row>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kids data</CardTitle>
                            {kids && kids.length < 4 && (
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        toggleSideBar()
                                        setSuccess(false)
                                    }}
                                >
                                    Add Kid
                                </Button>
                            )}
                        </CardHeader>
                        {success && (
                            <div className="px-2 mt-2">
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
                        <CardBody>
                            <TableBasic kids={kids} responsive />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

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
