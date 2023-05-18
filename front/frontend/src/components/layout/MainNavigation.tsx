import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const [nickname, setNickname] = useState('');
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;

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
        <header className={classes.header}>
            <Link to='/'><div className={classes.logo}></div></Link>
        </header>
    )
}

export default MainNavigation;