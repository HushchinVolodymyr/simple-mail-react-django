import './App.css';
import React, {useEffect, useState} from "react";
import { Layout } from './components/Layout/Layout'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
    const [ token, setToken ] = useState(localStorage.getItem('token') || '')
    const [ auth, setAuth ] = useState(false)


  return (
    <>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<RegisterPage
                    setToken={setToken}
                    token={token}
                    setAuth={setAuth}
                    auth={auth}/>}/>
                <Route path='/login' element={<LoginPage
                    setToken={setToken}
                    token={token}
                    setAuth={setAuth}
                    auth={auth}/>}/>
                <Route path="/box" element={<MainPage
                    setToken={setToken}
                    token={token}
                    setAuth={setAuth}
                    auth={auth}/>}/>
            </Route>
        </Routes>
    </>
  );
}

export default App;
