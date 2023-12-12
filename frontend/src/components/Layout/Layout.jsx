import React, {useEffect, useState} from 'react';
import { Link, Outlet } from 'react-router-dom'
import Header from "../Header/Header";
import './Layout.css'

const Layout = () => {

    return (
        <div className='page'>

            <div className='page-container'>
                <Outlet />
            </div>

            <footer></footer>
        </div>
    );
};

export {Layout};