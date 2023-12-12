import React, {useEffect, useState} from 'react';
import SideBar from "./SideBar/SideBar";
import './MainPage.scss'
import Box from "./Box/Box";
import WriteMail from "./WriteMail/WriteMail";
import Header from "../Header/Header";
import SendedMail from "./SendedMail/SendedMail";
import RecivedMail from "./ReciviedMail/ReciviedMail";

const MainPage = ({token, auth, setAuth, setToken}) => {
    const [ option, setOption] = useState(1)
    const checked = {
        background: '#8a8a8a',
        color: '#232323'
    }

    return (
        <>
            <Header
                setToken={setToken}
                token={token}
                auth={auth}
                setAuth={setAuth}/>
        <div className='main-page-container'>
            <SideBar option={setOption}/>
            {option === 1 ? (
                <Box
                    style={checked}
                    token={token}/>
            ) : option === 2 ? (
                <WriteMail
                    token={token}
                    setOption={setOption}/>
            ) : option === 3 ?(
                <SendedMail
                    token={token}/>
            ) : option === 4  ?(
                <RecivedMail
                    token={token}/>
            ) : (
                <div>No such option</div>
                    )}
        </div>
        </>
    );
};

export default MainPage;