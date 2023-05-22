import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import CreateAccountForm from "./components/auth/CreateAccountForm";
import AuthContext from "./store/auth-context";
import HomePage from "./pages/HomePage";
import CreateAccountPage from "./pages/CreateAccountPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateAccountPage />}></Route>
        <Route path="/login/*" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <AuthPage/>}>
        <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage />}></Route>
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
