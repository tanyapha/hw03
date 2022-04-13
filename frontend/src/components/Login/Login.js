import React, { useState } from "react";
//import { render } from 'react-dom';
import { Button, Form, FormGroup } from "reactstrap";
import "./Login.css";
//import axios from "axios";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://127.0.0.1:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
    localStorage.setItem("user", username);
  };

  return (
    <div className="login-wrapper">
      <body className="login-content">
        <h1 id="login-title"> Please Log In </h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>
              <p>Username</p>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              <p>Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </FormGroup>
          <div className="div-center-align">
            <Button type="Submit">Submit</Button>
          </div>
        </Form>
      </body>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
