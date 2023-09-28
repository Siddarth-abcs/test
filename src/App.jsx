import React, { useState } from 'react';  
import './App.css';
import { useEffect } from 'react';


import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login, Register, DashboardPage, Homepage } from './pages/Homepage';
import { useDispatch } from 'react-redux';
import { checkIsLoggedIn } from './redux/actionCreators/authActionCreator';

function App() {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  },[]);

  return (
<Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard/*" element={<DashboardPage />} />
</Routes>

  )
}

export default App;
