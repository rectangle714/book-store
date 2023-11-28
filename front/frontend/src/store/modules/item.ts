import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createTokenHeader, validToken, reissue } from "./auth"
import axios from 'axios';

const initialState = {
    title: '',
    contents: ''
}

export interface Item {
    title: string,
    contents: string
}

const itemSlice = createSlice({
    name: 'itemReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    },

})

/* 상품 등록 */
export const registerItem = createAsyncThunk('REGISTER_ITEM', async(item:any) => { 
    try {
        console.log('[상품 등록 시작]');
        const URL = '/api/v1/item/save';
        const validResult = validToken();
        const response = await axios.post(
            URL,
            item,
            { 
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : 'Bearer ' + validResult.accessToken,
                'RefreshToken' : 'Bearer ' + validResult.refreshToken
                } 
            }
        );
        return response.status;
    } catch(error) {
        alert('상품 입력 에러가 발생했습니다.');
        console.error('에러발생 :'+ error);
    }
});

/* 전체 상품 조회 */
export const allItemInfo = createAsyncThunk('ALL_ITEM_INFO', async() => {
    try {
        console.log('[전체 상품 조회 시작]')
        const URL = '/api/v1/item/findAll';

        const response = await axios.get(URL);
        if(response.status == 200) {
            reissue(response);
            console.log('전체 상품 response = ',response);
         }
         return response.data;
    } catch(error) {
        alert('상품 조회 에러가 발생했습니다.');
        console.log('에러발생 : ' + error);
    }
});


/* 상품 상세 조회 */
export const itemDetailInfo = createAsyncThunk('ITEM_DETAIL_INFO', async(itemId:any) => {
    try {
        console.log('[상품 조회 시작]')
        const URL = '/api/v1/item/detail?itemId='+itemId;

        const response = await axios.get(URL);
        if(response.status == 200) {
            reissue(response);
            console.log('상품 response = ',response);
         }
         return response.data;
    } catch(error) {
        alert('상품 조회 에러가 발생했습니다.');
        console.log('에러발생 : ' + error);
    }
});

/* 상품 삭제 */
export const deleteItem = createAsyncThunk('DELETE_ITEM', async(param:any) => {
    console.log('[상품 삭제 시작]');
    const URL = '/api/v1/item/delete';
    const validResult = validToken();

    const response = await axios.post(URL, param,
        { 
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization' : 'Bearer ' + validResult.accessToken,
            'RefreshToken' : 'Bearer ' + validResult.refreshToken
            } 
        });
    if(response.status == 200) {
        reissue(response);
    }
    return response.status;
})


export default itemSlice.reducer;