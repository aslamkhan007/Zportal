import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button, Dropdown, Modal } from 'react-bootstrap';
import Sidebar from "./../../components/Common/Sidebar";
import Topbar from "./../../components/Common/Topbar";
import './Settings.scss';

function Security() {


  const sidebar = {
    userBoard: true,
    sidebarSubTitle: [
      {
        "name": "General Settings",
        "link": "settings",

      },
      {
        "name": "My Account",
        "link": "account",
      },
      {
        "name": "Users",
        "link": "user",
      },
      {
        "name": "Security and Permissions",
        "link": "security",
      },
      
      {
        "name": "Recycle Bin",
        "link": "recycle",
      },
      {
        "name": "Archive",
        "link": "archive-page",
      },
      {
        "name": "Import",
        "link": "import",
      },
      {
        "name": "Workspace",
        "link": "Workspace",
      },
    ]
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <div className="main-sec main_setting">
        {/* <Sidebar sidebarTitle={"Settings"} sidebar={sidebar} /> */}
        <div className="right-sec">
          <div className="top-bar bg-white border-0">
            <Topbar topBarTitle={"Security and Permissions"} />
            <div className="d-flex justify-content-between mt-3">
              <h5 className="d-none d-md-inline-block">General Settings General Settings General Settings</h5>
            </div>
          </div>
          <div className="right-content-wrap bg-white h-100 security_permission">
            <div className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <div class="justify-content-between">
                      <h3 class="sofia-semibold">My Account</h3>
                      <div className="settings-dropdown px-2">
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum dictumst eget fames laoreet facilisis quis nulla cras lobortis.</p>
                      </div>
                    </div>
                  </Card.Body>
              </Card>
              <hr></hr>
                <Card className="h-100">
                  <Card.Body>
                    <div class="justify-content-between">
                      <h3 class="sofia-semibold">Users</h3>
                      <div className="settings-dropdown px-2">
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum dictumst eget fames laoreet facilisis quis nulla cras lobortis.</p>
                      </div>
                    </div>
                  </Card.Body>
              </Card>
              <hr></hr>
                <Card className="h-100">
                  <Card.Body>
                    <div class="justify-content-between">
                      <h3 class="sofia-semibold">Security and Permissions</h3>
                      <div className="settings-dropdown px-2">
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum dictumst eget fames laoreet facilisis quis nulla cras lobortis.</p>
                      </div>
                    </div>
                  </Card.Body>
              </Card>
              <hr></hr>
                <Card className="h-100">
                  <Card.Body>
                    <div class="justify-content-between">
                      <h3 class="sofia-semibold">Recycle Bin</h3>
                      <div className="settings-dropdown px-2">
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum dictumst eget fames laoreet facilisis quis nulla cras lobortis.</p>
                      </div>
                    </div>
                  </Card.Body>
              </Card>
              <hr></hr>
            </div>


          </div>
        </div>

      </div>

    </React.Fragment>
  )

}
export default Security;