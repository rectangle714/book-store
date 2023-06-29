import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { IconButton, Button, AppBar, Box, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/joy/Avatar';

const Header = () => {
    const authCtx = useContext(AuthContext);
    const [nickname, setNickname] = useState('');    
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;
    let navigate = useNavigate();

    const mainNavFunction = () => navigate('/');
    const loginNavFunction = () => navigate('/login');
    const signUpNavFunction = () => navigate('/signup');
    const myPageNavFunction = () => {
        alert('마이페이지');
    }

    const callback = (str:string) => {
        setNickname(str);
    }

    useEffect(() => {
        if(isLogin) {
            console.log('start');
            authCtx.getUser();
        }
    }, [isLogin]);

    useEffect(() => {
        if(isGet) {
            console.log('get start');
            callback(authCtx.userObj.nickname);
        }
    }, [isGet]);

    const toggleLogoutHandler = () => {
        authCtx.logout();
    }

    return(
        <header>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{bgcolor: 'green'}}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                <MenuIcon />
                </IconButton>
                <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img 
                        src="/image/puppy.png" 
                        alt='logo image' 
                        style={{ width:50, height:50, marginTop:15, marginBottom:10, cursor:"pointer" }} 
                        onClick={mainNavFunction}>
                    </img>
                </Typography>
                <Avatar onClick={myPageNavFunction} style={{ cursor: "pointer" }}/>
                {/* {isLogin ? <Avatar onClick={myPageNavFunction} style={{ cursor: "pointer" }}/> : ''}
                {!isLogin ? <Button onClick={loginNavFunction} color="inherit">로그인</Button> : <Button color="inherit" onClick={toggleLogoutHandler}>로그아웃</Button>}
                {!isLogin ? <Button onClick={signUpNavFunction} color="inherit">회원가입</Button> : ''} */}
                </Toolbar>

            </AppBar>
            </Box>
        </header>
    )
}

export default Header;