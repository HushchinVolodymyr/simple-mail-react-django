import React, {Component, useEffect, useState} from 'react';
import './Header.css'
import {Link, NavLink} from "react-router-dom";
import axios from "axios";


const Header = ({token, auth, setAuth, setToken}) => {
    const [data, setData] = useState([]);
    const [ username, setUsername ] = useState('');

    const [ menu, setMenu] = useState(false)

    const mouseHandlerEnter = () => {
        setMenu(true);
        console.log("Mouse in!")
    }

    const mouseHandlerLeave = () => {
        setTimeout(() => {
            setMenu(false);
        }, 1000)

        console.log('Mouse out!')
    }

    const signOut = () => {
        setAuth(false);
        const signOutPost = async () =>{
            try{
                const response = await axios.post('http://127.0.0.1:8000/signout/',
                    {token})
                setToken(null);
            } catch (error) {
                console.log("Error: ", error)
            }
        }

        signOutPost();
    }



    useEffect(() => {
        const fetchHeader = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/header/',
                    {token})
                setData(response.data)
                console.log('Response: ', response.data.name)
                setUsername(response.data.name);
            } catch (error) {
                console.error('Header error: ', error);
            }
        }
        fetchHeader();

        console.log('Username: ',username)
    }, [token]);

    return (
        <header className="header">
            <div className="header-container">
                <h1 className="logo">Simple Mail</h1>
                { auth ? (
                    <NavLink
                        to='/login'
                        className='sign-in'
                        onMouseEnter={mouseHandlerEnter}
                        onMouseLeave={mouseHandlerLeave}
                    >
                        {username}
                        { menu && (
                            <div className={'drop-down'}>
                                <Link
                                    className={'link'}
                                    to={'/login'}
                                    onClick={signOut}
                                >
                                    log Out
                                </Link>
                            </div>
                        )}
                    </NavLink>
                ) : (
                    <NavLink
                        to='/login'
                        className='sign-in'
                    >
                        Sign in
                    </NavLink>
                )}
            </div>
        </header>
    );
}

export default Header;