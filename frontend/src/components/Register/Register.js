import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup } from "reactstrap";
import "./Register.css";
import axios from "axios";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";

export default function Register() {
  let navigate = useNavigate();
  const url = "http://127.0.0.1:8000/api/auth/register";
  const [data, setData] = useState({username: "", password: ""});
  var [errorShow, setErrorShow] = useState(false);

  function routeChange() {
    let path = "/login";
    navigate(path);
  }

  // helper function 1
  function handleChange(e) {
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  };

  // helper function 2
  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/auth/register",
      data:{
        username: data.username,
        password: data.password  },
      headers: {"Content-Type": "application/json"}
    }).then(res =>{
        console.log(res.data);
        alert("Successfully registered!");
        navigate("/login");
    }).catch(err => {
      console.log(err);
      setErrorShow(true);
      // alert("This username is already used.");
      // alert(errorShow);
    });
  }


  // return
  return(
    <div className="register-wrapper">
      <div className="register-content">
        <h1 id="login-title"> Please register </h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>
              <p>Username</p>
              <input type="text" id="username" value={data.username} placeholder="Enter Username" onChange={(e) => handleChange(e)}
              />
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              <p>Password</p>
              <input type="password" id="password" value={data.password} placeholder="Enter Password" onChange={(e) => handleChange(e)}/>
            </label>
          </FormGroup>
          <div>
            {errorShow ? (
              <div className="error">This username is already used.</div>
            ) : null}
          </div>

          <div className="div-center-align">
            <Button type="submit" disabled={data.username === "" || data.password === ""}> Register </Button>
          </div>
        </Form>
        <div className="div-center-align">
          <div>You already have an account?</div>
          <button onClick={routeChange}> Log in </button>
        </div>
      </div>
    </div>
      );
}
