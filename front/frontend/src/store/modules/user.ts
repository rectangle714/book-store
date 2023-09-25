import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie, removeCookie, getCookie } from '../cookie';
import axios from 'axios';

export let logoutTimer:NodeJS.Timeout;

const initialState = {
    email: '',
    password: '',
    nickname: '',
    loading: '',
    isLogin: false,
    authority: ''
};

export interface User {
    email: string,
    password: string,
    nickname: string,
    loading: string,
    isLogin: boolean,
    authority: string
}

interface Token {
    grantType: string,
    accessToken: string,
    refreshToken: string,
    accessTokenExpiresIn: number,
    refreshTokenExpiresIn: number
}

const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if(action.payload != undefined) {
                state.email = action.meta.arg.email;
                state.nickname = '';
                state.isLogin = true;
                state.loading = 'success'; 
            }
            return state;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLogin = false;
            return state;
        });
        builder.addCase(userInfo.fulfilled, (state, action) => {
            state.nickname = action.payload?.data.nickname;
            state.authority = action.payload?.data.authority;
            return state;
        })
    },
})

/* 회원가입 */
export const signup = createAsyncThunk('SIGNUP', async (user:User) => {
    try{
        const URL = "/auth/signup";
        const response = await axios.post(URL, user);
        
        return response.status;
    } catch(error) {
        console.log('회원가입 에러발생 : ' + error);
        return undefined;
    }
}); 

/* 로그인 */
export const login = createAsyncThunk('LOGIN', async (user:User) => {
    try {
        console.log('[로그인 시작] : ',user);
        const URL = "/auth/login";
    
        const response = await axios.post(URL, user);
        if(response.status == 200) {
            const token:Token = response.data;
            LoginTokenHandler(token.accessToken, token.refreshToken, token.refreshTokenExpiresIn);
        }

        return response.data;
    } catch(error) {
        console.log('로그인 에러발생 : '+ error);
        return undefined;
    }
});

/* 로그아웃 */
export const logout = createAsyncThunk('LOGOUT', async () => {
    try {
        console.log('[로그아웃 시작]');
        const URL = '/auth/logout';
        let accessToken = '';
        let refreshToken = '';

        if(getCookie('accessToken') != undefined) { accessToken = getCookie('accessToken') } else { throw new Error('accessToken이 존재하지 않습니다.') };
        if(getCookie('refreshToken') != undefined) { refreshToken = getCookie('refreshToken') } else { throw new Error('refreshToken이 존재하지 않습니다.') };

        if( getCookie('accessToken') != undefined || getCookie('refreshToken') != undefined ) {
            accessToken = getCookie('accessToken');
            refreshToken = getCookie('refreshToken');
            
            const response = await axios.post(URL, [], createTokenHeader(accessToken, refreshToken));
            if(response.status == 200) {
                console.log('[로그아웃 성공]');
                removeCookie('accessToken');
                removeCookie('refreshToken');
                removeCookie('expirationTime');
            }
        
            return response.data;
        } else {
            throw new Error('');
        }

    } catch(error) {
        console.error('로그아웃 에러발생 : '+error);
        removeCookie('accessToken');
        removeCookie('refreshToken');
        removeCookie('expirationTime');

        if(logoutTimer != null && logoutTimer != undefined){
            clearTimeout(logoutTimer);
            console.log(logoutTimer);
        }

        return undefined;
    }
});

/* 사용자 정보 조회 */
export const userInfo = createAsyncThunk('USER_INFO', async () => {
    try {
         console.log('[사용자 조회]');
         const URL = '/member/me';
         let accessToken = '';
         let refreshToken = '';

         if(getCookie('accessToken') != undefined) { accessToken = getCookie('accessToken') } else { throw new Error('accessToken이 존재하지 않습니다.') };
         if(getCookie('refreshToken') != undefined) { refreshToken = getCookie('refreshToken') } else { throw new Error('refreshToken이 존재하지 않습니다.') };
         const response = await axios.get(URL, createTokenHeader(accessToken, refreshToken));
         if(response.status == 200) {
            reissue(response);
            console.log('[사용자 조회 완료] : ', response);
         }
         return response;

    } catch(error) {
        console.error('에러발생 :'+ error);
    }
});

/* 사용자 전체 정보 조회 */
export const allUserInfo = createAsyncThunk('ALL_USER_INFO', async () => {
    try {
         console.log('[전체 사용자 조회]');
         const URL = '/member/findAll';
         let accessToken = '';
         let refreshToken = '';

         if(getCookie('accessToken') != undefined) { accessToken = getCookie('accessToken') } else { throw new Error('accessToken이 존재하지 않습니다.') };
         if(getCookie('refreshToken') != undefined) { refreshToken = getCookie('refreshToken') } else { throw new Error('refreshToken이 존재하지 않습니다.') };

         const response = await axios.get(URL, createTokenHeader(accessToken, refreshToken));
         if(response.status == 200) {
            reissue(response);
            console.log('전체 response = ',response);
         }
         return response.data;

    } catch(error) {
        console.error('에러발생 :'+ error);

    }
});

/* 토큰 생성 */
const createTokenHeader = (accessToken:string, refreshToken:string) => {
    return {
        headers: {
            'Authorization' : 'Bearer ' + accessToken,
            'RefreshToken' : 'Bearer ' + refreshToken
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
const LoginTokenHandler = (accessToken:string, refreshtoken:string, expirationTime:number) => {
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshtoken);
    setCookie('expirationTime', String(expirationTime));
    const remaingTime = calculateRemainingTime(+ expirationTime);
    return remaingTime;
}

/* 재발급 토큰 설정 */
const reissue = (response:any) => {
    if(response.headers.authorization != null && response.headers.authorization != '') {
        const newToken = response.headers.authorization.substring(7);
        setCookie('accessToken', newToken);
    }
}

export default userSlice.reducer;