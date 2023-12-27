import axios from 'axios';
import { useState } from 'react';
import { getCookie } from './cookie';
import LoadingBar from 'components/common/LoadingBar';
import { reissue } from 'store/modules/auth';

const TokenValidation = () => {

  const [isLoading, setIsLoading] = useState(false);
  axios.interceptors.request.use(
    function (request) {
      setIsLoading(true);
      const accessToken = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');
      if( undefined != accessToken && undefined != refreshToken ) {
        if(request.url == '/api/v1/item/delete' || request.url == '/api/v1/item/save') {
          request.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8";
        } else {
          request.headers['Content-Type'] = "application/json";
        }
        request.headers.Authorization = 'Bearer ' + accessToken; 
        request.headers.RefreshToken = 'Bearer ' + refreshToken;
        request.withCredentials = true;
      }
      return request;
    },
    async function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      if(response.status == 200) {
        reissue(response);
      }
      setIsLoading(false);
      return response;
    },
    async function (error) {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );
  return (<><LoadingBar isOpen = { isLoading }/></>);
};

export default TokenValidation;
