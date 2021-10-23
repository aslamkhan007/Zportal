import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Form, Button, Dropdown, Modal } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./../../components/Common/Sidebar";
import Topbar from "./../../components/Common/Topbar";
import "./Settings.scss";
import {
  inviteUserAction,
  getWorkspaceUsersAction,
  getWorkspaceAction,
  searchWorkspaceUsersAction,
  // deleteUsersAction,
  updateUsersAction,
} from "../../redux/Action";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import { Loader } from "../../components/Loader/loader";
import moment from "moment";

const Users = () => {
  const [email, setEmail] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  const userSearchFun = (e) => {
    console.log("aman");
    e.preventDefault();
    setLoading(true);

    searchWorkspaceUsersAction(workspaceId, searchText)
      .then((result) => {
        if (result.data.status === 200) {
          console.log("result", result.data.message, "success");
          createNotification("success", result.data.message);
          if (result.data.result.length > 0) {
            let userData = result.data.result.map((data, index) => {
              return {
                id: index + 1,
                name: data.name,
                email: data.email,
                type: data.type,

                deletedOn: data.deletedOn
                  ? moment(data.deletedOn).format("dddd, MMM, Do YYYY, LT")
                  : "",
                deletedBy:
                  data.deletedBy && data.deletedBy.first_name
                    ? data.deletedBy.first_name + " " + data.deletedBy.last_name
                    : "",
                restore: "",
                userId: data.userId,
                workspaceId: data.workspaceId,
                isDeleted: data.isDeleted ? data.isDeleted : false,
              };
            });
            setUsers(userData);
          } else {
            setUsers([]);
            createNotification("success", "No data found");
          }
        } else {
          createNotification("error", result.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("valid");
  };

  const userFun = (e) => {
    console.log("in userfun");
    e.preventDefault();
    setLoading(true);
    if (isValid(e)) {
      const data = {
        email: email,
        workSpaceId: workspaceId,
      };
      inviteUserAction(data)
        .then((result) => {
          if (result.data.status === 200) {
            console.log("result", result.data.message, "success");
            createNotification("success", result.data.message);
          } else {
            createNotification("error", result.data.message);
          }
        })
        .then(async (res) => {
          await getWorkSpace();
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

  const getWorkSpace = async () => {
    await getWorkspaceAction()
      .then((result) => {
        if (result.data.status === 200) {
          let workSpaceArray = [];

          const { workSpaceObj } = result.data;
          console.log("workSpaceObj", workSpaceObj);
          if (
            workSpaceObj &&
            workSpaceObj.workSpace &&
            workSpaceObj.workSpace._id &&
            workSpaceObj.workSpace.workspace
          ) {
            setWorkspaceId(workSpaceObj.workSpace._id);

            getWorkspaceUsersAction(workSpaceObj.workSpace._id)
              .then((result) => {
                if (result.data.status === 200) {
                  // console.log("result.data", result.data);
                  console.log("data aaaaa", result.data.results);
                  let userData = [],
                    accepted = [],
                    pending = [];
                  let index = 0;
                  if (result.data.results.length > 0) {
                    // console.log("Accepted ", result.data.results);
                    accepted = result.data.results.map((data, idx) => {
                      return {
                        id: ++index,
                        name: data.name,
                        email:
                          data.userId && data.userId.email
                            ? data.userId.email
                            : "",
                        type: data.type,
                        status: "Accepted",
                        deletedOn: data.deletedOn
                          ? moment(data.deletedOn).format(
                            "dddd, MMM, Do YYYY, LT"
                          )
                          : "",
                        deletedBy:
                          data.deletedBy && data.deletedBy.first_name
                            ? data.deletedBy.first_name +
                            " " +
                            data.deletedBy.last_name
                            : "",
                        restoreBy:
                          data.restoreBy && typeof data.restoreBy === "object"
                            ? data.restoreBy.first_name +
                            " " +
                            data.restoreBy.last_name
                            : "",
                        restoreOn: data.restoreOn
                          ? moment(data.restoreOn).format(
                            "dddd, MMM, Do YYYY, LT"
                          )
                          : "",
                        userId: data.userId,
                        workspaceId: data.workspaceId,
                        isDeleted: data.isDeleted ? data.isDeleted : false,
                      };
                    });
                  }
                  if (result.data.pending && result.data.pending.length) {
                    pending = result.data.pending.map((data, idx) => {
                      return {
                        id: ++index,
                        name: data.name ? data.name : "",
                        email: data.email,
                        type: data.type ? data.type : "Member",
                        status: "Pending",
                        deletedOn: data.deletedOn
                          ? moment(data.deletedOn).format(
                            "dddd, MMM, Do YYYY, LT"
                          )
                          : "",
                        deletedBy:
                          data.deletedBy && data.deletedBy.first_name
                            ? data.deletedBy.first_name +
                            " " +
                            data.deletedBy.last_name
                            : "",
                        restoreBy:
                          data.restoreBy && typeof data.restoreBy === "object"
                            ? data.restoreBy.first_name +
                            " " +
                            data.restoreBy.last_name
                            : "",
                        restoreOn: data.restoreOn
                          ? moment(data.restoreOn).format(
                            "dddd, MMM, Do YYYY, LT"
                          )
                          : "",
                        userId: data.userId ? data.userId : "",
                        workspaceId: data.workspaceId ? data.workSpaceId : "",
                        isDeleted: data.isDeleted ? data.isDeleted : false,
                      };
                    });
                  }
                  userData = [...accepted, ...pending];
                  setUsers(userData);
                } else {
                  createNotification("error", result.data.message);
                }
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
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
  };

  useEffect(() => {
    setLoading(true);
    getWorkSpace();
  }, []);

  const updateFn = (e, row, operation) => {
    console.log("in update");
    const data = {
      userId: row.userId ? row.userId._id : "",
      workspaceId: row.workspaceId,
    };
    updateUsersAction(data, operation)
      .then((result) => {
        if (result.data.status === 200) {
          // console.log("result", result.data.message, "success");
          createNotification("success", result.data.message);
          // let userData = result.data.result.map((data, index) => {
          //   return {
          //     id: index + 1,
          //     name: data.name,
          //     type: data.type,
          //     location: "",
          //     deletedOn: data.deletedOn
          //       ? moment(data.deletedOn).format("dddd, MMM, Do YYYY, LT")
          //       : "",
          //     deletedBy:
          //       data.deletedBy && data.deletedBy.first_name
          //         ? data.deletedBy.first_name +
          //           " " +
          //           data.deletedBy.last_name
          //         : "",
          //     restore: "",
          //     userId: data.userId,
          //     workspaceId: data.workspaceId,
          //     isDeleted: data.isDeleted ? data.isDeleted : false,
          //   };
          // });
          console.log("result ", result.data);
          let temp = [...users];
          const data = result.data.result;
          temp = temp.map((val, index) => {
            if (row.userId.email === val.email) {
              // if(operation === "restore")
              // {
              return {
                ...val,
                id: index + 1,
                isDeleted: data.isDeleted,
                deletedBy:
                  data.deletedBy && typeof data.deletedBy === "object"
                    ? data.deletedBy.first_name + " " + data.deletedBy.last_name
                    : "",
                deletedOn: data.deletedOn
                  ? moment(data.deletedOn).format("dddd, MMM, Do YYYY, LT")
                  : "",
                restoreBy:
                  data.restoreBy && typeof data.restoreBy === "object"
                    ? data.restoreBy.first_name + " " + data.restoreBy.last_name
                    : "",
                restoreOn: data.restoreOn
                  ? moment(data.restoreOn).format("dddd, MMM, Do YYYY, LT")
                  : "",
              };
              //   }
              //   else if(operation === "delete")
              //   {

              //   }
              //   else
              //   {
              //     return {
              //   ...val,
              //   id: index + 1,
              // };
              //   }
            }
            return {
              ...val,
              id: index + 1,
            };
          });

          setUsers(temp);
        } else {
          createNotification("error", result.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
  // rows and columns data for data table
  const rows = [
    {
      id: 1,
      name: "test",
      type: "member",
      location: "test",
      deletedOn: "no",
      deletedBy: "no",
      restore: "sd",
      delete: "s",
    },
    {
      id: 2,
      name: "test",
      type: "member",
      location: "test",
      deletedOn: "no",
      deletedBy: "no",
      restore: "sd",
      delete: "s",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "status", headerName: "Status", width: 200 },

    { field: "deletedOn", headerName: "Deleted On", width: 200 },
    { field: "deletedBy", headerName: "Deleted By", width: 200 },
    { field: "restoreOn", headerName: "Restrore On", width: 200 },
    { field: "restoreBy", headerName: "Restrore By", width: 200 },
    {
      field: "",
      headerName: "Action",
      disableClickEventBubbling: true,
      width: 200,
      renderCell: (params) => {
        /*
        const deleteFn = (e) => {
          console.log("in delete");
          const data = {
            userId: params.row.userId ? params.row.userId._id : "",
            workspaceId: params.row.workspaceId,
          };
          updateUsersAction(data, "delete")
            .then((result) => {
              if (result.data.status === 200) {
                // console.log("result", result.data.message, "success");
                createNotification("success", result.data.message);
                // let userData = result.data.result.map((data, index) => {
                //   return {
                //     id: index + 1,
                //     name: data.name,
                //     type: data.type,
                //     location: "",
                //     deletedOn: data.deletedOn
                //       ? moment(data.deletedOn).format("dddd, MMM, Do YYYY, LT")
                //       : "",
                //     deletedBy:
                //       data.deletedBy && data.deletedBy.first_name
                //         ? data.deletedBy.first_name +
                //           " " +
                //           data.deletedBy.last_name
                //         : "",
                //     restore: "",
                //     userId: data.userId,
                //     workspaceId: data.workspaceId,
                //     isDeleted: data.isDeleted ? data.isDeleted : false,
                //   };
                // });
                console.log("result ", result.data);
                let temp = [...users];
                temp = temp.map((val, index) => {
                  if (params.row.userId.email === val.email) {
                    return {
                      ...val,
                      id: index + 1,
                      isDeleted: true,
                      deletedBy:
                        result.data.result.userId.first_name +
                        " " +
                        result.data.result.userId.last_name,
                      deletedOn: result.data.result.deletedOn
                        ? moment(result.data.result.deletedOn).format(
                            "dddd, MMM, Do YYYY, LT"
                          )
                        : "",
                    };
                  }
                  return {
                    ...val,
                    id: index + 1,
                  };
                });

                setUsers(temp);
              } else {
                createNotification("error", result.data.message);
              }
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        };
*/
        if (params.row.status === "Accepted") {
          return params.row.isDeleted ? (
            <Button onClick={(e) => updateFn(e, params.row, "restore")}>
              Restore
            </Button>
          ) : (
            <Button onClick={(e) => updateFn(e, params.row, "delete")}>
              Delete
            </Button>
          );
        } else return "";
      },
    },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <div className="main-sec main_setting Users_mein">
        {/* <Sidebar sidebarTitle={"Settings"} sidebar={sidebar} /> */}
        <div className="right-sec">
          <div className="top-bar bg-white border-0">
            <Topbar topBarTitle={"Users"} />
            <div className="d-flex justify-content-between mt-3">
              <h4 className="d-none d-md-inline-block user_bliss">
                Users are individual member Bliss accounts, e.g Jane Doe, John
                Doe, Joe Blogs, and so on.
              </h4>
            </div>
          </div>
          <div className="right-content-wrap account-form-sec bg-white  h-100">
            <div className="change-pass-box mt-4">
              <Row className="mb-4">
                <Col xl={"12"} md={"12"} className="mb-4">
                  <Form className="row" onSubmit={(e) => userFun(e)}>
                    <Form.Group className="mb-2 col-xl-3 " controlId="formUser">
                      <Form.Label className="sofia-semibold">
                        Add New user(s)
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p className="error_mesage"> {errors.email} </p>
                    </Form.Group>
                    <Form.Group className="mb-2 col-xl-3" controlId="formUser">
                      {/* <Button variant="primary" type="submit" className=" send_invite_user">Send Invite</Button> */}
                      <Button
                        variant="primary"
                        type="submit"
                        className="send_invite_second"
                      >
                        Send Invite
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </div>
            <hr></hr>
            <div className="search_bar">
              <h5>Search Username</h5>

              <Form.Group
                className="topbar-search-user mb-0 d-lg-inline-block col-xl-3 col-md-12 search-user"
                controlId="formBasicPassword"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={(e) => userSearchFun(e)}
                >
                  <path
                    d="M20 20L11.25 11.25"
                    stroke="#0C1826"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="6.07107"
                    transform="rotate(-45 10 10)"
                    fill="white"
                    stroke="#0C1826"
                    stroke-width="2"
                  />
                </svg>

                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Form.Group>
            </div>
            {/* Code for data grid table */}
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer />
      {loading ? <Loader /> : null}
    </React.Fragment>
  );
};
export default Users;
