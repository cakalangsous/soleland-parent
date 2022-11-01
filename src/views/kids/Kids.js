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
                    <th>Level</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {kids &&
                    kids.map((value, index) => {
                        return (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{value.name}</td>
                                <td>{value.username}</td>
                                <td>{value.gender}</td>
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
    const [kids, setKids] = useState(null)

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSideBar = () => setSidebarOpen(!sidebarOpen)

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
    useEffect(() => {
        getKids()
    }, [])

    return (
        <Fragment>
            <Breadcrumbs title="Kids" data={[{ title: "Kids" }]} />

            <Row>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kids data</CardTitle>
                            {kids && kids.length <= 4 && (
                                <Button color="primary" onClick={toggleSideBar}>
                                    Add Kid
                                </Button>
                            )}
                        </CardHeader>
                        <CardBody>
                            <TableBasic kids={kids} responsive />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <AddNewModal
                open={sidebarOpen}
                toggleSideBar={toggleSideBar}
                protectedAxios
            />
        </Fragment>
    )
}

export default Kids
