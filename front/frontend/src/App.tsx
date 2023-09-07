import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/configureStore";
import Layout from "./components/layout/Layout";
import AuthContext from "./store/auth-context";
import HomePage from "./pages/HomePage";
import CreateAccountPage from "./pages/CreateAccountPage";
import AuthPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateAccountPage />}></Route>
        <Route path="/login/*" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <AuthPage/>}></Route>
        <Route path="/admin/*" element={(authCtx.isLoggedIn && authCtx.userObj.authority != 'ROLE_ADMIN') ? <Navigate to='/' /> : <AdminPage/>}></Route>
        <Route path="/profile/*" element={<ProfilePage/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
