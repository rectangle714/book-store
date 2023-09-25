import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
// import AuthContext from "./store/auth-context";
import { useAppSelect } from "./store/configureStore";
import HomePage from "./pages/HomePage";
import CreateAccountPage from "./pages/CreateAccountPage";
import AuthPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";


function App() {

  // const authCtx = useContext(AuthContext);
  const isLogin = useAppSelect((state) => state.userReducer.isLogin);
  const authority = useAppSelect((state) => state.userReducer.authority);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={isLogin ? <Navigate to='/' /> : <CreateAccountPage />}></Route>
        <Route path="/login/*" element={isLogin ? <Navigate to='/' /> : <AuthPage/>}></Route>
        <Route path="/admin/*" element={(isLogin && authority != 'ROLE_ADMIN') ? <Navigate to='/' /> : <AdminPage/>}></Route>
        <Route path="/profile/*" element={<ProfilePage/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
