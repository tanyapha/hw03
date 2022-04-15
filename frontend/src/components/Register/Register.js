import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup } from "reactstrap";
import "./Register.css";
import axios from "axios";

export default function Register() {
  let navigate = useNavigate();
  const [data, setData] = useState({username: "", password: ""});
  var [errorShow, setErrorShow] = useState(false);
  var [successShow, setSuccessShow] = useState(false);

  function routeChange() {
    let path = "/";
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
        alert("Successfully registered!")
        navigate("/");
    }).catch(err => {
      console.log(err);
      setErrorShow(true);
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
              <div className="message">This username is already used.</div>
            ) : null}
          </div>
          <div className="div-center-align">
            <Button type="submit" disabled={data.username === "" || data.password === ""}> Register </Button>
          </div>
        </Form>
        <div className="login">
          <div>You already have an account?</div>
          <button onClick={routeChange}> Log in </button>
        </div>
      </div>
    </div>
      );
}
