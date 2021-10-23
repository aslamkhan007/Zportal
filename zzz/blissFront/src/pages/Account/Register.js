import React, { Component, useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Header from "./../../components/Account/Header";
import "../../assets/scss/Account.scss";
import { Link, useParams } from 'react-router-dom';
import { Loader } from "../../components/Loader/loader";
import { signupAction } from "../../redux/Action";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import jwt_decode from "jwt-decode";
import PasswordChecklist from "react-password-checklist"

const Register = (props) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(2);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  

  const isValid = (e) => {
    let error = {};
    let formIsValid = true;

    const regexTest =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (firstName === "" || firstName.trim().length === 0) {
      formIsValid = false;
      error["firstName"] = "Please enter firstname";
    }
    if (lastName === "" || lastName.trim().length === 0) {
      formIsValid = false;
      error["lastName"] = "Please enter lastname";
    }
    if (email === "" || email.trim().length === 0) {
      formIsValid = false;
      error["email"] = "Please enter email";
    }
    if (email && regexTest.test(email) === false) {
      console.log("regex test", regexTest.test(email));
      formIsValid = false;
      error["email"] = "Please enter valid email";
    }
    if (!validPassword) {
      formIsValid = false;
      error["password"] = "Please enter valid Password";
    }
    if (password === "" || password.trim().length === 0) {
      formIsValid = false;
      error["password"] = "Please enter password";
    }
    if (password !== "" && password.trim().length < 3) {
      formIsValid = false;
      error["password"] = "Please enter minimum 3 digit";
    }
    if (confirmPassword === "" || confirmPassword.trim().length === 0) {
      formIsValid = false;
      error["confirmPassword"] = "Please enter confirm password";
    }
    if (
      password !== "" &&
      password.trim().length !== 0 &&
      confirmPassword !== "" &&
      confirmPassword.trim().length !== 0
    ) {
      if (password !== confirmPassword) {
        formIsValid = false;
        error["confirmPassword"] =
          "Password and confirm password should be same";
      }
    }
    setErrors(error);
    return formIsValid;
  };

  const SignupFun = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isValid(e)) {
      const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        role: 2,
        password: password,
        status: userToken && userToken !==''?1:0
      };
      signupAction(data)
        .then((result) => {
          if (result.data.status === 200) {
            console.log("result", result.data.message, "success");
            createNotification("success", result.data.message);
            setTimeout(() => {
              props.history.push("/");
            }, 2000);
          } else {
            createNotification("error", result.data.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("valid");
    } else {
      setLoading(false);
      console.log("errors", errors);
    }
  };
  const {token} = useParams()
  useEffect(()=>{
     if(token)
    {
      let decoded = jwt_decode(token);
      console.log("decoded==",decoded);
      if(decoded && decoded.invitedUser)
      {
        setEmail(decoded.invitedUser);
        setUserToken(decoded.invitedUser);
      }
    }
    
  },[])

  useEffect(()=>{
     if(password && password.trim().length > 0)
     {
       setShowChecklist(true)
     }else{
       setShowChecklist(false)
     }

  },[password])

  return (
    <React.Fragment>
      <Header />
      <div className="auth-sec">
        <div className="login-box register-box">
          <span onClick={()=>props.history.goBack()}>Back</span>
          <h2 className="text-center mb-5 sofia-semibold">Register</h2>
          <Form onSubmit={(e) => SignupFun(e)}>
            <Row>
              <Col>
                <Form.Group className="mb-2" controlId="firstName">
                  <Form.Label className="sofia-semibold">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={firstName}
                    maxLength={30}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <p className="error_mesage"> {errors.firstName} </p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2" controlId="lastName">
                  <Form.Label className="sofia-semibold">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={lastName}
                    maxLength={30}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <p className="error_mesage"> {errors.lastName} </p>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-2" controlId="email">
              <Form.Label className="sofia-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                value={email}
                maxLength={30}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="error_mesage"> {errors.email} </p>
            </Form.Group>

            <Form.Group className="mb-2" controlId="password">
              <Form.Label className="sofia-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                value={password}
                maxLength={30}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="error_mesage"> {errors.password} </p>
              {showChecklist?  <PasswordChecklist
                rules={["minLength","specialChar","number","capital","match"]}
                minLength={8}
                value={password}
                valueAgain={confirmPassword}
                onChange={(isValid) => {
                  setValidPassword(isValid)
                }}
              />
              :null}
            </Form.Group>
            <Form.Group className="mb-2" controlId="rePassword">
              <Form.Label className="sofia-semibold">
                Re-enter Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                value={confirmPassword}
                maxLength={30}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className="error_mesage"> {errors.confirmPassword} </p>
          
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Register
            </Button>
            <Link
              to="/"
              className="text-center mt-3 d-block text-primary"
            >
              Have a account ? Login
            </Link>
          </Form>
        </div>
      </div>
      <NotificationContainer />
      {loading ? <Loader /> : null}
    </React.Fragment>
  );
};
export default Register;
