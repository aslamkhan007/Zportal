import React, { Component,Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button, Dropdown, Modal, ProgressBar } from 'react-bootstrap';
import Sidebar from "./../../components/Common/Sidebar";
import Jira from "../../assets/images/jira.png";
import clickup from "../../assets/images/clickup.png";
import trello from "../../assets/images/trello.png";
import asana from "../../assets/images/asana.png";
import Topbar from "./../../components/Common/Topbar";
import './Settings.scss';
import ModalPopup from './../../components/Settings/import_popup';

class Import extends Component {
  // for popup
  constructor() {

    const now = 60;
    const progressInstance = <ProgressBar now={now} label={`${now}%`} />;

    super();
    this.state = {
      showModalPopup: false,
    }
  }
  isShowPopup = (status) => {
    this.setState({ showModalPopup: status });
    this.state = { showing: true };
  };

  // end popup
  render() {
    
    const { showing } = this.state;
    

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
        <div className="main-sec main_setting account_mein import">
          {/* <Sidebar sidebarTitle={"Settings"} sidebar={sidebar} /> */}
          <div className="right-sec">
            <div className="top-bar bg-white border-0">
              <Topbar topBarTitle={"Import"} />
              <div className="d-flex justify-content-between mt-3">
                <h5 className="d-none d-md-inline-block">Message about import.</h5>
              </div>
            </div>
            <div className="right-content-wrap account-form-sec bg-white  h-100">
              <Row className="mb-4 mt-4">
                <Col xl={"12"} md={"12"} className="mb-4">
                  <div className="h-100">
                    <Form>
                      <Fragment>
                        <Fragment>
                          <div className="popup_import" onClick={() => this.isShowPopup(true)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              
                              <Button onClick={() => this.setState({ showing: !showing })} variant="primary" type="button" className="mt-2 import_button_first">Import</Button>
                        </Form.Group>
                          </div>
                        </Fragment>
                        <ModalPopup showModalPopup={this.state.showModalPopup} onPopupClose={this.isShowPopup} ></ModalPopup>
                        </Fragment>
      
                      <h5 className="d-md-inline-block mt-5 mb-4">Message about import.</h5>
                    </Form>
                    <hr></hr>
                    <Col xl={"12"} md={"6"} className="mb-4 h-25">
                      
                      <h5 className="d-md-inline-block mt-1 mb-4 w-100">Import In progress:</h5>
                      {
                        this.state.showModalPopup === false && this.state.showing === true ? (
                          <div className="progress_import_pop" style={{ display: (showing ? 'block' : 'none') }}>
                            <img src={Jira} />
                            <span>
                              <p>Importing...</p>
                              <label>Time remaning (maybe something like this) <span>54%</span></label>
                              <ProgressBar variant="success" now={54} />
                            </span>
                          </div>
                        ) : null
                      }

                      
                      
                      
                    </Col>
                    <Col xl={"2"} md={"6"} className="mb-4">
                      <hr></hr>
                    </Col>
                  


                    <Row className="mb-4 import_logo">
                      <Col xl={"2"} md={"6"} className="mb-4 center_import h-100">
                        <div class="justify-content-between text-center">
                          <img src={Jira} />
                          <h6 class="sofia-semibold text-success">Import Complete</h6>
                          <div className="settings-dropdown px-2">
                            <p class="card-text text-center">Imported:07/03/ 12:20Pm</p>
                            <Button variant="primary" type="submit" className=" mt-2">Remove</Button>
                          </div>
                        </div>
                      </Col>
                      <Col xl={"2"} md={"6"} className=" mb-4 h-100">
                        <div class="justify-content-between text-center">
                          <img src={clickup} />
                          <h6 class="sofia-semibold text-success">Import Complete</h6>
                          <div className="settings-dropdown px-2">
                            <p class="card-text text-center">Imported:07/03/ 12:20Pm</p>
                            <Button variant="primary" type="submit" className=" mt-2"> Remove</Button>
                          </div>
                        </div>
                      </Col>
                      <Col xl={"2"} md={"6"} className=" mb-4 h-100">
                        <div class="justify-content-between text-center">
                          <img src={trello} />
                          <h6 class="sofia-semibold text-success">Import Complete</h6>
                          <div className="settings-dropdown px-2">
                            <p class="card-text text-center">Imported:07/03/ 12:20Pm</p>
                            <Button variant="primary" type="submit" className=" mt-2">Remove</Button>
                          </div>
                        </div>
                      </Col>
                      <Col xl={"2"} md={"6"} className=" mb-4 h-100">
                        <div class="justify-content-between text-center">
                          <img src={asana} />
                          <h6 class="sofia-semibold text-success">Import Complete</h6>
                          <div className="settings-dropdown px-2">
                            <p class="card-text text-center">Imported:07/03/ 12:20Pm</p>
                            <Button variant="primary" type="submit" className=" mt-2">Remove</Button>
                          </div>
                        </div>
                      </Col>
                    </Row>

                  </div>
                </Col>
              </Row>
            </div>
          </div>

        </div>

      </React.Fragment>
    )
  }
}
export default Import;