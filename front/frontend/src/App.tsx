import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "components/layout/Layout";
import { useAppSelect } from "store/configureStore";
import HomePage from "pages/HomePage";
import CreateAccountPage from "pages/CreateAccountPage";

import {LoginPage, ProfilePage, AdminPage, FindEmailPage, FindPasswordPage} from "./pages";
import OAuthLogin from "components/auth/OAuthLogin";
import NotFound from "components/common/NotFound";
import UpdatePassword from "components/member/user/UpdatePassword";
import CartPage from "pages/CartPage";


function App() {

  const isLogin = useAppSelect((state) => state.userReducer.isLogin);
  const role = useAppSelect((state) => state.userReducer.role);

  if(!isLogin) {
    
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={isLogin ? <Navigate to='/' /> : <CreateAccountPage />}></Route>
        <Route path="/login/*" element={isLogin ? <Navigate to='/' /> :  <LoginPage/>}></Route>
        <Route path="/admin/*" element={(!isLogin) || (isLogin && role != 'ADMIN') ? <Navigate to='/' /> : <AdminPage/>}></Route>
        <Route path="/profile/*" element={isLogin ? <ProfilePage/> : <Navigate to='/' />}></Route>
        <Route path="/findPassword/*" element={<FindPasswordPage/>}></Route>
        <Route path="/updatePassword/*" element={<UpdatePassword/>}></Route>
        <Route path="/findEmail/*" element={<FindEmailPage/>}></Route>
        <Route path="/cart/*" element={!isLogin ? <Navigate to='/' /> : <CartPage/>}></Route>
        <Route path="/auth/naver-login" element={<OAuthLogin oauthType='NAVER'/>}></Route>
        <Route path="/auth/kakao-login" element={<OAuthLogin oauthType='KAKAO'/>}></Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
