import React, { Component } from 'react';
import { GrFormViewHide } from "react-icons/gr";
import { BiShow } from "react-icons/bi";

import './PasswordInput.scss'


class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPasswordVisible: false,
            password: '',
        };
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            isPasswordVisible: !prevState.isPasswordVisible,
        }));
    };

    updatePassword = (event) => {
        const newPassword = event.target.value
        this.setState({ password: newPassword })

        this.props.callbackFromParent(newPassword)
    }

    render() {
        const { isPasswordVisible } = this.state;
        const { placeholder } = this.props;

        return (
            <div className='ui-pass-input-container'>
                <input
                    className='ui-pass-input'
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder={placeholder}
                    onChange={this.updatePassword}
                />
                <button
                    className='ui-sh-button'
                    type="button"
                    onClick={this.togglePasswordVisibility}
                >
                    {isPasswordVisible
                        ? <BiShow
                            className='icon'
                        />
                        : <GrFormViewHide
                            className='icon'
                        />}
                </button>
            </div>
        );
    }
}

export default PasswordInput;
