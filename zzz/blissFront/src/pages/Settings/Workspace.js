import React, { Component, useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Row, Col, Form, Button, Dropdown, Modal } from "react-bootstrap";
import Sidebar from "../../components/Common/Sidebar";
import Topbar from "../../components/Common/Topbar";
import "./Settings.scss";
import { NotificationContainer } from "react-notifications";
import { createNotification } from "../../Helper/helper";
import { Loader } from "../../components/Loader/loader";

const Workspacesetting = () => {
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  const [workspaceList, setWorkspaceList] = useState([]);

  const sidebar = {
    userBoard: true,
    sidebarSubTitle: [
      {
        name: "General Settings",
        link: "settings",
      },
      {
        name: "My Account",
        link: "account",
      },
      {
        name: "Users",
        link: "user",
      },
      {
        name: "Security and Permissions",
        link: "security",
      },
      {
        name: "Recycle Bin",
        link: "recycle",
      },
       {
        name: "Archive",
        link: "archive-page",
      },
      {
        name: "Import",
        link: "import",
      },
      {
        name: "Workspace",
        link: "Workspace",
      },
    ],
  };
  const workspaceState = useSelector((state) => state.workspace);

  useEffect(() => {
    setLoading(true);
        
        if (workspaceState.workspace) {
          const {workspace } = workspaceState
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
            };
            workSpaceArray.push(obj);
          }
          if (
            workspace.acceptedInvites &&
            workspace.acceptedInvites.length > 0
          ) {

            workspace.acceptedInvites.map((obj) => workSpaceArray.push(obj));
          }
          console.log("workSpaceArray===",workSpaceArray)
          setWorkspaceList(workSpaceArray);
         
        }
        setLoading(false);
      
  }, [workspaceState]);

  
  return (
    <React.Fragment>
      <div className="main-sec main_setting">
        {/* <Sidebar sidebarTitle={"Settings"} sidebar={sidebar} /> */}
        <div className="right-sec">
          <div className="top-bar bg-white border-0">
            <Topbar topBarTitle={"Select Workspace"} />
            <div className="d-flex justify-content-between mt-3">
              <h5 className="d-none d-md-inline-block">
                Message about workspaces.
              </h5>
            </div>
          </div>
          <div className="right-content-wrap bg-white h-100 settings_workspace">
            <div className="mb-4 col-xl-7 col-md-12">
              <div className="selectworkspace mt-30 ">
                <Form.Group className="mb-60" controlId="formBasicEmail">
                  <Link
                    to={"/createWorkspace"}
                    variant="primary"
                    className="mt-2 new_workspace_btn btn btn-primary"
                  >
                    New Workspace
                  </Link>
                </Form.Group>
                <div className="workspace_box d-flex">
                {workspaceList &&
                    workspaceList.length > 0 &&
                    workspaceList.map((data) => {
               return  <Card className="workspace-mbox">
                    <Link to={"/SelectWorkspace"}>
                      <div className="wcb">{data.workspace}</div>
                    </Link>
                    <Button
                      variant="primary"
                      className="btn btn-primary w-full wk_import"
                    >
                      Import
                    </Button>
                    <Button
                      variant="primary"
                      className="btn btn-primary w-full wk_leave"
                    >
                      Leave
                    </Button>
                  </Card>
                    })
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NotificationContainer />
      {loading ? <Loader /> : null}
    </React.Fragment>
  );
};
export default Workspacesetting;
