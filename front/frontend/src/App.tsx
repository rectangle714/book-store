import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useAppSelect } from "./store/configureStore";
import HomePage from "./pages/HomePage";
import CreateAccountPage from "./pages/CreateAccountPage";
import AuthPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";


function App() {

  const isLogin = useAppSelect((state) => state.userReducer.isLogin);
  const role = useAppSelect((state) => state.userReducer.role);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={isLogin ? <Navigate to='/' /> : <CreateAccountPage />}></Route>
        <Route path="/login/*" element={isLogin ? <Navigate to='/' /> : <AuthPage/>}></Route>
        <Route path="/admin/*" element={(isLogin && role != 'ROLE_ADMIN') ? <Navigate to='/' /> : <AdminPage/>}></Route>
        <Route path="/profile/*" element={<ProfilePage/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
