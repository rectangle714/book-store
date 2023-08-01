import { GET, POST } from "./fetch-auth-action";

/* 토큰 생성 */
const createTokenHeader = (token:string) => {
    return {
        headers: {
            'Authorization' : 'Bearer ' + token 
        }
    }
}

/* 토큰 만료시간 계산 */
const calculateRemainingTime = (expirationTime:number) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
}

/* 토큰값, 만료시간을 저장 */
export const loginTokenHandler = (token:string, expirationTime:number) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('expirationTime', String(expirationTime));
    const remainingTime = calculateRemainingTime(expirationTime);
    return remainingTime;
}

/* 토큰 만료시간 확인 */
export const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('accessToken');
    const storedExpirationDate = localStorage.getItem('expirationTime') || '0';
    const remaingTime = calculateRemainingTime(+ storedExpirationDate);

    return {
        token : storedToken,
        duration : remaingTime
    }
}

/* 회원가입 */
export const signupActionHandler = (email: string, password: string, nickname: string) => {
    const URL = '/auth/signup';
    const signupObject = {email, password, nickname};

    const response = POST(URL, signupObject, {});
    return response;
}

/* 로그인 */
export const loginActionHandler = (email: string, password: string) => {
    const URL = '/auth/login';
    const loginObject = {email, password};
    const response = POST(URL, loginObject, {});

    return response;
}

/* 로그아웃 */
export const logoutActionHandler = (token:string) => {
    const URL = '/auth/logout';
    const response = POST(URL, {}, createTokenHeader(token));

    response.then((result) => {
        console.log('result:',result);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expirationTime');
    });

}

/* 사용자 정보 확인 */
export const getUserActionHandler = (token: string) => {
    const URL = '/member/me';
    const response = GET(URL, createTokenHeader(token));
    return response;
}

/* 닉네임 변경 */
export const changeNicknameActionHandler = (nickname: string, token: string) => {
    const URL = '/member/nickname';
    const changeNicknameObj = {nickname};
    const response = POST(URL, changeNicknameObj, createTokenHeader(token));

    return response;
}

/* 패스워드 변경 */
export const changePasswordActionHandler = (
    exPassword: string, 
    newPassword: string,
    token: string
) => {
    const URL = '/member/password';
    const changePasswordObj = {exPassword, newPassword};
    const response = POST(URL, changePasswordObj, createTokenHeader(token));

    return response;
}

