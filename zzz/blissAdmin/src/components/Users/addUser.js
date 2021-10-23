import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/userApi";
import { CreateNotification } from "../../Utils/notification";
const Dashboard = (props) => {
  let userData = JSON.parse(localStorage.getItem("userData"));

  const [error, setError] = useState({});
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");

  const isFormValid = () => {
    const domain_regx = /^[A-Za-z0-9-]+$/;
    if (message) {
      CreateNotification("danger", message);
    } else {
      var regex_email =
        /^(([^!<>#$%^&*()[\]\\.,;:\s@\"]+(\.[^#$%^&*!<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!data.first_name) {
        setError({ first_name: "First name is required!" });
        return false;
      } else if (!data.last_name) {
        setError({ last_name: "Last name is required!" });
        return false;
      } else if (!data.email) {
        setError({ email: "Email is required!" });
        return false;
      } else if (data.email && !data.email.match(regex_email)) {
        setError({ email: "Enter a valid email" });
        CreateNotification("danger", "Please enter a valid email!");
        return false;
      }else {
        setError({});
        return true;
      }
    }
  };
  const handleSubmit = async () => {
    const isValid = await isFormValid();

    if (isValid) {
      const Response = await USERAPI.CreateTeamAPI(data);
      if (Response.data.status == 200) {
        CreateNotification("success", "User added Successfully.");
        props.history.push("/users");
      } else if (Response.data.status == 401) {
        CreateNotification("danger", "Session has been expired!");
        localStorage.clear();
        props.history.push("/login");
      } else {
        CreateNotification("danger", Response.data.message);
      }
    }

    // props.history.push('/')
  };

  const onchange = async (event) => {
    setError({});
    const value = event.target.value.trimStart().replace(/ {2,}/g, " ");
    const name = event.target.name;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container-fluid p-0">
      <h1 className="h3 mb-3">Add User</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            {/* <div className="card-header">
            <h5 className="card-title">Form row</h5>
            <h6 className="card-subtitle text-muted">Bootstrap column layout.</h6>
          </div> */}
            <div className="card-body">
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    onChange={(e) => {
                      onchange(e);
                    }}
                    className="form-control"
                  />
                  <span class="form-error">{error.first_name}</span>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    onChange={(e) => {
                      onchange(e);
                    }}
                    className="form-control"
                  />
                  <span class="form-error">{error.last_name}</span>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => {
                      onchange(e);
                    }}
                    className="form-control"
                  />
                  <span class="form-error">{error.email}</span>
                </div>
                
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
