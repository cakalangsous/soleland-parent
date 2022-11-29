import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import refreshToken from "../api/refreshToken"
import styled from "styled-components"
import { FaPlus } from "react-icons/fa"
import AddNewModal from "./kids/AddNewModal"
import useProtectedAxios from "../utility/hooks/useProtectedAxios"
import { Alert } from "reactstrap"

const Card = styled.div`
    background-image: url("${(props) => props.img}");
    background-size: cover;
    background-repeat: no-repeat;
`

const AvatarLink = styled(Link)`
    margin-right: 5px;
`

const AddKidButton = styled.button`
    background-color: #d7dcdf;
    border: 1px solid #d7dcdf;
    border-radius: 10px !important;
    padding: 0.6rem 0.7rem;
    outline: none;
`

const FaAddIcon = styled(FaPlus)`
    color: #707375;
`

const Dashboard = () => {
    const navigate = useNavigate()
    const protectedAxios = useProtectedAxios()

    const { user, accessToken } = useSelector((state) => state.auth)
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const [kids, setKids] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [success, setSuccess] = useState(false)

    const toggleSideBar = () => setSidebarOpen(!sidebarOpen)
    // const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!isLoggedIn && !accessToken) {
            navigate("/login")
        }

        if (isLoggedIn && !accessToken) {
            refreshToken()
        }
    }, [])

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
        if (kids) return
        getKids()
    }, [kids])

    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    {success && (
                        <div className="col-12">
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
                        </div>
                    )}
                    <div className="col-12">
                        <h3>Hi, {user?.username} 😀</h3>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-12">
                        <div className="flex align-items-center">
                            {kids &&
                                kids.map((kid) => (
                                    <AvatarLink
                                        to={"/"}
                                        key={kid.id}
                                        title={kid.name}
                                    >
                                        <img
                                            src={`./assets/images/avatar/${kid.gender}.png`}
                                            alt=""
                                            width={40}
                                        />
                                    </AvatarLink>
                                ))}

                            <AddKidButton
                                type="button"
                                onClick={toggleSideBar}
                                title="Add Kid"
                            >
                                <FaAddIcon />
                            </AddKidButton>
                        </div>
                    </div>
                </div>
                <hr className="d-lg-none mb-2" />
                <div className="row">
                    {kids &&
                        kids.map((kid) => (
                            <div
                                className="card dashboard-card col-12 col-md-6 col-lg-4 position-relative"
                                key={kid.id}
                            >
                                <img
                                    src={`./assets/images/card/desktop-card-${kid.gender}.png`}
                                    alt=""
                                    className="d-none d-md-block position-absolute dashboard-card-bg"
                                />

                                <img
                                    src={`./assets/images/card/mobile-card-${kid.gender}.png`}
                                    alt=""
                                    className="d-block d-md-none position-absolute dashboard-card-bg"
                                />
                                <div className="card-body">
                                    <div className="row dashboard-card">
                                        <div className="col-7 col-lg-6">
                                            <div className="info-wrapper">
                                                <div className="image-wrapper">
                                                    <img
                                                        src={`./assets/images/avatar/kid-card-${kid.gender}.png`}
                                                        alt=""
                                                        width={40}
                                                    />
                                                </div>
                                                <div className="info-wrapper-details">
                                                    <div className="info-wrapper-details-info">
                                                        <h4>{kid.name}</h4>
                                                        <small>Online</small>
                                                        <small>
                                                            Login today: 7 times
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                to="/"
                                                className={`card-details-link link-${kid.gender}`}
                                            >
                                                View Detail
                                            </Link>
                                            {/* <Link to="/" className="card-details-link ">
                                        <FaCog />
                                    </Link> */}
                                        </div>
                                        <div className="col-5 col-lg-6">
                                            <div className="position-relative w-100 h-100 pie-chart-wrapper">
                                                <img
                                                    src={`./assets/images/pie-chart-${kid.gender}.png`}
                                                    alt=""
                                                    className="desktop-pie-chart"
                                                />
                                                <div className="screen-time-wrapper">
                                                    <h5>4.3 hrs</h5>
                                                    <small>Screen Time</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <AddNewModal
                open={sidebarOpen}
                toggleSideBar={toggleSideBar}
                setKids={setKids}
                kids={kids}
                setSidebarOpen={setSidebarOpen}
                setSuccess={setSuccess}
            />
        </div>
    )
}

export default Dashboard
