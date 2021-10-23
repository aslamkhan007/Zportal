import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import Header from "../../components/Account/Header";
import "../../assets/scss/Account.scss";
import Workspace from "./CreateWorkSpace";
import {
  getWorkspaceDispatchAction,
  selectWorkspaceDispatchAction,
} from "../../redux/Action";
import { find } from "lodash";

const SelectWorkspace = (props) => {
  const [workspace, setWorkspace] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [workspaceList, setWorkspaceList] = useState([]);
  const dispatch = useDispatch();

  const workspaceFun = (e) => {
    e.preventDefault();
    let workObj = find(workspaceList, { _id: workspace });
    console.log("workObj=workObj", workObj);
    if (workObj) {
      localStorage.setItem("userWorkspace", workObj.workspace);
      localStorage.setItem("userWorkspaceId", workObj._id);
      localStorage.setItem("userWorkspaceObj", JSON.stringify(workObj));

      dispatch(selectWorkspaceDispatchAction(workObj));

      createNotification("success", "Workspace selected successfully");
      setTimeout(() => {
        props.history.push("/dashboard");
      }, 3000);
    } else {
      createNotification("error", "Something went wrong!");
    }
  };

  useEffect(() => {
    dispatch(getWorkspaceDispatchAction());
  }, []);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref;
  };
  const workspaceState = useSelector((state) => state.workspace);
  const preWorkspaceState = usePrevious(
    useSelector((state) => state.workspace)
  );
  console.log("workspaceState select", workspaceState);
  console.log("preWorkspaceState select", preWorkspaceState);

  useEffect(() => {
    setLoading(true);

    if (workspaceState.workspace) {
      const { workspace } = workspaceState;
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
        setWorkspace(obj._id + "###" + obj.workspace);
      }
      if (workspace.acceptedInvites && workspace.acceptedInvites.length > 0) {
        workspace.acceptedInvites.map((obj) => workSpaceArray.push(obj));
      }
      console.log("workSpaceArray", workSpaceArray);
      if (workSpaceArray.length > 0) {
        if (workSpaceArray.length > 1) {
          setWorkspaceList(workSpaceArray);
        } else {
          setWorkspaceList(workSpaceArray);
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
          // console.log("workspaceSelected out",workspaceSelected)
          // console.log("workspaceState",workspaceState)
          // console.log("preWorkspaceState.current",preWorkspaceState.current)
          if (preWorkspaceState.current !== workspaceState || workspaceState.selectedWorkspace === "") {
            console.log("workspaceSelected ",workspaceSelected)
            dispatch(selectWorkspaceDispatchAction(workspaceSelected));
          }

          setTimeout(() => {
            props.history.push("/dashboard");
          }, 100);
        }
      }
    }
    setLoading(false);
  }, [workspaceState]);

  return (
    <React.Fragment>
      <Header />
      <div className="auth-sec">
        <div className="login-box selectworkspace">
          <span className="loginback" onClick={() => props.history.goBack()}>
            Back
          </span>
          <h2 className="text-center mb-5 sofia-semibold">Select Workspace</h2>
          <div className="work-space-form">
            <Form onSubmit={(e) => workspaceFun(e)}>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label className="sofia-semibold">Workspace</Form.Label>
                <select
                  id="dropdown"
                  className="form-select"
                  value={workspace}
                  maxLength={30}
                  onChange={(e) => setWorkspace(e.target.value)}
                  required
                >
                  <option value="">Select workspace</option>
                  {workspaceList &&
                    workspaceList.length > 0 &&
                    workspaceList.map((data) => {
                      return <option value={data._id}>{data.workspace}</option>;
                    })}
                </select>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4">
                Select Workspace
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

export default SelectWorkspace;
