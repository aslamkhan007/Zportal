import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link ,useParams} from "react-router-dom";
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import Header from "../../components/Account/Header";
import "../../assets/scss/Account.scss";
import { ImpersinationloginAction } from "../../redux/Action";

const ImpersonationLogin = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {id} = useParams()
  

  
  useEffect(() => {
    setLoading(true);
    const data ={ _id: id}
    dispatch(ImpersinationloginAction(data));
  },[])

  const loginState = useSelector((state) => state.auth);
  const token = localStorage.getItem("blissToken");

  useEffect(() => {
    if (loginState.authenticate && token !== null) {
      setLoading(false);
      //createNotification("success", "Login Successfully");
      console.log("loginState=",loginState.workspace)
      if(loginState.workspaceExist || loginState.workspace.acceptedInvitesExist || loginState.workspace.invitesExist)
      {
         if(loginState.workspace.acceptedInvites && loginState.workspace.acceptedInvites.length > 0)
         {  
          setTimeout(() => {
            props.history.push("/selectWorkspace");
          }, 0);
         }else if(loginState.workspace.invites && loginState.workspace.invites.length > 0)
         { 
          setTimeout(() => {
            props.history.push("/manageInviteWorkSpace");
          }, 0);
         }else{
          setTimeout(() => {
            props.history.push("/selectWorkspace");
          }, 0);
         }
        
      }else{ 
         setTimeout(() => {
          props.history.push("/createWorkspace");
        }, 0);
      }
      
    }
    if (loginState.loginError && loginState.error !== "") {
      console.log(loginState.error);
      setLoading(false);
      createNotification("error", loginState.error);
    }
  }, [loginState]);

  return (
    <React.Fragment>
      <Header />
      <div className="auth-sec">
        <div className="login-box">
          <h2 className="text-center mb-5 sofia-semibold">Impersonation</h2>
          
        </div>
      </div>
      <NotificationContainer />
      {loading ? <Loader /> : null}
    </React.Fragment>
  );
};

export default ImpersonationLogin;
