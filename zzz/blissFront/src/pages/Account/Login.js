import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import Header from "./../../components/Account/Header";
import "../../assets/scss/Account.scss";
import { loginAction ,selectWorkspaceDispatchAction} from "../../redux/Action";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (password === "" || password.trim().length === 0) {
      formIsValid = false;
      error["password"] = "Please enter password";
    }

    setErrors(error);
    return formIsValid;
  };

  const loginFun = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isValid(e)) {
      const loginData = {
        email,
        password,
      };
      dispatch(loginAction(loginData));
    } else {
      setLoading(false);
    }
  };

  const loginState = useSelector((state) => state.auth);
  const token = localStorage.getItem("blissToken");
  

  useEffect(() => {
    console.log("token login",token)
    if (loginState.authenticate && token !== null) {
      setLoading(false);
      createNotification("success", "Login Successfully");
      console.log("loginState=",loginState.workspace)
      if(loginState.workspaceExist || loginState.workspace.acceptedInvitesExist || loginState.workspace.invitesExist)
      {
        const { workspace } = loginState;
        let workSpaceArray = [];
        if (
          workspace &&
          workspace.workSpace &&
          workspace.workSpace._id &&
          workspace.workSpace.workspace
        ) {
          let obj = {
            _id: workspace.workSpace._id,
            workspace: workspace.workSpace.workspace,
            workspacePic: workspace.workSpace.workspacePic
              ? workspace.workSpace.workspacePic
              : "",
            color: workspace.workSpace.color ? workspace.workSpace.color : "",
          };
          workSpaceArray.push(obj);
        }
        if (workspace.acceptedInvites && workspace.acceptedInvites.length > 0) {
          workspace.acceptedInvites.map((obj) => workSpaceArray.push(obj));
        }
        console.log("workSpaceArray", workSpaceArray);
        if (workSpaceArray.length > 0) {
          if (workSpaceArray.length > 1) {
            setTimeout(() => {
                props.history.push("/selectWorkspace");
              }, 3000);
          } else {
            
            localStorage.setItem("userWorkspace", workSpaceArray[0].workspace);
            localStorage.setItem("userWorkspaceId", workSpaceArray[0]._id);
            let workspaceSelected = {
              workspace: workSpaceArray[0].workspace,
              _id: workSpaceArray[0]._id,
              workspacePic: workspace.workSpace.workspacePic
                ? workspace.workSpace.workspacePic
                : "",
              color: workspace.workSpace.color ? workspace.workSpace.color : "",
            };
            localStorage.setItem(
              "userWorkspaceObj",
              JSON.stringify(workspaceSelected)
            );
  
            dispatch(selectWorkspaceDispatchAction(workspaceSelected));
            
  
            setTimeout(() => {
              props.history.push("/inviteUser");
            }, 100);
          }
        }else if(loginState.workspace.invitesExist && loginState.workspace.invites && loginState.workspace.invites.length > 0)
        { 
         setTimeout(() => {
           props.history.push("/manageInviteWorkSpace");
         }, 3000);
        }else{
         setTimeout(() => {
           props.history.push("/selectWorkspace");
         }, 3000);
        }
         
        // if(loginState.workspace.acceptedInvites && loginState.workspace.acceptedInvites.length > 0)
        //  {  
        //   setTimeout(() => {
        //     props.history.push("/selectWorkspace");
        //   }, 3000);
        //  }else if(loginState.workspace.invitesExist && loginState.workspace.invites && loginState.workspace.invites.length > 0)
        //  { 
        //   setTimeout(() => {
        //     props.history.push("/manageInviteWorkSpace");
        //   }, 3000);
        //  }else{
        //   setTimeout(() => {
        //     props.history.push("/createWorkspace");
        //   }, 3000);
        //  }
        
      }else{ 
         setTimeout(() => {
          props.history.push("/createWorkspace");
        }, 3000);
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
        
          <h2 className="text-center mb-36 sofia-semibold">Good Morning!</h2>
          <div className="loginform">
          <Form onSubmit={(e) => loginFun(e)}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label className="sofia-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="error_mesage text-primary"> {errors.email} </p>
            </Form.Group>

            <Form.Group className="mb-0" controlId="formBasicPassword">
              <Form.Label className="sofia-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="error_mesage text-primary"> {errors.password} </p>
            </Form.Group>
            <p className="text-end forgetpassword">
              <Link to="/forgotPassword" className="text-primary">
                Forgot Password
              </Link>
            </p>
            <div className="text-both-line mb-3">or</div>
            <Button
              variant="outline-secondary"
              type="button"
              className="w-100 btn-sm"
            >
              Google sign in button
            </Button>

            <Button variant="primary" type="submit" className="w-100 mt-40">
              Log In
            </Button>
            <Link
              to="/register"
              className="text-center mt-3 d-block text-primary"
            >
              Don't have an account yet? Sign Up
            </Link>
          </Form>
        </div>
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

export default Login;
