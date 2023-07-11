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

    const navFunction = (e:any, path:string) => {
        if(path == 'main') {
            navigate('/');
        } else if(path == 'login') {
            navigate('/login');
        } else if(path == 'signup') {
            navigate('/signup');
        } else if(path == 'mypage') {
            navigate('/');
        } else if(path == 'admin') {
            navigate('/admin')
        }
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

    const toggleLogoutHandler = () => {
        authCtx.logout();
        alert('로그아웃 완료');
    }

    return(
        <header style={{marginBottom:'50px'}}>
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
                {isLogin ? <MenuItem onClick={(e)=>navFunction(e,'mypage')}>마이페이지</MenuItem> : <Button onClick={(e)=>navFunction(e,'signup')} color="inherit">회원가입</Button>}
                {isLogin ? <MenuItem onClick={toggleLogoutHandler}>로그아웃</MenuItem> : <MenuItem onClick={(e)=>navFunction(e,'login')}>로그인</MenuItem>}
                {(isLogin && authCtx.userObj.authority == 'ROLE_ADMIN')  ? <MenuItem onClick={(e) => navFunction(e,'admin')}>관리자</MenuItem> : ''}
                </Menu>
                <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img 
                        src="/image/puppy.png" 
                        alt='logo image' 
                        style={{ width:50, height:50, marginTop:15, marginBottom:10, cursor:"pointer" }} 
                        onClick={(e)=>navFunction(e,'main')}>
                    </img>
                </Typography>
                {isLogin ? <div style={{marginRight:'10px'}}>{authCtx.userObj.nickname}</div> : ''}
                <Avatar onClick={handleMenu} style={{ cursor: "pointer" }}/>
                </Toolbar>

            </AppBar>
            </Box>
        </header>
    )
}

export default Header;