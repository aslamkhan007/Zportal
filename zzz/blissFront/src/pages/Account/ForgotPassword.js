import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import Header from "./../../components/Account/Header";
import "../../assets/scss/Account.scss";
import { forgotPasswordAction } from "../../redux/Action";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const isValid = (e) => {
    let error = {};
    let formIsValid = true;
    const regexTest =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "" || email.trim().length === 0) {
      formIsValid = false;
      error["email"] = "Please enter email";
    }
    if (email && regexTest.test(email) === false) {
      console.log("regex test", regexTest.test(email));
      formIsValid = false;
      error["email"] = "Please enter valid email";
    }

    setErrors(error);
    return formIsValid;
  };

  const forgotPasswordFun = (e) => {
        e.preventDefault();
        setLoading(true);
        if (isValid(e)) {
          const data = {
            email: email
          };
          forgotPasswordAction(data)
            .then((result) => {
              if (result.data.status === 200) {
                console.log("result", result.data.message, "success");
                createNotification("success", result.data.message);
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

  

  return (
    <React.Fragment>
      <Header />
      <div className="auth-sec">
        <div className="login-box">
          <span onClick={()=>props.history.goBack()}>Back</span>
          <h2 className="text-center mb-5 sofia-semibold">Forgot Password</h2>
          <Form onSubmit={(e) => forgotPasswordFun(e)}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label className="sofia-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="error_mesage"> {errors.email} </p>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Forgot Password
            </Button>
            
          </Form>
        </div>
        {/*<AddTodo />
          <TodoList />
          <Footer />*/}
      </div>
      <NotificationContainer />
      {loading ? <Loader /> : null}
    </React.Fragment>
  );
};

export default ForgotPassword;
