import React, { useState, useEffect,useContext } from "react";
import {
  userContext,
} from "../../context/userContext";
import * as CONFIG from "../../config.json";
import { Link} from "react-router-dom";
import $ from "jquery";

const Header = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({email:'',password:''});
  var  context = useContext(userContext);
  var user_data =  JSON.parse(localStorage.getItem('userData'));


  useEffect(async()=>{
    
    if(user_data)
    {
      context.UpdateUserContext(user_data);

    }
  },[]);

  const handleLogout = async() => {
     localStorage.clear();
    window.location.href = "/login";


  }
  const onToggleSidebar = async() => {
  console.log('hellooo');
    $("#sidebar").toggleClass("collapsed");

 }

 
 const onToggleProfile = async() => {
    $("#profile_toggle").toggleClass("show");

 }
 
  
    return (
      <nav className="navbar navbar-expand navbar-light navbar-bg">
          <a className="sidebar-toggle" onClick={()=>{onToggleSidebar()}}>
            <i className="hamburger align-self-center" />
          </a>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav navbar-align">
              <li className="nav-item dropdown">
                <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                  <i className="align-middle" data-feather="settings" />
                </a>
                <a onClick={()=>{onToggleProfile()}} className="nav-link dropdown-toggle d-none d-sm-inline-block" data-bs-toggle="dropdown">
                  <img src={`${CONFIG.API_URL}/uploads/${context.user.profile_img}`} className="avatar img-fluid rounded-circle me-1" alt="Chris Wood" /> <span className="text-dark">{context.user.first_name} {context.user.last_name}</span>
                </a>
                <div onClick={()=>{onToggleProfile()}} id="profile_toggle" className="dropdown-menu dropdown-menu-end">
                  <Link  className="dropdown-item" to="/profile"><i className="align-middle me-1 fa fa-user"  />
                    Profile</Link>
                    <Link  className="dropdown-item" to="/change-password"><i className="align-middle me-1 fa fa-cogs"  />Setting</Link>
               
                  <a  onClick={()=>{handleLogout()}} className="dropdown-item"><i className="align-middle me-1 fa fa-sign-out" />
                    Sign out</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
  );
};

export default Header;