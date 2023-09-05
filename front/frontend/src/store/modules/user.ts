import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../cookie';
import axios from 'axios';

const initialState: User = {
    email: "",
    password: "",
    nickname: "",
    isLogin: false
}

export interface User {
    email: string,
    password: string,
    nickname: string,
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
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            // state = ;
            return state;
        },
        signup(state, action) {
            state = action.payload;
        }
    },
    extraReducers: (builder) => {}
})



/* 회원가입 */
export const signup = createAsyncThunk("ADD_USER", async (user:User) => {
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
export const login = createAsyncThunk("LOGIN_USER", async (user:User) => {
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

export default userSlice.reducer;