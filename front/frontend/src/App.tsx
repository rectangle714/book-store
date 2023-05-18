import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import CreateAccountForm from './components/auth/CreateAccountForm';
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Login/>
    </div>
  );
}

export default App;
