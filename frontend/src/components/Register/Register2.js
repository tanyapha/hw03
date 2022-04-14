import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup } from "reactstrap";
import "./Register.css";
import axios from "axios";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: this.props.username,
        password: this.props.password,
      },
      errorShow: false,
    };
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: this.props.data,
  //     errorShow: false,
  //   };
  // };

  routeChange() {
    this.props.history.push("/");
  };

  // helper function 1
  handleChange = (e) => {
    let {name, value} = e.target;
    const data = {...this.state.data, [name]: value };
    this.setState({ data });
    console.log(data);
  };

  // helper function 2
  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/auth/register",
      data:{
        username: this.state.data.username,
        password: this.state.data.password  },
      headers: {"Content-Type": "application/json"}
    }).then(res =>{
        console.log(res.data);
        alert("Successfully registered!");
        this.props.history.push("/");
    }).catch(err => {
      console.log(err);
      // this.setState({errorShow: true});
      this.state.errorShow = true;
      alert("This username is already used.");
    });
  };


  // render
  render = () => {
  return(
    <div className="register-wrapper">
      <div className="register-content">
        <h1 id="login-title"> Please register </h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <label>
              <p>Username</p>
              <input type="text" id="username" value={this.state.data.username} placeholder="Enter Username" onChange={this.handleChange}/>
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              <p>Password</p>
              <input type="password" id="password" value={this.state.data.password} placeholder="Enter Password" onChange={this.handleChange}/>
            </label>
          </FormGroup>
          <div>
            {this.state.errorShow ? (
              <div>MODAL HERE</div>
            ) : null}
          </div>

          <div className="div-center-align">
            <Button type="submit" disabled={this.state.data.username === "" || this.state.data.password === ""}> Register </Button>
          </div>
        </Form>
        <div className="div-center-align">
          <div>You already have an account?</div>
          <button onClick={this.routeChange}> Log in </button>
        </div>
      </div>
    </div>
      );
  };
};

export default Register;
