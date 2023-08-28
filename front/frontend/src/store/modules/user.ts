import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: User = {
    email: "",
    password: "",
    nickname: ""
}

export interface User {
    email: string,
    password: string,
    nickname: string;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
})

// 회원가입
export const addUserAsync = createAsyncThunk("ADD_USER", async (user:User) => {
    console.log('[회원가입 시작] : ',user);
    const URL = "/auth/signup";
    const response = await axios.post(URL, user);
    console.log('[회원가입 결과] response: ',response);
    
    return response.data;
});

//로그인
export const loginAsync = createAsyncThunk("LOGIN_USER", async (user:User) => {
    console.log('[로그인 시작] : ',user);
    const URL = "/auth/login";
    const response = await axios.post(URL, user);

    console.log('[로그인 결과] response: ',response);

    return response.data;
})

export default userSlice.reducer;