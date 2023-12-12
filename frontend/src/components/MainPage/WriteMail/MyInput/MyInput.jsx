import React from 'react';

import './MyInput.scss'

const MyInput = ({setState, placeholder, name}) => {

    const title = (event) => {
        setState(event.target.value)
    }

    return (
            <input
                className={'input ' + name}
                type={"text"}
                onChange={title}
                placeholder={placeholder}
            />
    );
};

export default MyInput;