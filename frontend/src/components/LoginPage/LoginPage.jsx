import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

import './LoginPage.scss';

import { Input } from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import PasswordInput from '../UI/PasswordInput/PasswordInput';
import Header from "../Header/Header";

const LoginPage = ({ token, setAuth, auth, setToken }) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [ error, setError ] = useState(null);


    const callbackHandlerLogin = (dataFromChild) => {
        setLogin(dataFromChild);
    };

    const callbackHanlderPassword = (dataFromChild) => {
        setPassword(dataFromChild);
    };

    const submitPost = async () => {


        try {
            const createToken = Math.floor(Math.random() * 10000000000);
            const formattedToken = String(createToken).padStart(10, '0');

            setToken(formattedToken);
            localStorage.setItem('token', formattedToken);

            const token_log = formattedToken

            const response = await axios.post('http://127.0.0.1:8000/login/', {
                login,
                token_log,
                password,
            });

            if (response.status === 200) {
                navigate('/box');
                setAuth(true);

            } else {
                const errorMessage = response.data.message;
                setError(errorMessage);
            }

            console.log('Answer:', response.data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
        <Header
            setToken={setToken}
            token={token}
            auth={auth}
            setAuth={setAuth}/>
        <div className="login-page-container">
            <div className='error'>
                {error}
            </div>
            <div className="log-in-container">
                <h1 className="log-in-text">Login in</h1>
            </div>
            <div className="form-container">
                <div className="input-container">
                    <Input
                        placeholder="Login"
                        callbackFromParent={callbackHandlerLogin}
                    />
                    <PasswordInput
                        placeholder="Password"
                        callbackFromParent={callbackHanlderPassword}
                    />
                    <NavLink to="/" className="reg-link">
                        Register
                    </NavLink>
                </div>

                <div className="submit-container">
                    <Button
                        text="Submit"
                        className="submit-button"
                        submitPost={submitPost} />
                </div>
            </div>
        </div>
        </>
    );
};

export default LoginPage;
