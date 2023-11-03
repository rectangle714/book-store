import MainPage from "../layout/MainPage";
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from "../../store/configureStore";
import { naverLogin } from "../../store/modules/user";

const AuthLogin = () => {
    
    const dispatch = useAppDispatch();

    const location = useLocation();  
    const searchParams = new URLSearchParams(location.hash);
  
    // 쿼리 취득
    const token = searchParams.get('#access_token'); // code 취득
    const state = searchParams.get('state'); // code 취득
    console.log('token: ', token); // id: 10

    if(token != undefined && token != '') {
        const result = dispatch(naverLogin(token));
    }
  return (
    <>
        <div>

        </div>
    </>
  )
}

export default AuthLogin;