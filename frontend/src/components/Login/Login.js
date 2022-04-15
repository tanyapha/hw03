import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
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
            <Label>
              <p>Username</p>
              <Input
                type="text"
                id="username"
                value={data.username}
                placeholder="Enter Username"
                onChange={(e) => handleChange(e)}
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>
              <p>Password</p>
              <Input
                type="password"
                id="password"
                value={data.password}
                placeholder="Enter Password"
                onChange={(e) => handleChange(e)}
              />
            </Label>
          </FormGroup>
          <div className="div-center-align">
            <Button
              className="main-button"
              type="submit"
              disabled={data.username === "" || data.password === ""}
            >
              {" "}
              Log in{" "}
            </Button>
          </div>
        </Form>
        <div>
          {errorShow ? (
            <div className="message">Incorrect username or password.</div>
          ) : null}
        </div>

        <div className="register">
          <div>Don't have an account?</div>
          <Button className="second-button" onClick={routeChange}>
            {" "}
            Register here{" "}
          </Button>
        </div>
      </body>
    </div>
  );
}
