// ** Icons Import
import { Heart } from "react-feather"

const Footer = () => {
    return (
        <p className="clearfix mb-0 text-center">
            <span className="float-md-center d-block d-md-inline-block mt-25">
                Copyright © {new Date().getFullYear()}.{" "}
                <span className="d-none d-sm-inline-block">
                    {" "}
                    Sole Technologies Pte Ltd
                </span>
            </span>
        </p>
    )
}

export default Footer
