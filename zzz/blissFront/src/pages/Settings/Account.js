import React, { Component, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Form, Button, Dropdown, Modal } from "react-bootstrap";
import Sidebar from "./../../components/Common/Sidebar";
import Topbar from "./../../components/Common/Topbar";
import "./Settings.scss";
import {
  changeProfilePicture,
  changePassword,
  changeTimeZone,
} from "../../redux/Action";
import { createNotification } from "../../Helper/helper";
import { NotificationContainer } from "react-notifications";
import { Loader } from "../../components/Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import TimezoneSelect from "react-timezone-select";
import { getWorkspaceDispatchAction, selectWorkspaceDispatchAction, afterLoginAction } from '../../redux/Action';
import * as CONFIG from '../../config.json'

const Account = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState([]);
  const [profileUrl, setProfileUrl] = useState("");
  const dispatch = useDispatch();
  const authDetails = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const uploadInput = useRef(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedTimeFormat, setSelectedTimeFormat] = useState("");
  const [selectedDateFormat, setSelectedDateFormat] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState("");
  const [tz, setTz] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  // console.log("auth d::", authDetails)

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
  const [show, setShow] = useState(false);

  // effects
  useEffect(() => { }, [tz]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if (isValid(e)) {
      // submit change password
      const response = await changePassword({
        currentPassword,
        password: confirmPassword,
      });
      if (response.status === 401) {
        setErrors({ currentPassword: response.message });
      }
      if (response.status === 200) {
        createNotification("success", response.message);
        handleClose();
      }
    }
  };
  const handleTimeZoneChange = async (selectedZone) => {
    setTz(selectedZone);
    //  selectedTimeZone, selectedTimeFormat, selectedDateFormat
    const response = await changeTimeZone({
      selectedTimeZone: selectedZone.value,
    });
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.result));
    }

  };
  const handleTimeFormatChange = async (timeFormat) => {
    setSelectedTimeFormat(Number(timeFormat));
    //  selectedTimeZone, selectedTimeFormat, selectedDateFormat
    const response = await changeTimeZone({
      selectedTimeFormat: timeFormat,
    });
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.result));
    }
  }

  const handleDateFormatChange = async (dateFormat) => {
    const response = await changeTimeZone({
      selectedDateFormat: selectedDateFormat,
    });
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.result));
    }
  }

  const handleNotificationsChange = async (notifications) => {
    console.log("called::", notifications)
    setSelectedNotifications(notifications)
    const response = await changeTimeZone({
      notifications: notifications,
    });
    console.log("rs:::;", response)
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.result));
    }
  }

  const uploadProfilePicture = async (event) => {
    const Response = await changeProfilePicture(event.target.files);
    /// console.log("Response::::", Response);
    if (Response) {
      const profile_img = "profile_img";
      let userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        userData.profile_img = Response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        setDisplayUser();
        createNotification(
          "success",
          "Profile picture is changed successfully"
        );
      }
    } else {
      createNotification(
        "danger",
        "Something went wrong, please try again later!"
      );
    }
  };
  const changeProfileClick = (e) => {
    uploadInput.current.click();
  };

  // helper fnctions
  const isValid = (e) => {
    let error = {};
    let formIsValid = true;
    if (currentPassword === "" || currentPassword.trim().length === 0) {
      formIsValid = false;
      error["currentPassword"] = "Please enter current Password";
    }
    if (newPassword === "" || newPassword.trim().length === 0) {
      formIsValid = false;
      error["newPassword"] = "Please enter newPassword";
    }

    if (confirmPassword === "" || confirmPassword.trim().length === 0) {
      formIsValid = false;
      error["confirmPassword"] = "Please enter confirmPassword";
    }

    if (confirmPassword !== newPassword) {
      formIsValid = false;
      error["confirmPassword"] =
        "New password and confirm password should be same";
    }
    console.log("errors::", error);
    setErrors(error);
    return formIsValid;
  };
  const setDisplayUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setEmail(user.email);
      let userName = `${user.first_name} ${user.last_name}`;
      setUserName(userName);
      if (user && user.profile_img) {
        setProfileUrl(
          `${CONFIG.API_URL}/uploads/profile/${user.profile_img}`
        );
      }
      if (user.selectedTimeZone) {
        setTz(user.selectedTimeZone)
      }
      if (user.selectedTimeFormat) {
        setSelectedTimeFormat(user.selectedTimeFormat)
      }
      if (user.selectedDateFormat) {
        setSelectedDateFormat(user.selectedDateFormat)
      }
      if (user.notifications) {
        setSelectedNotifications(user.notifications)
      }

    }
  };
  useEffect(() => {
    setDisplayUser();
  }, []);

  useEffect(() => {
    dispatch(afterLoginAction())
  }, [profileUrl]);



  return (
    <React.Fragment>
      <div className="main-sec main_setting account_mein">
        {/* <Sidebar sidebarTitle={"Settings"} sidebar={sidebar} /> */}
        <div className="right-sec">
          <div className="top-bar bg-white border-0">
            <Topbar topBarTitle={"My Account"} />
          </div>
          <div className="right-content-wrap account-form-sec bg-white">
            <div className="change-pass-box mt-4">
              <Row className="mb-4">
                <Col xl={"5"} md={"12"} className="mb-4">
                  <div className="h-100">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="sofia-semibold">Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          value={userName}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="sofia-semibold">
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder=""
                          value={email}
                        />
                      </Form.Group>

                      <Form.Group className="mb-5" controlId="formBasicEmail">
                        <Form.Label className="sofia-semibold w-100">
                          Password
                        </Form.Label>
                        <Button
                          variant="primary"
                          type="button"
                          onClick={handleShow}
                          className="mt-2 change-password"
                        >
                          Change Password
                        </Button>
                      </Form.Group>
                    </Form>
                    <h3>Preferences</h3>
                    <div className="timezone w-100 mt-4">
                      <h5>Timezone
                      </h5>
                      {/* <select>
                        <option timeZoneId="1" gmtAdjustment="GMT-0:00" useDaylightTime="0" value="-12">GMT-0:00 </option>
                        <option timeZoneId="1" gmtAdjustment="GMT-0:00" useDaylightTime="0" value="-12">GMT-0:00</option>
                      </select>
                      <h5><b>09:41 GMT</b></h5>  */}

                      <div className="timezone--wrapper">
                        <TimezoneSelect
                          value={tz}
                          onChange={handleTimeZoneChange}
                          timezones={{
                           
                            "America/Lima": "Pittsburgh",
                            "Europe/Berlin": "Frankfurt",
                          }}
                        />
                        <h5>{typeof tz == "string" ? tz : tz.value}
                        </h5>
                      </div>
                    </div>
                    <div className="time-format w-100 mt-4">
                      <h5>Time Format
                      </h5>
                      <Form.Check
                        type="radio"
                        name="checkName"
                        id="check15"
                        className="custom-radio pe-2 d-inline-block"
                      >
                        <Form.Check.Input
                          type="radio"
                          name="checkName"
                          value="12"
                          onChange={(e) => handleTimeFormatChange(e.target.value)}
                          checked={selectedTimeFormat === 12}
                        />
                        <Form.Check.Label for="flexRadioDefault1">
                          12 hour
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check
                        type="radio"
                        name="checkName"
                        id="check16"


                        className="custom-radio pe-2 d-inline-block"
                      >
                        <Form.Check.Input type="radio"
                          checked={selectedTimeFormat === 24}
                          onChange={(e) => handleTimeFormatChange(e.target.value)}
                          value="24" name="checkName" />
                        <Form.Check.Label for="flexRadioDefault1">
                          24 hour
                        </Form.Check.Label>
                      </Form.Check>
                    </div>

                    <div className="time-format w-100 mt-4">
                      <h5>Date Format
                      </h5>
                      <select>
                        <option value="ddd-mm-yyyy"> ddd-mm-yyyy</option>
                        <option value="yyyy-mm-dd"> yyyy-mm-dd</option>
                        <option value=" mm-dd-yyyy"> mm-dd-yyyy</option>
                      </select>
                    </div>

                    <div className="time-format w-100 mt-4 ">
                      <h5>Notifications
                      </h5>
                      <Form.Check
                        type="radio"
                        name="notifications"
                        id="check17"

                        className="custom-radio pe-2 d-inline-block text-white"
                      >
                        <Form.Check.Input type="radio" name="notifications" value="yes" checked={selectedNotifications === 'yes'}
                          onChange={(e) => handleNotificationsChange(e.target.value)}

                        />
                        <Form.Check.Label for="flexRadioDefault1">
                          yes
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check
                        type="radio"
                        name="notifications"
                        className="custom-radio pe-2 d-inline-block text-white"
                      >
                        <Form.Check.Input type="radio" name="notifications" checked={selectedNotifications === 'no'}
                          onChange={(e) => handleNotificationsChange(e.target.value)}
                          value="no" />
                        <Form.Check.Label for="flexRadioDefault1">
                          No
                        </Form.Check.Label>
                      </Form.Check>
                    </div>
                  </div>
                </Col>

                <Col xl={"7"} md={"12"} className="mb-4">
                  <div className=" profile_images">
                    <img className="profile-pic" src="" />
                    <div className="upload-button">
                      <img className="profile-pic" src={profileUrl} />
                    </div>
                    <input
                      className="file-upload"
                      ref={uploadInput}
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={(e) => {
                        uploadProfilePicture(e);
                      }}
                    />
                  </div>
                  <a
                    className="change_profile_text"
                    onClick={changeProfileClick}
                  >
                    Change profile picture
                  </a>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      {/* change password modal  */}
      <Modal show={show} onHide={handleClose} className="account-change-password">
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label className="sofia-semibold">
                Current password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <p className="error_mesage"> {errors.currentPassword} </p>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="sofia-semibold">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <p className="error_mesage"> {errors.newPassword} </p>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="sofia-semibold">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className="error_mesage"> {errors.confirmPassword} </p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <NotificationContainer />
      {loading ? <Loader /> : null}
    </React.Fragment>
  );
};
export default Account;
