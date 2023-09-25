import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

const initialState = {
    title: '',
    contents: '',
    imageName: ''
}

export interface Item {
    title: string,
    contents: string,
    imageName: string
}

const itemSlice = createSlice({
    name: 'itemReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    },

})

/* 상품 등록 */
export const registerItem = async (item:Item) => {
    try {
        console.log('[상품 등록 시작]');
        const URL = "/item/save";
        const response = await axios.post(URL, item);

        return response.status;
    } catch(error) {
        console.error('에러발생 :'+ error);
    }
}

export default itemSlice.reducer;