import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
    email: string,
    password: string,
    nickname: string;
}

const initialState: User = {
    email: "",
    password: "",
    nickname: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
})

// 회원가입
export const addUserAsync = createAsyncThunk("ADD_USER", async (user: User) => {
    const URL = "/auth/signup";
    const response = await axios.post(URL, user);
    
    return response.data;
})

export default userSlice.reducer;