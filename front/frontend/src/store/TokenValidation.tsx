import axios from 'axios';
import { useEffect } from 'react';
import { getCookie } from './cookie';

const TokenValidation = () => {
  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    
    const interceptor = axios.interceptors.request.use(
      function (request) {
        if( undefined != accessToken && undefined != refreshToken ) {
          request.headers.Authorization = 'Bearer ' + accessToken;
          request.headers.RefreshToken = 'Bearer ' + refreshToken;
          console.log('request ',request);
          console.log('요청 성공');
        }
        return request;
      },
      async function (error) {

        console.log('요청 실패');
        return Promise.reject(error);
      }
    );
  }, []);
  return (<></>);
};

export default TokenValidation;