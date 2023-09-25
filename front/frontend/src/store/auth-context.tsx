// import React, { useState, useEffect } from 'react';
// import * as authAction from './auth-action';

// let logoutTimer : NodeJS.Timeout;
// type Props = { children?: React.ReactNode };
// type UserInfo = { email: string, nickname: string, authority: string };
// type LoginToken = {
//     grantType: string,
//     accessToken: string,
//     refreshToken: string,
//     accessTokenExpiresIn: number,
//     refreshTokenExpiresIn: number
// }

// const AuthContext = React.createContext({
//     accessToken: '',
//     refreshToken: '',
//     userObj: { email: '', nickname: '', authority: ''},
//     isLoggedIn: false,
//     isSuccess: false,
//     isGetSuccess: false,
//     signup: (email: string, password: string, nickname: string) => {},
//     login: (email:string, password: string) => {},
//     logout: (token:string) => {},
//     getUser: () => {},
//     changeNickname: (nickname:string) => {},
//     changePassword: (exPassword: string, newPassword: string) => {}
// });

// export const AuthContextProvider:React.FC<Props> = (props) => {
//     const tokenData = authAction.retrieveStoredToken();

//     let initialAccessToken:any;
//     let initialRefreshToken:any;

//     if(tokenData) {
//         initialAccessToken = tokenData.token;
//         initialRefreshToken = tokenData.refreshToken;
//     }

//     const [accessToken, setToken] = useState(initialAccessToken);
//     const [refreshToken, setRefreshToken] = useState(initialRefreshToken);
//     const [isSuccess, setIsSuccess] = useState<boolean>(false);
//     const [isGetSuccess, setIsGetSuccess] = useState<boolean>(false);
//     const [userObj, setUserObj] = useState({
//         email: '',
//         nickname: '',
//         authority: '',
//     })

//     const signuphandler = (email: string, password: string, nickname: string) => {
//         setIsSuccess(false);
//         const response = authAction.signupActionHandler(email, password, nickname);
//         response.then((result) => {
//             if(result != null) {
//             }
//         });
//         setIsSuccess(true);
//     }

//     let userIsLoggedIn = !!accessToken;

//     const loginHandler = (email: string, password: string) => {
//         setIsSuccess(false);

//         const data = authAction.loginActionHandler(email, password);
//         data.then((result) => {
//             if(result !== null) {
//                 if(result.status == 200) {
//                     setIsSuccess(true);
//                     const loginData:LoginToken = result.data;
//                     setToken(loginData.accessToken);
//                     setRefreshToken(loginData.refreshToken);
//                     authAction.loginTokenHandler(loginData.accessToken, loginData.refreshToken, loginData.refreshTokenExpiresIn)
//                 }
//             }
//         })
//     };

//     const logoutHandler = () => {
//         authAction.logoutActionHandler(accessToken, refreshToken);
//         setToken('');
//         setIsSuccess(false);
//         if(logoutTimer != null && logoutTimer != undefined){
//             clearTimeout(logoutTimer);
//             console.log(logoutTimer);
//         }
//     };

//     const getUserHandler = () => {
//         setIsGetSuccess(false);

//         if(null != tokenData.token){
//             const data = authAction.getUserActionHandler(accessToken, refreshToken);
//             data.then((result) => {
//                 if(result !== null && result.status == 200) {
//                     const userData:UserInfo = result.data;
//                     setUserObj(userData);
//                     setIsGetSuccess(true);
//                 }
//             }).catch((error) => {
//                 console.log(error);
//             })
//         }

//     }

//     const changeNicknameHandler = (nickname:string) => {
//         setIsSuccess(false);

//         const data = authAction.changeNicknameActionHandler(nickname, accessToken, refreshToken);
//         data.then((result) => {
//             if(result !== null && result.status == 200) {
//                 const userData:UserInfo = result.data;
//                 setUserObj(userData);
//                 setIsSuccess(true);
//             }
//         })
//     }

//     const changePasswordHandler = (exPassword: string, newPassword: string) => {
//         setIsSuccess(false);

//         const data = authAction.changePasswordActionHandler(exPassword, newPassword, accessToken, refreshToken);
//         data.then((result) => {
//             if(result !== null && result.status == 200) {
//                 const userData:UserInfo = result.data;
//                 setUserObj(userData);
//                 setIsSuccess(true);
//             }
//         })
//     }

//     useEffect(() => {
//         if(tokenData.token != undefined) {
//             logoutTimer = setTimeout(logoutHandler, tokenData.duration);
//         }
//     }, [tokenData])

//     const contextValue = {
//         accessToken,
//         refreshToken,
//         userObj,
//         isLoggedIn: userIsLoggedIn,
//         isSuccess,
//         isGetSuccess,
//         signup: signuphandler,
//         login: loginHandler,
//         logout: logoutHandler,
//         getUser: getUserHandler,
//         changeNickname: changeNicknameHandler,
//         changePassword: changePasswordHandler
//     }

//     return(
//         <AuthContext.Provider value={contextValue}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext;
