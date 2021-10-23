import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/loader";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import Header from "../../components/Account/Header";
import "../../assets/scss/Account.scss";
import Workspace from "./CreateWorkSpace";
import { acceptUserAction, rejectUserAction } from "../../redux/Action";

const ManageInviteWorkSpace = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");

  const manageInviteFun = (e, status) => {
    e.preventDefault();
    console.log("status=", status);
    const data = {
      workSpaceId: workspaceId,
    };
    if (status === "reject") {
      rejectUserAction(data)
        .then((result) => {
          if (result.data.status === 200) {
            console.log("result", result.data.message, "success");
            createNotification("success", result.data.message);
            setTimeout(() => {
              props.history.push("/createWorkspace");
            }, 2000);
          } else {
            createNotification("error", result.data.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      acceptUserAction(data)
        .then((result) => {
          if (result.data.status === 200) {
            console.log("result", result.data.message, "success");
            createNotification("success", result.data.message);
            setTimeout(() => {
              props.history.push("/selectWorkspace");
            }, 2000);
          } else {
            createNotification("error", result.data.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const workspaceData = localStorage.getItem("workspace");
    const workspaceDataParsed = JSON.parse(workspaceData);
    console.log("workspaceDataParsed", workspaceDataParsed);
    if (
      workspaceDataParsed &&
      workspaceDataParsed.invites &&
      workspaceDataParsed.invites.length > 0
    ) {
      setUser(workspaceDataParsed.invites[0].workspace);
      setWorkspace(workspaceDataParsed.invites[0].workspace);
      setWorkspaceId(workspaceDataParsed.invites[0]._id);
    }
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="auth-sec">
        <div className="login-box">
          <h2 className="text-center mb-5 sofia-semibold">Manage Invite</h2>
          <p>
            {user} have invited you for workspace({workspace}), would you like
            to accept{" "}
          </p>
          <Button
            variant="primary"
            type="button"
            onClick={(e) => manageInviteFun(e, "accept")}
            className="w-100 mt-4"
          >
            Accept
          </Button>

          <Button
            variant="primary"
            type="button"
            onClick={(e) => manageInviteFun(e, "reject")}
            className="w-100 mt-4"
          >
            Reject
          </Button>
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

export default ManageInviteWorkSpace;
