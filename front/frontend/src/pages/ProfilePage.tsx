import { Fragment } from "react";
import ChangePassword from "../components/auth/ChangePassword";
import ChangeUsername from "../components/auth/ChangeUsername";
import Container from '@mui/material/Container';

const ProfilePage = () => {
    return (
        <Fragment>
            <Container maxWidth="md" fixed>
                <ChangePassword />
                <ChangeUsername />
            </Container>
        </Fragment>
    )
}

export default ProfilePage;