import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../cookie';
import axios from 'axios';

const initialState = {
    email: '',
    password: '',
    nickname: '',
    loading: '',
    isLogin: false
};

export interface User {
    email: string,
    password: string,
    nickname: string,
    loading: string,
    isLogin: boolean,
}

export interface Token {
    grantType: string,
    accessToken: string,
    refreshToken: string,
    accessTokenExpiresIn: number,
    refreshTokenExpiresIn: number
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLogin = true;
            state.loading = 'clear';
            return state;
        });
      },
})



/* 회원가입 */
export const signup = createAsyncThunk('SIGNUP', async (user:User) => {
    try{
        console.log('[회원가입 시작] : ',user);
        const URL = "/auth/signup";
        const response = await axios.post(URL, user);
        console.log('[회원가입 결과] response: ',response);
        
        return response.status;
    } catch(error) {
        console.log('에러발생 : ' + error);
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
            console.log('[Token]', token);
            loginTokenHandler(token.accessToken, token.refreshToken, token.refreshTokenExpiresIn);
        }
    
        return response.data;
    } catch(error) {
        console.log('에러발생 : '+ error);
        return undefined;
    }
});

export const userInfo = createAsyncThunk('USER_INFO', async (token:Token) => {
    try {
        console.log('[사용자 정보 조회 시작]')
        const URL = '/member/me';

        const response = await axios.get(URL, createTokenHeader(token.accessToken, token.refreshToken));
        if(response.status == 200) {
            console.log('사용자 정보 : ', response.data);
        }
        return response.data;
    } catch(error) {
        console.log('에러발생 : '+ error);
        return undefined;
    }
});

/* 토큰 만료시간 계산 */
const calculateRemainingTime = (expirationTime:number) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
}

/* 토큰값, 만료시간을 저장 */
const loginTokenHandler = (accessToken:string, refreshtoken:string, expirationTime:number) => {
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshtoken);
    setCookie('expirationTime', String(expirationTime));
    const remainingTime = calculateRemainingTime(expirationTime);
    return remainingTime;
}

/* 토큰 생성 */
const createTokenHeader = (accessToken:string, refreshToken:string) => {
    return {
        headers: {
            'Authorization' : 'Bearer ' + accessToken,
            'RefreshToken' : 'Bearer ' + refreshToken
        }
    }
}

export default userSlice.reducer;