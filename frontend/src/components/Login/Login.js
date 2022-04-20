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
  }

  // helper function 2
  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://song-rater.herokuapp.com/api/auth/login",
      data: {
        username: data.username,
        password: data.password,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
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
        <h1 id="login-title">
          {" "}
          <i class="bi bi-box-arrow-in-right icon-margin"></i>Log In{" "}
        </h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              <span className="div-left-align">
                {" "}
                <i class="bi bi-person-heart"></i>
                <p>Username</p>
              </span>
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
              <p>
                {" "}
                <i class="bi bi-lock-fill icon-margin"></i>Password
              </p>
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
