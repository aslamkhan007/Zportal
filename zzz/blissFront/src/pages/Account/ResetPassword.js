import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import Header from "./../../components/Account/Header";
import "../../assets/scss/Account.scss";
import { resetPasswordAction } from "../../redux/Action";
import PasswordChecklist from "react-password-checklist"


const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const {token} = useParams()
  const dispatch = useDispatch();

  const isValid = (e) => {
    let error = {};
    let formIsValid = true;
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

  const resetPasswordFun = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isValid(e)) {
      const data = {
        resetToken: token,
        password: password,
      };
      resetPasswordAction(data)
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
        <div className="login-box resetpassword-box">
          <h2 className="text-center mb-5 sofia-semibold">Reset Password</h2>
          <Form onSubmit={(e) => resetPasswordFun(e)}>
            

          <Form.Group className="mb-2" controlId="password">
              <Form.Label className="sofia-semibold">New Password</Form.Label>
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
              Reset Password
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

export default ResetPassword;
