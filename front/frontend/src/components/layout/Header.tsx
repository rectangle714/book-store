import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { IconButton, Button, AppBar, Box, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/joy/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {
    const authCtx = useContext(AuthContext);
    const [nickname, setNickname] = useState('');
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navFunction = (path:any) => {
        
        if(path == 'main') {
            navigate('/');
        } else if(path == 'login') {
            navigate('/login');
        } else if(path == 'signup') {
            navigate('/signup');
        } else if(path == 'mypage') {
            navigate('/mypage');
        }
    }

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
        setAnchorEl(null);
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
                    onClick={handleMenu}
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                {isLogin ? <MenuItem onClick={myPageNavFunction}>마이페이지</MenuItem> : <Button onClick={signUpNavFunction} color="inherit">회원가입</Button>}
                {isLogin ? <MenuItem onClick={toggleLogoutHandler}>로그아웃</MenuItem> : <MenuItem onClick={loginNavFunction}>로그인</MenuItem>}
                </Menu>
                <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img 
                        src="/image/puppy.png" 
                        alt='logo image' 
                        style={{ width:50, height:50, marginTop:15, marginBottom:10, cursor:"pointer" }} 
                        onClick={mainNavFunction}>
                    </img>
                </Typography>
                <Avatar onClick={handleMenu} style={{ cursor: "pointer" }}/>
                </Toolbar>

            </AppBar>
            </Box>
        </header>
    )
}

export default Header;