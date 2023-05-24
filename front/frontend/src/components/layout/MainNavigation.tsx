import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/joy/Avatar';

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const [nickname, setNickname] = useState('');    
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;
    let navigate = useNavigate();

    const mainNavFunction = () => navigate('/');
    const loginNavFunction = () => navigate('/login');
    const signUpNavFunction = () => navigate('/signup');

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
            <AppBar position="static">
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Button onClick={mainNavFunction} size="large" color="inherit">메인</Button>
                </Typography>
                {isLogin ? <Avatar /> : ''}
                {!isLogin ? <Button onClick={loginNavFunction} color="inherit">LOGIN</Button> : <Button color="inherit" onClick={toggleLogoutHandler}>Logout</Button>}
                {!isLogin ? <Button onClick={signUpNavFunction} color="inherit">SIGN UP</Button> : ''}
                </Toolbar>
            </AppBar>
            </Box>
            {/* <Link to='/'><div></div></Link>
            <nav>
                <ul>
                    <li>{isLogin && <Link to='/login'>Login</Link>}</li>
                    <li>{isLogin && <Link to='/signup'>Sign-Up</Link>}</li>
                    <li>{isLogin && <Link to='/profile'>{nickname}</Link>}</li>
                    <li>{!isLogin && <button onClick={toggleLogoutHandler}>Logout</button>}</li>
                </ul>
            </nav> */}
        </header>
    )
}

export default MainNavigation;