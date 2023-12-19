import axios from 'axios';
import { useEffect } from 'react';
import { getCookie } from './cookie';

const TokenValidation = () => {
    axios.interceptors.request.use(
      function (request) {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        if( undefined != accessToken && undefined != refreshToken ) {
          request.headers.Authorization = 'Bearer ' + accessToken; 
          request.headers.RefreshToken = 'Bearer ' + refreshToken;
          request.withCredentials = true;
        }
        return request;
      },
      async function (error) {
        console.log('요청 실패');
        return Promise.reject(error);
      }
    );
  return (<></>);
};

export default TokenValidation;