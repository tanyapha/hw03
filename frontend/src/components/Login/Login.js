import React, { useState } from 'react';
//import { render } from 'react-dom';
import { Form } from 'reactstrap';
import './Login.css'
//import axios from "axios";
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://127.0.0.1:8000/api/auth/login', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return(
        <div className='login-wrapper'>
            <h1> Please Log In </h1>
            <Form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type='text' onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type='Submit'>Submit</button>
                </div>
            </Form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
