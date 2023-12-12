import React from 'react';
import './MyText.scss'

const MyText = ({setState, placeholder, name}) => {

    return (
        <textarea
            className={'my-text ' + name}
            placeholder={placeholder}
            onChange={setState}
            cols="30"
            rows="20"
        ></textarea>
    );
};

export default MyText;
