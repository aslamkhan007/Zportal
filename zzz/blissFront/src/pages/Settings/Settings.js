import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button, Dropdown, Modal } from 'react-bootstrap';
import Sidebar from "./../../components/Common/Sidebar";
import Topbar from "./../../components/Common/Topbar";
import './Settings.scss';

function Settings() {


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

  return (
    <React.Fragment>
      <div className="main-sec main_setting settings_content">
        {/* <Sidebar sidebarTitle={"Settings"} sidebar={sidebar} /> */}
        <div className="right-sec">
          <div className="top-bar bg-white border-0">
            <Topbar topBarTitle={"General Settings"} />
            <div className="d-flex justify-content-between">
              <h5 className="d-none d-md-inline-block">General Settings General Settings General Settings</h5>
            </div>
          </div>
          <div className="right-content-wrap bg-white h-100 security_permission">
            <div className="mb-4">
              <Card className="h-100 w-full">
                <div className="justify-content-between">
                  <h3 className="sofia-semibold">My Account</h3>
                  <div className="settings-dropdown px-2">
                    <p className="card-text mb-4">Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus nam tincidunt tortor eget nec, a faucibus semper.Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus</p>
                  </div>
                </div>
              </Card>
              <hr></hr>
              <Card className="h-100 w-full mt-4">
                <div className="justify-content-between">
                  <h3 className="sofia-semibold">Users</h3>
                  <div className="settings-dropdown px-2">
                    <p className="card-text mb-4">Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus nam tincidunt tortor eget nec, a faucibus semper.Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus</p>
                  </div>
                </div>
              </Card>
              <hr></hr>
              <Card className="h-100 w-full mt-4">
                <div className="justify-content-between">
                  <h3 className="sofia-semibold">Security and Permissions</h3>
                  <div className="settings-dropdown px-2">
                    <p claclassNamess="card-text mb-4">Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus nam tincidunt tortor eget nec, a faucibus semper.Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus</p>
                  </div>
                </div>
              </Card>
              <hr></hr>
              <Card className="h-100 w-full mt-4">
                <div className="justify-content-between">
                  <h3 className="sofia-semibold">Recycle Bin</h3>
                  <div className="settings-dropdown px-2">
                    <p className="card-text mb-4">Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus nam tincidunt tortor eget nec, a faucibus semper.Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus</p>
                  </div>
                </div>
              </Card>
              <hr></hr>
              <Card className="h-100 w-full mt-4">
                <div className="justify-content-between">
                  <h3 className="sofia-semibold">Import</h3>
                  <div className="settings-dropdown px-2">
                    <p className="card-text mb-4">Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus nam tincidunt tortor eget nec, a faucibus semper.Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus</p>
                  </div>
                </div>
              </Card>
              <hr></hr>
              <Card className="h-100 w-full mt-4">
                <div className="justify-content-between">
                  <h3 className="sofia-semibold">Workspaces</h3>
                  <div className="settings-dropdown px-2">
                    <p className="card-text mb-4">Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus nam tincidunt tortor eget nec, a faucibus semper.Lorem ipsume dolor site amet, consectetur adipiscing elit, Phasellus</p>
                  </div>
                </div>
              </Card>
              <hr></hr>
            </div>


          </div>
        </div>

      </div>

    </React.Fragment>
  )

}
export default Settings;