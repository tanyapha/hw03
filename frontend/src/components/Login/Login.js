import React, { useState } from "react";
import { Button, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

export default function Login() {
  let navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  var [errorShow, setErrorShow] = useState(false);
  function routeChange() {
    let path = "/register";
    navigate(path);
  }

  // helper function 1
  function handleChange(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  // helper function 2
  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/auth/login",
      data: {
        username: data.username,
        password: data.password,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("user", res.data.user.username);
        alert("Successfully logged in!");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setErrorShow(true);
      });
  }

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
                id="username"
                value={data.username}
                placeholder="Enter Username"
                onChange={(e) => handleChange(e)}
              />
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              <p>Password</p>
              <input
                type="password"
                id="password"
                value={data.password}
                placeholder="Enter Password"
                onChange={(e) => handleChange(e)}
              />
            </label>
          </FormGroup>
          <div>
            {errorShow ? (
              <div className="message">
                Incorrect credentials. Please try with a different username or
                password.
              </div>
            ) : null}
          </div>
          <div className="div-center-align">
            <Button
              type="submit"
              disabled={data.username === "" || data.password === ""}
            >
              {" "}
              Log in{" "}
            </Button>
          </div>
        </Form>
        <div className="register">
          <div>Don't have an account?</div>
          <button onClick={routeChange}> Register here </button>
        </div>
      </body>
    </div>
  );
}
