import React, {Component} from 'react';
import axios from "axios";

import './LoginPage.scss'

import { Input } from '../UI/Input/Input'
import Button from "../UI/Button/Button";
import PasswordInput from "../UI/PasswordInput/PasswordInput";
import {NavLink, redirect, useNavigate} from "react-router-dom";



class LoginPageClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            password: null,
        }
    }

    Redirect = () => {
        console.log("To box");
        this.props.navigation('/box');
    }

    SubmitPost = async () => {
        const { login, password } = this.state;

        this.setState({login, password}, () => {
            this.callbackHandlerLogin(this.state.login)
            this.callbackHanlderPassword(this.state.password)
        })

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                login,
                password,
            });


            if (response.status === 200) {

                console.log('hui te no net')
            } else {
                console.log('hui te')
            }


            console.log('Answer:', response.data);
        } catch (error) {
            console.log('Error:', error);
        }
    }


    callbackHandlerLogin = (dataFromChild) => {
        this.setState({login: dataFromChild});

        console.log("Login Parent: ", this.state.login)
    }

    callbackHanlderPassword = (dataFromChild) => {
        this.setState({password: dataFromChild});

        console.log("Password Parent: ", this.state.password)
    }

    render() {
        return (
            <div className="login-page-container">
                <div className='log-in-container'>
                    <h1 className='log-in-text'>Login in</h1>
                </div>
                <div className='form-container'>
                    <div className='input-container'>
                        <Input
                            placeholder = "Login"
                            callbackFromParent={this.callbackHandlerLogin}
                        />

                        <PasswordInput
                            placeholder = "Password"
                            callbackFromParent={this.callbackHanlderPassword}
                        />
                        <NavLink
                            to='/register'
                            className='reg-link'
                        >
                            Register
                        </NavLink>
                    </div>

                    <div className='submit-container'>
                        <Button
                            text="Submit"
                            className='submit-button'
                            submitPost={this.SubmitPost}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPageClass;