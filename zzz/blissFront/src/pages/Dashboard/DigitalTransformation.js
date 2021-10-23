import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import Sidebar from "./../../components/Common/Sidebar";
import Topbar from "./../../components/Common/Topbar";
import BarChart from "./../../components/Dashboard/BarChart";
import Pie from "./../../components/Dashboard/Pie";
import Line from "./../../components/Dashboard/Line";
import './Dashboard.scss';

class DigitalTransformation extends Component {

  render() {
    const sidebar = {
      sidebarSubTitle: [
        {
          "name": "My Dashboard",
          "link": "dashboard",

        },
        {
          "name": "Site 1056 - Feltham...",
          "link": "dashboard-project",
        },
        {
          "name": "Digital Transformation",
          "link": "dashboard-digital-transformation",
        },
      ]
    }
    return (
      <React.Fragment>
        
          <div className="main-sec">
          <Sidebar sidebarTitle={"Dashboards"} sidebar={sidebar} />

            <div className="right-sec">
            
            <div className="top-bar bg-white">
              <Topbar topBarTitle={"Digital Transformation"} />
              <div className="d-flex justify-content-between">
                <h5></h5>
                <div className="mb-2">
                  <Button variant="outline-secondary" type="submit" className="btn-sm">
                    Run Report
                  </Button>
                  <Button variant="outline-secondary" type="submit" className="btn-sm ms-2">
                    Add Widget
                  </Button>
                </div>
              </div>
            </div>

            <div className="right-content-wrap">
                <a className="add-card" href="">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 29.7615V0.713867" stroke="white" stroke-width="4" />
                    <path d="M0.475818 15.2383L29.5234 15.2383" stroke="white" stroke-width="4" />
                  </svg>
                </a>
                <Row className="mb-4">
                  <Col xl={"4"} className="mb-4">
                    <Card className="mb-4">

                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <h3 className="sofia-semibold">Tasks Due (02)</h3>
                          <svg width="40" height="9" viewBox="0 0 40 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="3.86635" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="12.4572" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="21.0499" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <path d="M39.7372 0.776429C39.7372 0.355238 39.4071 0.0137957 39 0.0137959L32.3656 0.0137954C31.9585 0.0137954 31.6285 0.355238 31.6285 0.776428C31.6285 1.19762 31.9585 1.53906 32.3656 1.53906H38.2628V7.64012C38.2628 8.06131 38.5929 8.40276 39 8.40276C39.4071 8.40276 39.7372 8.06131 39.7372 7.64012L39.7372 0.776429ZM32.7712 8.29903L39.5212 1.31569L38.4788 0.237166L31.7288 7.2205L32.7712 8.29903Z" fill="#DBDBDB" />
                          </svg>

                        </div>
                        
                        <hr />
                        <h4 className="sofia-semibold">Create Mockups of poster</h4>
                        <Card.Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum dictumst eget fames laoreet facilisis quis nulla cras lobortis.
                        </Card.Text>
                        <div className="tasks-actions d-flex align-items-center mt-4">
                          <Link to="">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.3224 17L2.92502 16.7807C2.68533 16.6492 2.53394 16.3641 2.53394 16.0572V13.7257H2.5024C1.22826 13.7257 0.1875 12.5125 0.1875 11.0288V2.6896C0.1875 1.20593 1.22826 0 2.50871 0H12.9479C14.2283 0 15.2691 1.20593 15.2691 2.6896V11.0288C15.2691 12.5125 14.2283 13.7184 12.9479 13.7184H6.94298L3.3224 17ZM2.50871 1.60791C1.99148 1.60791 1.57518 2.09028 1.57518 2.6896V11.0288C1.57518 11.6281 1.99148 12.1105 2.50871 12.1105H3.22147C3.61255 12.1105 3.92793 12.4759 3.92793 12.9291V14.4127L6.23022 12.3298C6.38791 12.1909 6.58345 12.1105 6.78529 12.1105H12.9542C13.4714 12.1105 13.8877 11.6281 13.8877 11.0288V2.6896C13.8877 2.09028 13.4714 1.60791 12.9542 1.60791H2.50871Z" fill="#0C1826" />
                            </svg>
                          </Link>
                          <Link to="">
                          <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3081 1.23765C11.76 -0.412549 9.24014 -0.412549 7.68897 1.23765L1.77398 7.54293C1.5902 7.73883 1.5902 8.05426 1.77398 8.24684C1.95775 8.43941 2.25366 8.44273 2.43431 8.24684L8.35242 1.94156C9.50178 0.719679 11.5015 0.719679 12.6477 1.94156C13.8313 3.20328 13.8313 5.25855 12.6477 6.52027L4.38729 15.4254C3.68023 16.1791 2.44989 16.1791 1.74283 15.4254C1.01397 14.6484 1.01397 13.3834 1.74283 12.6064L9.6731 4.05328C9.93786 3.77105 10.3988 3.77105 10.6636 4.05328C10.9377 4.34546 10.9377 4.82027 10.6636 5.10914L3.0635 13.3103C2.90465 13.4797 2.90465 13.8482 3.0635 14.0142C3.24728 14.2101 3.54318 14.2101 3.72384 14.0142L11.3239 5.81304C11.9625 5.13238 11.9625 4.02671 11.3239 3.34605C10.7072 2.68863 9.62949 2.68863 9.00965 3.34605L1.08249 11.9025C-0.00145596 13.058 -0.00145596 14.9738 1.08249 16.1293C1.61201 16.6937 2.31595 16.9992 3.06662 16.9992C3.81728 16.9992 4.52123 16.6937 5.05074 16.1293L13.3112 7.22418C14.8561 5.57398 14.8561 2.88785 13.3081 1.23765Z" fill="#0C1826" />
                          </svg>

                          </Link>
                          <Link to="">
                          <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="2.96875" y1="-2.18557e-08" x2="2.96875" y2="17" stroke="#0C1826" />
                            <path d="M11.4687 5.5L3.21875 10.2631L3.21875 0.73686L11.4687 5.5Z" fill="#0C1826" />
                          </svg>

                        </Link>
                        <Link to="">
                          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.46875 0V7.72414M13.6047 15.4483H6.46875C3.70733 15.4483 1.46875 13.2097 1.46875 10.4483V7.72414M13.6047 15.4483L13.9636 15.9395C14.4388 16.59 15.4688 16.2539 15.4688 15.4483V15.4483M13.6047 15.4483L13.9857 14.9479C14.4646 14.3188 15.4688 14.6576 15.4688 15.4483V15.4483M13.6047 15.4483H15.4688M1.46875 7.72414H11.4688H9.55958M9.55958 7.72414L10.0554 8.31523C10.5356 8.88765 11.4688 8.54809 11.4688 7.80093V7.80093C11.4688 7.10747 10.6468 6.74226 10.1322 7.20703L9.55958 7.72414Z" stroke="#0C1826" />
                          </svg>

                        </Link>
                          <div className="task-status-dropdown px-2">
                            <select id="dropdown" >
                              <option value="1">IN PROGRESS</option>
                              <option value="2">IN REVIEW</option>
                            </select>
                          </div>
                        <Link to="">
                          <svg width="37" height="17" viewBox="0 0 37 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="8.98013" cy="8.5" rx="8.98013" ry="8.5" fill="#8BDCFF" />
                            <ellipse cx="18.4899" cy="8.5" rx="8.98013" ry="8.5" fill="#F96EFC" />
                            <ellipse cx="27.4899" cy="8.5" rx="8.98013" ry="8.5" fill="#FA6164" />
                          </svg>

                        </Link>
                        </div>
                        <hr />
                        <h4 className="sofia-semibold">Create Mockups of poster</h4>
                        <Card.Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum dictumst eget fames laoreet facilisis quis nulla cras lobortis.
                        </Card.Text>
                        <div className="tasks-actions d-flex align-items-center mt-4">
                        <Link to="">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.3224 17L2.92502 16.7807C2.68533 16.6492 2.53394 16.3641 2.53394 16.0572V13.7257H2.5024C1.22826 13.7257 0.1875 12.5125 0.1875 11.0288V2.6896C0.1875 1.20593 1.22826 0 2.50871 0H12.9479C14.2283 0 15.2691 1.20593 15.2691 2.6896V11.0288C15.2691 12.5125 14.2283 13.7184 12.9479 13.7184H6.94298L3.3224 17ZM2.50871 1.60791C1.99148 1.60791 1.57518 2.09028 1.57518 2.6896V11.0288C1.57518 11.6281 1.99148 12.1105 2.50871 12.1105H3.22147C3.61255 12.1105 3.92793 12.4759 3.92793 12.9291V14.4127L6.23022 12.3298C6.38791 12.1909 6.58345 12.1105 6.78529 12.1105H12.9542C13.4714 12.1105 13.8877 11.6281 13.8877 11.0288V2.6896C13.8877 2.09028 13.4714 1.60791 12.9542 1.60791H2.50871Z" fill="#0C1826" />
                            </svg>
                        </Link>
                        <Link to="">
                          <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3081 1.23765C11.76 -0.412549 9.24014 -0.412549 7.68897 1.23765L1.77398 7.54293C1.5902 7.73883 1.5902 8.05426 1.77398 8.24684C1.95775 8.43941 2.25366 8.44273 2.43431 8.24684L8.35242 1.94156C9.50178 0.719679 11.5015 0.719679 12.6477 1.94156C13.8313 3.20328 13.8313 5.25855 12.6477 6.52027L4.38729 15.4254C3.68023 16.1791 2.44989 16.1791 1.74283 15.4254C1.01397 14.6484 1.01397 13.3834 1.74283 12.6064L9.6731 4.05328C9.93786 3.77105 10.3988 3.77105 10.6636 4.05328C10.9377 4.34546 10.9377 4.82027 10.6636 5.10914L3.0635 13.3103C2.90465 13.4797 2.90465 13.8482 3.0635 14.0142C3.24728 14.2101 3.54318 14.2101 3.72384 14.0142L11.3239 5.81304C11.9625 5.13238 11.9625 4.02671 11.3239 3.34605C10.7072 2.68863 9.62949 2.68863 9.00965 3.34605L1.08249 11.9025C-0.00145596 13.058 -0.00145596 14.9738 1.08249 16.1293C1.61201 16.6937 2.31595 16.9992 3.06662 16.9992C3.81728 16.9992 4.52123 16.6937 5.05074 16.1293L13.3112 7.22418C14.8561 5.57398 14.8561 2.88785 13.3081 1.23765Z" fill="#0C1826" />
                          </svg>

                        </Link>
                        <Link to="">
                          <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="2.96875" y1="-2.18557e-08" x2="2.96875" y2="17" stroke="#0C1826" />
                            <path d="M11.4687 5.5L3.21875 10.2631L3.21875 0.73686L11.4687 5.5Z" fill="#0C1826" />
                          </svg>

                        </Link>
                        <Link to="">
                          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.46875 0V7.72414M13.6047 15.4483H6.46875C3.70733 15.4483 1.46875 13.2097 1.46875 10.4483V7.72414M13.6047 15.4483L13.9636 15.9395C14.4388 16.59 15.4688 16.2539 15.4688 15.4483V15.4483M13.6047 15.4483L13.9857 14.9479C14.4646 14.3188 15.4688 14.6576 15.4688 15.4483V15.4483M13.6047 15.4483H15.4688M1.46875 7.72414H11.4688H9.55958M9.55958 7.72414L10.0554 8.31523C10.5356 8.88765 11.4688 8.54809 11.4688 7.80093V7.80093C11.4688 7.10747 10.6468 6.74226 10.1322 7.20703L9.55958 7.72414Z" stroke="#0C1826" />
                          </svg>

                        </Link>
                          <div className="task-status-dropdown px-2">
                            <select id="dropdown" >
                              <option value="1">IN PROGRESS</option>
                              <option value="2">IN REVIEW</option>
                            </select>
                          </div>
                        <Link to="">
                          <svg width="37" height="17" viewBox="0 0 37 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="8.98013" cy="8.5" rx="8.98013" ry="8.5" fill="#8BDCFF" />
                            <ellipse cx="18.4899" cy="8.5" rx="8.98013" ry="8.5" fill="#F96EFC" />
                            <ellipse cx="27.4899" cy="8.5" rx="8.98013" ry="8.5" fill="#FA6164" />
                          </svg>

                        </Link>
                        </div>
                        
                        
                      </Card.Body>
                      <div className="text-center pb-3">
                        <hr />
                        <Button variant="outline-secondary" type="submit" className="btn-xs">
                        View All
                        </Button>
                      </div>
                    </Card>
                    
                    <Card>

                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <h3 className="sofia-semibold">Notifications</h3>
                          <svg width="40" height="9" viewBox="0 0 40 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="3.86635" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="12.4572" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="21.0499" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <path d="M39.7372 0.776429C39.7372 0.355238 39.4071 0.0137957 39 0.0137959L32.3656 0.0137954C31.9585 0.0137954 31.6285 0.355238 31.6285 0.776428C31.6285 1.19762 31.9585 1.53906 32.3656 1.53906H38.2628V7.64012C38.2628 8.06131 38.5929 8.40276 39 8.40276C39.4071 8.40276 39.7372 8.06131 39.7372 7.64012L39.7372 0.776429ZM32.7712 8.29903L39.5212 1.31569L38.4788 0.237166L31.7288 7.2205L32.7712 8.29903Z" fill="#DBDBDB" />
                          </svg>

                        </div>
                        
                        <hr />
                        <Row>
                          <Col xs={"auto"}>
                            <span className="name-badge bg-pink d-flex align-items-center justify-content-center">HT</span>
                          </Col>
                          <Col>
                            <h4 className="mb-1">Reminder to call Jerry at P&R today</h4>
                            <p className="mb-0">Call Jerry Gergich to arrange venue for December’s event</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col xs={"auto"}>
                            <span className="name-badge bg-pink d-flex align-items-center justify-content-center">HT</span>
                          </Col>
                          <Col>
                            <h4 className="mb-1">UX Feedback status update</h4>
                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tames laoreet facilisis quis elit.</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col xs={"auto"}>
                            <span className="name-badge bg-blue d-flex align-items-center justify-content-center">RH</span>
                          </Col>
                          <Col>
                            <h4 className="mb-1">UX Feedback status update</h4>
                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tames laoreet facilisis quis elit.</p>
                          </Col>
                        </Row>
                        <hr />
                        <Row className="mb-3">
                          <Col xs={"auto"}>
                            <span className="name-badge bg-orange d-flex align-items-center justify-content-center">SR</span>
                          </Col>
                          <Col>
                            <h4 className="mb-1">UX Feedback status update</h4>
                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tames laoreet facilisis quis elit.</p>
                          </Col>
                        </Row>
                        
                      </Card.Body>
                    </Card>
                    
                  </Col>
                  
                  <Col xl={"4"} className="mb-4">
                    <Card className="mb-4">

                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <h3 className="sofia-semibold">Digital T...</h3>
                          <svg width="40" height="9" viewBox="0 0 40 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="3.86635" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="12.4572" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="21.0499" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <path d="M39.7372 0.776429C39.7372 0.355238 39.4071 0.0137957 39 0.0137959L32.3656 0.0137954C31.9585 0.0137954 31.6285 0.355238 31.6285 0.776428C31.6285 1.19762 31.9585 1.53906 32.3656 1.53906H38.2628V7.64012C38.2628 8.06131 38.5929 8.40276 39 8.40276C39.4071 8.40276 39.7372 8.06131 39.7372 7.64012L39.7372 0.776429ZM32.7712 8.29903L39.5212 1.31569L38.4788 0.237166L31.7288 7.2205L32.7712 8.29903Z" fill="#DBDBDB" />
                          </svg>

                        </div>

                        <BarChart />

                      </Card.Body>
                    </Card>

                    <Card className="">

                      <Card.Body>
                        <div className="d-flex justify-content-between mb-4">
                          <h3 className="sofia-semibold">Stories Burnup</h3>
                          <svg width="40" height="9" viewBox="0 0 40 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="3.86635" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="12.4572" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="21.0499" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <path d="M39.7372 0.776429C39.7372 0.355238 39.4071 0.0137957 39 0.0137959L32.3656 0.0137954C31.9585 0.0137954 31.6285 0.355238 31.6285 0.776428C31.6285 1.19762 31.9585 1.53906 32.3656 1.53906H38.2628V7.64012C38.2628 8.06131 38.5929 8.40276 39 8.40276C39.4071 8.40276 39.7372 8.06131 39.7372 7.64012L39.7372 0.776429ZM32.7712 8.29903L39.5212 1.31569L38.4788 0.237166L31.7288 7.2205L32.7712 8.29903Z" fill="#DBDBDB" />
                          </svg>

                        </div>

                        <Line />


                      </Card.Body>

                    </Card>
                  </Col>
                  
                  <Col xl={"4"} className="mb-4">
                    <Card className="mb-4">

                      <Card.Body>
                        <div className="d-flex justify-content-between mb-4">
                          <h3 className="sofia-semibold">Resource Allocation</h3>
                          <svg width="40" height="9" viewBox="0 0 40 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="3.86635" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="12.4572" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="21.0499" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <path d="M39.7372 0.776429C39.7372 0.355238 39.4071 0.0137957 39 0.0137959L32.3656 0.0137954C31.9585 0.0137954 31.6285 0.355238 31.6285 0.776428C31.6285 1.19762 31.9585 1.53906 32.3656 1.53906H38.2628V7.64012C38.2628 8.06131 38.5929 8.40276 39 8.40276C39.4071 8.40276 39.7372 8.06131 39.7372 7.64012L39.7372 0.776429ZM32.7712 8.29903L39.5212 1.31569L38.4788 0.237166L31.7288 7.2205L32.7712 8.29903Z" fill="#DBDBDB" />
                          </svg>

                        </div>

                        <Pie />


                      </Card.Body>

                    </Card>
                    
                    <Card className="mb-4">

                      <Card.Body>
                        <div className="d-flex justify-content-between mb-4">
                          <h3 className="sofia-semibold">High-level budget</h3>
                          <svg width="40" height="9" viewBox="0 0 40 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="3.86635" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="12.4572" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="21.0499" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <path d="M39.7372 0.776429C39.7372 0.355238 39.4071 0.0137957 39 0.0137959L32.3656 0.0137954C31.9585 0.0137954 31.6285 0.355238 31.6285 0.776428C31.6285 1.19762 31.9585 1.53906 32.3656 1.53906H38.2628V7.64012C38.2628 8.06131 38.5929 8.40276 39 8.40276C39.4071 8.40276 39.7372 8.06131 39.7372 7.64012L39.7372 0.776429ZM32.7712 8.29903L39.5212 1.31569L38.4788 0.237166L31.7288 7.2205L32.7712 8.29903Z" fill="#DBDBDB" />
                          </svg>

                        </div>
                        
                      
                        <Row className="mb-1">
                          <Col className="h3">
                            Budgeted
                          </Col>
                          <Col className="h3" xs={"auto"}>
                            2,214,000
                          </Col>
                        </Row>
                        <Row className="mb-1">
                          <Col className="h3">
                            Forecast
                          </Col>
                          <Col className="h3 text-success" xs={"auto"}>
                            2,214,000
                          </Col>
                        </Row>
                        <Row className="mb-1">
                          <Col className="h3">
                            Spend to date
                          </Col>
                          <Col className="h3 text-warning" xs={"auto"}>
                            20,000
                          </Col>
                        </Row>
                        <Row className="mb-1">
                          <Col className="h3">
                            Overspend
                          </Col>
                          <Col className="h3 text-primary" xs={"auto"}>
                            0
                          </Col>
                        </Row>
                        
                      </Card.Body>
                      
                    </Card>
                    
                  </Col>
                  
                </Row>
                
              </div>
            </div>
          </div>
        
      </React.Fragment>
    )
  }
}
export default DigitalTransformation;