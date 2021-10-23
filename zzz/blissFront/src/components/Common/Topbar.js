import React, { Component, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Dropdown } from 'react-bootstrap';
import './Topbar.scss';
import { withRouter } from 'react-router'
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceDispatchAction, selectWorkspaceDispatchAction, afterLoginAction ,listProgramAction} from '../../redux/Action';
import * as CONFIG from '../../config.json'



const Topbar = (props) => {
  const [logoUrl, setLogoUrl] = useState("");
  const dispatch = useDispatch();
  const logout = () => {
    const token = localStorage.getItem("blissToken")
    if (token) {
      console.log("hello", token);
      localStorage.removeItem('blissToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
      localStorage.removeItem('userWorkspaceId');
      localStorage.removeItem('userWorkspace');
      localStorage.removeItem('workspace');
      localStorage.removeItem('userWorkspaceObj');
      window.location.href = "/";
    }
  }


  const loginState = useSelector((state) => state.auth);
  const programsState = useSelector((state) => state.programs);
  const workspaceState = useSelector((state) => state.workspace);
  useEffect(() => {
    if (!loginState.authenticate) {
      console.log("in top bar dispath")
      const userWorkspaceObj = localStorage.getItem("userWorkspaceObj")
      const userWorkspace = JSON.parse(userWorkspaceObj)
      console.log("userWorkspace", userWorkspace)
      dispatch(selectWorkspaceDispatchAction(userWorkspace));
      dispatch(getWorkspaceDispatchAction());
      dispatch(afterLoginAction())
    }
    setLogo()
  }, [loginState])

  useEffect(() => {
    if (!programsState.programsDataStatus) {
      const workspaceId = workspaceState && workspaceState.selectedWorkspace && workspaceState.selectedWorkspace._id?workspaceState.selectedWorkspace._id:''
      if(workspaceId)
      {
        dispatch(listProgramAction(workspaceId))
      }
      
    }
  }, [workspaceState])

  

  const setLogo = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.profile_img && user.profile_img !== null) {
      setLogoUrl(`${CONFIG.API_URL}/uploads/profile/${user.profile_img}`)
    }
  }
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="top-bar-title mt-20">
          <h3 className="mb-0 sofia-semibold text-truncate">{props.topBarTitle}</h3>
        </div>

        <div className="d-flex align-items-center mb-2 ">
          <h4 className="mb-0 pe-3 sofia-semibold d-none d-lg-inline-block">10 Dec 09:41 GMT</h4>
          <Form.Group className="topbar-search mb-0 d-none d-lg-inline-block" controlId="formBasicPassword">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20L11.25 11.25" stroke="#0C1826" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="10" cy="10" r="6.07107" transform="rotate(-45 10 10)" fill="white" stroke="#0C1826" stroke-width="2" />
            </svg>

            <Form.Control type="text" placeholder="Search" />
          </Form.Group>
          <Link to="" className="mx-3 head-notify">
            <svg width="33" height="39" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.883 32.8949L30.0498 28.2442C28.7414 26.0976 28.0499 23.6389 28.0499 21.1364V17.0625C28.0499 11.9194 24.565 7.56928 19.7996 6.16687V3.25003C19.7996 1.45763 18.3195 0 16.4994 0C14.6794 0 13.1993 1.45763 13.1993 3.25003V6.16687C8.43396 7.56928 4.94902 11.9194 4.94902 17.0625V21.1364C4.94902 23.6389 4.25762 26.0959 2.95077 28.2425L0.117631 32.8933C-0.0358247 33.1452 -0.0391505 33.4572 0.107731 33.7123C0.254613 33.9674 0.526873 34.1251 0.823885 34.1251H32.1751C32.4721 34.1251 32.746 33.9675 32.8929 33.714C33.0397 33.4604 33.0348 33.1451 32.883 32.8949Z" fill="#0C1826" />
              <path d="M11.3037 35.75C12.2343 37.6643 14.2045 39 16.4997 39C18.7949 39 20.7652 37.6643 21.6958 35.75H11.3037Z" fill="#0C1826" />
            </svg>
          </Link>
          <Dropdown className="auth-dropdown">
            <Dropdown.Toggle id="dropdown-basic" className="d-flex align-items-center">
              {/* <span className="name-badge bg-pink d-flex align-items-center justify-content-center"> </span> */}<img width="50" src={logoUrl} alt="" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              <Dropdown.Item onClick={(e) => logout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  )

}
export default withRouter(Topbar)