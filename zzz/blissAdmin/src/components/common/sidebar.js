import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { userContext } from "../../context/userContext";
import * as CONFIG from "../../config.json";

const Sidebar = (props) => {
  var user_data = JSON.parse(localStorage.getItem("userData"));

  var context = useContext(userContext);

  useEffect(async () => {
    if (user_data) {
      context.UpdateUserContext(user_data);
    }
  }, []);

  const onToggle = async () => {
    $("#pages").toggleClass("show");
  };

  const active = props.location_props.location.pathname;
  return (
    <nav id="sidebar" className="sidebar">
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to="/">
          <span className="align-middle me-3">
            {context.user.role == 2
              ? `${CONFIG.A_TITLE} Panel`
              : `${CONFIG.C_TITLE} Panel`}
          </span>
        </Link>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>
          <li
            className={active == "/" ? "sidebar-item active" : "sidebar-item"}
          >
            <Link to="/" className="sidebar-link">
              <i className="align-middle fa fa-sliders-h" />{" "}
              <span className="align-middle">Dashboards</span>
            </Link>
          </li>

          <li
            className={
              active == "/users" || active == "/add-users"
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <a
              data-bs-toggle="collapse"
              className="sidebar-link collapsed"
              onClick={() => {
                onToggle();
              }}
            >
              <i className="align-middle fa fa-user" />{" "}
              <span className="align-middle">Users</span>
            </a>
            <ul
              id="pages"
              className={
                active == "/users" || active == "/add-user"
                  ? "sidebar-dropdown list-unstyled collapse show"
                  : "sidebar-dropdown list-unstyled collapse"
              }
              data-bs-parent="#sidebar"
            >
              <li
                className={
                  active == "/users" ? "sidebar-item active" : "sidebar-item"
                }
              >
                <Link className="sidebar-link" to="/users">
                  Users list
                </Link>
              </li>
              <li
                className={
                  active == "/add-user" ? "sidebar-item active" : "sidebar-item"
                }
              >
                <Link className="sidebar-link" to="/add-user">
                  Add User
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
