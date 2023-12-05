import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton, Button, AppBar, Box, Toolbar, Typography} from '@mui/material';
import { useAppSelect, useAppDispatch } from "../../store/configureStore";
import { logout, userInfo } from "../../store/modules/user";
import Styles from "../../styles/layout/Header.module.css"

const Header = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelect((state) => state.userReducer.isLogin);
    const nickname = useAppSelect((state) => state.userReducer.nickname);
    const role = useAppSelect((state) => state.userReducer.role);
    const { state } = useLocation();
    let navigate = useNavigate();

    const navFunction = (e:any, path:string) => {
        if(path == 'main') {
            navigate('/');
        } else if(path == 'login') {
            navigate('/login');
        } else if(path == 'signup') {
            navigate('/signup');
        } else if(path == 'mypage') {
            navigate('/profile');
        } else if(path == 'admin') {
            navigate('/admin/info')
        }
    }
    

    const toggleLogoutHandler = async () => {
        const result = await dispatch(logout());
        if( result.payload != undefined ) {
            alert('로그아웃');
            clearTimeout(state);
        }
        navigate('/');
    }

    useEffect(() => {
        if(isLogin) {
            async function getUserInfo() {
                const response = await dispatch(userInfo());
            }
            getUserInfo();
        }
    }, [isLogin]);

    return(
        <header >
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{bgcolor: 'white'}}>
                <div style={{backgroundColor:'white', textAlign:'right',display:'flex', justifyContent:'flex-end'}}>
                    <div style={{width:'300px', display:'flex', justifyContent:'flex-start', marginTop:'10px'}}>
                        {isLogin ? <span onClick={(e)=>navFunction(e,'mypage')} style={{fontSize:'12px', cursor:'pointer', color:'black'}}>장바구니</span> : ''}
                        {isLogin ? <span style={{width:'1px', height:'15px', margin:'0px 12px', backgroundColor:'black'}}></span> : ''}
                        {isLogin ? <span onClick={(e)=>navFunction(e,'mypage')} style={{fontSize:'12px', cursor:'pointer', color:'black'}}>마이페이지</span> : 
                        <span onClick={(e)=>navFunction(e,'signup')} style={{fontSize:'12px', cursor:'pointer', color:'black'}}>회원가입</span>}
                        <span style={{width:'1px', height:'15px', margin:'0px 12px', backgroundColor:'black'}}></span>
                        {isLogin ? <span onClick={toggleLogoutHandler} style={{fontSize:'12px', cursor:'pointer', color:'black'}}>로그아웃</span> : 
                        // <span className={'material-symbols-outlined'}>login</span>
                        <span onClick={(e)=>navFunction(e,'login')} style={{fontSize:'12px', cursor:'pointer', color:'black'}}>로그인</span>}

                        {(isLogin && role == 'ADMIN')  ? <span style={{width:'1px', height:'15px', margin:'0px 12px', backgroundColor:'black'}}></span> : ''}
                        {(isLogin && role == 'ADMIN')  ? <span style={{fontSize:'12px', cursor:'pointer', color:'black'}} onClick={(e) => navFunction(e,'admin')}>관리자</span> : ''}
                    </div>
                </div>
                <Toolbar style={{minHeight:'60px'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <div style={{color:'black'}} ><span onClick={(e)=>navFunction(e,'main')} style={{cursor:'pointer'}}>Ｃｏｌｌｉｅ</span></div>
                    </Typography>
                </Toolbar>
                {/* <HeaderMenu></HeaderMenu> */}
            </AppBar>
            </Box>
        </header>
    )
}

export default Header;