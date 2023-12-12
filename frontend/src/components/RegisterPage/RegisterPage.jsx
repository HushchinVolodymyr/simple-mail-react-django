import React, {useEffect, useState} from 'react';
import {Input} from "../UI/Input/Input";
import PasswordInput from "../UI/PasswordInput/PasswordInput";
import {NavLink, useNavigate} from "react-router-dom";
import Button from "../UI/Button/Button";
import axios from "axios";
import './RegisterPage.scss'
import Header from "../Header/Header";

const RegisterPage = ({token, setAuth, auth, setToken}) => {
    const navigate = useNavigate();
    const [ login, setLogin ] = useState(null);
    const [ password, setPassword] = useState(null);
    const [ confirm_password, setConfirmPassword] = useState(null);
    const [ error, setError ] = useState(null);


    const submitPost = async () => {
        const createToken = Math.floor(Math.random() * 10000000000);
        const formattedToken = String(createToken).padStart(10, '0');

        setToken(formattedToken);
        localStorage.setItem('token', formattedToken);

        const token_reg = formattedToken
        try {
            const response = await axios.post('http://127.0.0.1:8000/register/', {
                login,
                token_reg,
                password,
                confirm_password,
            });

            if (response.status === 200) {
                navigate('/box')
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

    const callbackHandlerLogin = (dataFromChild) => {
        setLogin(dataFromChild);
    }

    const callbackHanlderPassword = (dataFromChild) => {
        setPassword(dataFromChild);
    }

    const callbackHanlderConfirmPassword = (dataFromChild) => {
        if (dataFromChild != password) {
            setError("Password and Confirm passowrd not matched")
        } else {
            setError('')
        }

        setConfirmPassword(dataFromChild);
    }


    return (
        <>
            <Header
                setToken={setToken}
                token={token}
                auth={auth}
                setAuth={setAuth}/>
        <div className="register-page-container">
            <div className='error'>
                {error}
            </div>
            <div className='register-container'>
                <h1 className='register-text'>Registration</h1>
            </div>
            <div className='register-form-container'>
                <div className='register-input-container'>
                    <Input
                        placeholder = "Login"
                        callbackFromParent={callbackHandlerLogin}
                    />

                    <PasswordInput
                        placeholder = "Password"
                        callbackFromParent={callbackHanlderPassword}
                    />

                    <PasswordInput
                        placeholder = "Confirm password"
                        callbackFromParent={callbackHanlderConfirmPassword}
                    />

                    <NavLink
                        to='/login'
                        className='reg-link'
                    >
                        Log in
                    </NavLink>
                </div>

                <div className='submit-container'>
                    <Button
                        text="Submit"
                        className='submit-button'
                        submitPost={submitPost}
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default RegisterPage;