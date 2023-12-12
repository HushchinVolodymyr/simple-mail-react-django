import React from 'react';

import './ListItem.scss'

const ListItem = ({theme, body, sendData}) => {
    return (
        <div className='mail-item'>
            <h1>{theme}</h1>
            <h2>{sendData}</h2>
        </div>
    );
};

export default ListItem;