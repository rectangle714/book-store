import { Fragment } from "react";
import ChangePassword from "../components/auth/ChangePassword";
import ChangeUsername from "../components/auth/ChangeUsername";
import Container from '@mui/material/Container';
import Profile from "../components/member/user/Profile";

const ProfilePage = () => {
    return (
        <>
            <Container maxWidth="md">
                <Profile></Profile>
            </Container>
        </>
    )
}

export default ProfilePage;