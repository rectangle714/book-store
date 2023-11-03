import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useAppSelect } from "./store/configureStore";
import HomePage from "./pages/HomePage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import FindIdPage from "./pages/FindIdPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import AuthLogin from "./components/auth/AuthLogin";


function App() {

  const isLogin = useAppSelect((state) => state.userReducer.isLogin);
  const role = useAppSelect((state) => state.userReducer.role);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={isLogin ? <Navigate to='/' /> : <CreateAccountPage />}></Route>
        <Route path="/login/*" element={isLogin ? <Navigate to='/' /> : <LoginPage/>}></Route>
        <Route path="/admin/*" element={(isLogin && role != 'ROLE_ADMIN') ? <Navigate to='/' /> : <AdminPage/>}></Route>
        <Route path="/profile/*" element={<ProfilePage/>}></Route>
        <Route path="/findPassword/*" element={<FindPasswordPage/>}></Route>
        <Route path="/findId/*" element={<FindIdPage/>}></Route>
        <Route path="/auth/naver-login" element={<AuthLogin/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
