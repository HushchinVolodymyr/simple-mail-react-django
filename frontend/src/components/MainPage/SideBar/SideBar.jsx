import React, { useState } from 'react';
import './SideBar.scss';
import { Link, NavLink } from 'react-router-dom';

const SideBar = ({ option }) => {
    const [selectedOption, setSelectedOption] = useState(1);

    const box = () => {
        option(1);
        setSelectedOption(1);
    };

    const write = () => {
        option(2);
        setSelectedOption(2);
    };

    const send = () => {
        option(3);
        setSelectedOption(3);
    };

    const receive = () => {
        option(4);
        setSelectedOption(4);
    };

    return (
        <div className='sidebar-container'>
            <h1 className={`link ${selectedOption === 1 ? 'selected' : ''}`} onClick={box}>
                Mail box
            </h1>
            <h1 className={`link ${selectedOption === 2 ? 'selected' : ''}`} onClick={write}>
                Write mail
            </h1>
            <h1 className={`link ${selectedOption === 3 ? 'selected' : ''}`} onClick={send}>
                Sended mail
            </h1>
            <h1 className={`link ${selectedOption === 4 ? 'selected' : ''}`} onClick={receive}>
                Received mail
            </h1>
        </div>
    );
};

export default SideBar;
