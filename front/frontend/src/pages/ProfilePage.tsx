import { Fragment } from "react";
import ChangePassword from "../components/auth/ChangePassword";
import ChangeUsername from "../components/auth/ChangeUsername";

const ProfilePage = () => {
    return (
        <Fragment>
            <ChangePassword />
            <ChangeUsername />
        </Fragment>
    )
}

export default ProfilePage;