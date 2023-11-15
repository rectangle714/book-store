import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeCookie, getCookie } from '../cookie';
import { createTokenHeader, LoginTokenHandler, reissue  } from './auth'
import axios from 'axios';

export let logoutTimer:NodeJS.Timeout;

const initialState = {
    email: '',
    password: '',
    nickname: '',
    loading: '',
    isLogin: false,
    role: ''
};

export interface User {
    email: string,
    password: string,
    nickname: string,
    loading: string,
    isLogin: boolean,
    role: string
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
        /** 로그인 **/
        builder.addCase(login.fulfilled, (state, action) => {
            if(action.payload != undefined) {
                state.email = action.meta.arg.email;
                state.nickname = '';
                state.isLogin = true;
                state.loading = 'success'; 
            }
            return state;
        });

        /** 로그아웃 **/
        builder.addCase(logout.fulfilled, (state) => {
            console.log('성공');
            state.isLogin = false;
            return state;
        });

        /** 사용자 조회 **/
        builder.addCase(userInfo.fulfilled, (state, action) => {
            state.nickname = action.payload?.data.nickname;
            state.role = action.payload?.data.role;
            return state;
        });
        builder.addCase(userInfo.rejected, (state) => {
            console.log('실패');
            state.isLogin = false;
            return state;
        });
        
        /** 네이버로그인 **/
        builder.addCase(naverLogin.fulfilled, (state, action) => {
            console.log('네이버 로그인 성공');
            if(action.payload != undefined) {
                state.nickname = '';
                state.isLogin = true;
                state.loading = 'success'; 
            }
            return state;
        })
    },
})

/* 회원가입 */
export const signup = createAsyncThunk('SIGNUP', async (user:User) => {
    try{
        const URL = "/api/v1/auth/signup";
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
        const URL = "/api/v1/auth/login";
    
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
        const URL = '/api/v1/auth/logout';
        let accessToken = '';
        let refreshToken = '';

        if(getCookie('accessToken') != undefined) { accessToken = getCookie('accessToken') } else { throw new Error('accessToken이 존재하지 않습니다.') };
        if(getCookie('refreshToken') != undefined) { refreshToken = getCookie('refreshToken') } else { throw new Error('refreshToken이 존재하지 않습니다.') };

        if(getCookie('accessToken') != undefined || getCookie('refreshToken') != undefined) {
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
            throw new Error('로그아웃 에러 발생');
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
    console.log('[사용자 조회]');
    const URL = '/api/v1/member/me';
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

});

/* 사용자 전체 정보 조회 */
export const allUserInfo = createAsyncThunk('ALL_USER_INFO', async () => {
    try {
         console.log('[전체 사용자 조회]');
         const URL = '/api/v1/member/findAll';
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

/* 네이버 로그인 */
export const naverLogin = createAsyncThunk('NAVER_LOGIN', async (token:string) => {
    const URL = '/api/v1/auth/naverLoginToken?token='+token;

    const response = await axios.get(URL);
    if(response.status == 200) {
        const token:Token = response.data;
        LoginTokenHandler(token.accessToken, token.refreshToken, token.refreshTokenExpiresIn);
    }
    return response.data;

});

/* 카카오 로그인 */
export const kakaoLoginGetToken = createAsyncThunk('KAKAO_LOGIN_GET_TOKEN', async (code:string) => {
    const URL = 'https://kauth.kakao.com/oauth/token?client_id='+code+'&';

});

export default userSlice.reducer;