import React, {useEffect, useState} from 'react';
import './ReciviedMail.scss'
import {NavLink} from "react-router-dom";
import ListItem from "../Box/ListItem/ListItem";
import axios from "axios";

const RecivedMail = ({token}) => {
    const [ mail, setMail ] = useState([])
    const [ error, setError ] = useState(null)
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        const fetchMail = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/recivemail/', {
                    token,
                })
                if (response.status === 200) {
                    if (response.data.status === 'error') {
                        setError(response.data.message);
                    } else {
                        setMail(response.data);
                    }
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                console.log('Error fetching mail: ',error)
            }
        }

        fetchMail()
    }, []);

    const handleSelectMessage = (index) => {
        setSelectedMessage(index === selectedMessage ? null : index);
    };

    return (
        <div className={'recived-mail-container'}>
            {error ? (
                <div className={'not-mail'}>
                    {error}
                </div>
            ) : (
                Array.isArray(mail) &&
                mail.map((email, index) => (
                    <div className={'link'} key={index} onClick={() => handleSelectMessage(index)}>
                        {selectedMessage === index ? (
                            <div className={'open-message'}>
                                <p>Sender: {email.sender}</p>
                                <p>Theme: {email.theme}</p>
                                <p>Body: {email.body}</p>
                                <p>Send date: {email.send_date}</p>
                            </div>
                        ) : (
                            <ListItem
                                theme={email.theme}
                                body={email.body}
                                sendData={email.send_date} />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default RecivedMail;