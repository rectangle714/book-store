import React, { useState, useEffect, useCallback } from 'react';
import * as authAction from './auth-action';

let logoutTimer : NodeJS.Timeout;

type Props = { children?: React.ReactNode };
type UserInfo = { email: string, nickname: string, authority: string };
type LoginToken = {
    grantType: string,
    accessToken: string,
    refreshToken: string,
    accessTokenExpiresIn: number,
    refreshTokenExpiresIn: number
}

const AuthContext = React.createContext({
    token: '',
    userObj: { email: '', nickname: '', authority: ''},
    isLoggedIn: false,
    isSuccess: false,
    isGetSuccess: false,
    signup: (email: string, password: string, nickname: string) => {},
    login: (email:string, password: string) => {},
    logout: () => {},
    getUser: () => {},
    changeNickname: (nickname:string) => {},
    changePassword: (exPassword: string, newPassword: string) => {}
});

export const AuthContextProvider:React.FC<Props> = (props) => {
    const tokenData = authAction.retrieveStoredToken();

    let initialToken:any;

    
    if(tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const [userObj, setUserObj] = useState({
        email: '',
        nickname: '',
        authority: '',
    })

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isGetSuccess, setIsGetSuccess] = useState<boolean>(false);

    const userIsLoggedIn = !!token;

    const signuphandler = (email: string, password: string, nickname: string) => {
        setIsSuccess(false);
        const response = authAction.signupActionHandler(email, password, nickname);
        response.then((result) => {
            if(result != null) {
                setIsSuccess(true);
            }
        });
    }

    const loginHandler = (email: string, password: string) => {
        setIsSuccess(false);

        const data = authAction.loginActionHandler(email, password);
        data.then((result) => {
            if(result !== null) {
                const loginData:LoginToken = result.data;
                setToken(loginData.accessToken);
                console.log('loginData: ',loginData);
                logoutTimer = setTimeout(
                    logoutHandler,
                    authAction.loginTokenHandler(loginData.accessToken, loginData.accessTokenExpiresIn)
                );
                setIsSuccess(true);
            }
        })
    };

    const logoutHandler = useCallback(() => {
        setToken('');
        authAction.logoutActionHandler(token);
        localStorage.setItem('expirationTime', String(new Date().getTime()));
        if(logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const getUserHandler = () => {
        setIsGetSuccess(false);

        const data = authAction.getUserActionHandler(token);
        data.then((result) => {
            if(result !== null) {
                const userData:UserInfo = result.data;
                setUserObj(userData);
                setIsGetSuccess(true);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const changeNicknameHandler = (nickname:string) => {
        setIsSuccess(false);

        const data = authAction.changeNicknameActionHandler(nickname, token);
        data.then((result) => {
            if(result !== null) {
                const userData:UserInfo = result.data;
                setUserObj(userData);
                setIsSuccess(true);
            }
        })
    }

    const changePasswordHandler = (exPassword: string, newPassword: string) => {
        setIsSuccess(false);

        const data = authAction.changePasswordActionHandler(exPassword, newPassword, token);
        data.then((result) => {
            if(result !== null) {
                const userData:UserInfo = result.data;
                setUserObj(userData);
                setIsSuccess(true);
            }
        })
    }

    useEffect(() => {
        if(tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler])

    const contextValue = {
        token,
        userObj,
        isLoggedIn: userIsLoggedIn,
        isSuccess,
        isGetSuccess,
        signup: signuphandler,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUserHandler,
        changeNickname: changeNicknameHandler,
        changePassword: changePasswordHandler
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
