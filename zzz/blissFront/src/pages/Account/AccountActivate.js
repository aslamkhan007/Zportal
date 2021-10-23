import React, { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import Header from "./../../components/Account/Header";
import "../../assets/scss/Account.scss";
import { accountActivationAction } from "../../redux/Action";

const AccountActivate = (props) => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const {token} = useParams()

  useEffect(() => {
    setLoading(true);
      accountActivationAction(token)
        .then((result) => {
          if (result.data.status === 200) {
            console.log("result", result.data.message, "success");
            createNotification("success", result.data.message);
            setTimeout(() => {
              props.history.push("/");
            }, 2000);
          } else {
            setShowError(true)
            createNotification("error", result.data.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("valid");
    
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="auth-sec">
        <div className="login-box">
          <h2 className="text-center mb-5 sofia-semibold">Account Activation</h2>
         <h4>{showError ?"Some issue in activation":"Account Activated"}</h4>
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

export default AccountActivate;
