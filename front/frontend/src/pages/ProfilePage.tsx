import { Fragment } from "react";
import ChangePassword from "../components/auth/ChangePassword";
import ChangeUsername from "../components/auth/ChangeUsername";
import Container from '@mui/material/Container';
import Profile from "../components/member/user/Profile";

const ProfilePage = () => {
    return (
        <Fragment>
            <Container maxWidth="md" fixed 
            style={{
                height: '85vh',
                justifyContent:'center',
                alignItems:'center',
                textAlign: 'center'
            }}>
                <Profile></Profile>
            </Container>
        </Fragment>
    )
}

export default ProfilePage;