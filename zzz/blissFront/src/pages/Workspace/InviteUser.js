import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import Header from "./../../components/Account/Header";
import "../../assets/scss/Account.scss";
import { inviteUserAction ,getWorkspaceAction } from "../../redux/Action";

const InviteUser = (props) => {
  const [email, setEmail] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
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

  const workspaceFun = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isValid(e)) {
        const data = {
         email: email,
         permission:'',
         workSpaceId:workspaceId
       };
       inviteUserAction(data)
         .then((result) => {
           if (result.data.status === 200) {
             console.log("result", result.data.message, "success");
             createNotification("success", result.data.message);
             setTimeout(() => {
                props.history.push("/selectWorkspace");
              }, 3000);
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
    setLoading(true);
    getWorkspaceAction()
    .then((result) => {
      if (result.data.status === 200) {
        const { workSpaceObj }= result.data
        if(workSpaceObj && workSpaceObj.workSpace && workSpaceObj.workSpace._id && workSpaceObj.workSpace.workspace)
        {
          setWorkspaceId(workSpaceObj.workSpace._id)
        }
       } else {
        createNotification("error", result.data.message);
      }
      setLoading(false);
    })
    .catch((err) => {
    setLoading(false);
      console.log(err);
    });
 },[])

  return (
    <React.Fragment>
      <Header />
      <div className="auth-sec">
        <div className="login-box selectworkspace">
        <div className="tp-bk-sk">
        <span className="loginback" onClick={()=>props.history.goBack()}>Back</span>
         <span className="loginback" onClick={()=>props.history.push('/dashboard')}>Skip</span>
        </div>
          <h2 className="text-center mb-60 sofia-semibold">Create new Workspace</h2>
          <div className="work-space-form">
          <Form onSubmit={(e) => workspaceFun(e)}>
            <Form.Group className="mb-60" controlId="formBasicEmail">
              <Form.Label className="sofia-semibold">Invite your team!</Form.Label>
              <Form.Control
                type="workspace"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="error_mesage"> {errors.email} </p>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Next
            </Button>
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

export default InviteUser;
