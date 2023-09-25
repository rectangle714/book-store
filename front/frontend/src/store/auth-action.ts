// import { getCookie, setCookie, removeCookie } from "./cookie";
// // import { GET, POST } from "./fetch-auth-action";

// /* 토큰 생성 */
// const createTokenHeader = (accessToken:string, refreshToken:string) => {
//     return {
//         headers: {
//             'Authorization' : 'Bearer ' + accessToken,
//             'RefreshToken' : 'Bearer ' + refreshToken
//         }
//     }
// }

// /* 토큰 만료시간 계산 */
// const calculateRemainingTime = (expirationTime:number) => {
//     const currentTime = new Date().getTime();
//     const adjExpirationTime = new Date(expirationTime).getTime();
//     const remainingDuration = adjExpirationTime - currentTime;
//     return remainingDuration;
// }

// /* 토큰값, 만료시간을 저장 */
// export const loginTokenHandler = (accessToken:string, refreshtoken:string, expirationTime:number) => {
//     setCookie('accessToken', accessToken);
//     setCookie('refreshToken', refreshtoken);
//     setCookie('expirationTime', String(expirationTime));
//     const remainingTime = calculateRemainingTime(expirationTime);
//     return remainingTime;
// }

// /* 토큰 만료시간 확인 */
// export const retrieveStoredToken = () => {
//     const storedAccessToken = getCookie('accessToken');
//     const storedRefreshToken = getCookie('refreshToken');
//     const storedExpirationDate = getCookie('expirationTime') || '0';
//     const remaingTime = calculateRemainingTime(+ storedExpirationDate);

//     return {
//         token : storedAccessToken,
//         refreshToken : storedRefreshToken,
//         duration : remaingTime
//     }
// }

// /* 회원가입 */
// export const signupActionHandler = (email: string, password: string, nickname: string) => {
//     const URL = '/auth/signup';
//     const signupObject = {email, password, nickname};

//     const response = POST(URL, signupObject, {});
//     return response;
// }

// /* 로그인 */
// export const loginActionHandler = (email: string, password: string) => {
//     const URL = '/auth/login';
//     const loginObject = {email, password};
//     const response = POST(URL, loginObject, {});

//     return response;
// }

// /* 로그아웃 */
// export const logoutActionHandler = (accessToken:string, refreshToken:string) => {
//     const URL = '/auth/logout';
//     const logOutObject = {accessToken, refreshToken};
//     const response = POST(URL, logOutObject, createTokenHeader(accessToken, refreshToken));
    
//     response.then(() => {
//         console.log('[로그아웃 성공]');
//         removeCookie('accessToken');
//         removeCookie('refreshToken');
//         removeCookie('expirationTime');
//     });
// }

// /* 사용자 정보 확인 */
// export const getUserActionHandler = (accessToken:string, refreshToken:string) => {
//     const URL = '/member/me';
//     let response = GET(URL, createTokenHeader(accessToken, refreshToken));
//     return response;
// }

// /* 닉네임 변경 */
// export const changeNicknameActionHandler = (nickname: string, accessToken:string, refreshToken:string) => {
//     const URL = '/member/nickname';
//     const changeNicknameObj = {nickname};
//     const response = POST(URL, changeNicknameObj, createTokenHeader(accessToken, refreshToken));

//     return response;
// }

// /* 패스워드 변경 */
// export const changePasswordActionHandler = (
//     exPassword: string, 
//     newPassword: string,
//     accessToken:string,
//     refreshToken:string
// ) => {
//     const URL = '/member/password';
//     const changePasswordObj = {exPassword, newPassword};
//     const response = POST(URL, changePasswordObj, createTokenHeader(accessToken, refreshToken));

//     return response;
// }

