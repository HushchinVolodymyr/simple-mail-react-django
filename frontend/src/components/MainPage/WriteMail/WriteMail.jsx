import React, {useEffect, useState} from 'react';
import MyInput from "./MyInput/MyInput";

import './WriteMail.scss'
import Button from "../../UI/Button/Button";
import MyText from "./MyText/MyText";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const WriteMail = ({token, setOption}) => {
    const [ recipiend, setRecipiend ] = useState('');
    const [ theme, setTheme ] = useState('');
    const [ body, setBody ] = useState('');
    const [ error, setError] = useState()

    const submitPost = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/write/', {
                token,
                recipiend,
                theme,
                body,
            })
            if (response.status === 201) {
                setOption(1);
            } else if (response.status === 400 ) {
                setError(response.data.message)
            } else {
                setError("Unknown error");
            }

        } catch (error) {
            console.log("Error: ", error)
        }
    }



    const data = () => {
        console.log("Recipiend: " + recipiend + '\n' + "Theme: " + theme + '\n' + "Body: " + body)
    }

    return (
        <div className='write-container'>
            <MyInput
                name={'recipient-input'}
                setState={setRecipiend}
                placeholder={'Recipiend'}
            />
            <MyInput
                name={'theme-input'}
                setState={setTheme}
                placeholder={'Theme'}
            />
            <MyText
                name="body-input"
                placeholder="Body"
                setState={(e) => setBody(e.target.value)} // Обновлено использование setState
            />

            <div className={'error-message'}>
                {error}
            </div>

            {/*<button*/}
            {/*    onClick={data}*/}
            {/*>Click</button>*/}

            <Button
                text={'Send'}
                name={'send-button'}
                submitPost={submitPost}
            />
        </div>
    );
};

export default WriteMail;