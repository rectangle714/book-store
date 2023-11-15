import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../../store/configureStore";
import { naverLogin } from "../../store/modules/user";
import { logout } from "../../store/modules/user";
import axios from 'axios';

let logoutTimer:NodeJS.Timeout;

const AuthLogin = (props:any) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const OAuth2 = async() => {
      

      // 네이버 oauth2 요청
      if(props.oauthType == 'NAVER') {
        const searchParams = new URLSearchParams(location.hash);
        const token = searchParams.get('#access_token'); // code 취득
        if(token != undefined && token != '') {
            const result = await dispatch(naverLogin(token));
            if(result.payload != undefined) {
              const expirationTime:number = result.payload.refreshTokenExpiresIn;
              const currentTime = new Date().getTime();
              const adjExpirationTime = new Date(expirationTime).getTime();
              const remainingDuration = adjExpirationTime - currentTime;
              logoutTimer = setTimeout(() =>{
                  dispatch(logout());
                  navigate('/');
              }, remainingDuration);
  
              navigate('/', {replace:true, state:logoutTimer});
          } else {
              alert('에러가 발생했습니다.');
              navigate('/');
          }
        }
      };

      if(props.oauthType == 'KAKAO') {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
        let redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
        console.log('ddd ',process.env.REACT_APP_KAKAO_REDIRECT_URI);
        
        const URL = 'https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id='+clientId+'&redirect_uri='+redirectUri+'&code='+code;
        console.log('URL ',URL);
        const response = await axios.post(URL);
        if(response.status == 200) {
          console.log('response ',response);
        }
      }
    }

    useEffect(() => {
      OAuth2();
    }, [])

  return (
    <>
        <div>

        </div>
    </>
  )
}

export default AuthLogin;