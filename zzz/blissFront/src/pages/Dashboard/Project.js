import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import Sidebar from "./../../components/Common/Sidebar";
import Topbar from "./../../components/Common/Topbar";
import BarChart from "./../../components/Dashboard/BarChart";
import BarChartProject from "./../../components/Dashboard/BarChartProject";
import Doughnut from "./../../components/Dashboard/Doughnut";
import Line from "./../../components/Dashboard/Line";
import './Dashboard.scss';

class Project extends Component {

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
              <Topbar topBarTitle={"Site 1056 - Feltham TW14 9LL"} />
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
                  <Col lg={"4"} className="mb-4">
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
                    
                    
                      <Card className="">

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

                          <Doughnut />


                        </Card.Body>

                      </Card>
                    
                    
                    
                    
                  </Col>
                  <Col lg={"8"}>
                    <Card className="mb-4">
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <h3 className="sofia-semibold">Site 1056 - Feltham...</h3>
                          <svg width="40" height="9" viewBox="0 0 40 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="3.86635" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="12.4572" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <ellipse cx="21.0499" cy="4" rx="3.86635" ry="4" fill="#DBDBDB" />
                            <path d="M39.7372 0.776429C39.7372 0.355238 39.4071 0.0137957 39 0.0137959L32.3656 0.0137954C31.9585 0.0137954 31.6285 0.355238 31.6285 0.776428C31.6285 1.19762 31.9585 1.53906 32.3656 1.53906H38.2628V7.64012C38.2628 8.06131 38.5929 8.40276 39 8.40276C39.4071 8.40276 39.7372 8.06131 39.7372 7.64012L39.7372 0.776429ZM32.7712 8.29903L39.5212 1.31569L38.4788 0.237166L31.7288 7.2205L32.7712 8.29903Z" fill="#DBDBDB" />
                          </svg>

                        </div>

                        <BarChartProject />

                      </Card.Body>
                    </Card>
                    
                  <Row>
                    <Col lg={"6"} className="mb-4">
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
                    <Col lg={"6"} className="mb-4">
                      <Card className="">

                        <Card.Body>
                          <div className="d-flex justify-content-between mb-4">
                            <h3 className="sofia-semibold">Site 1056...</h3>
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
                    </Col>
                  </Row>
                    
                  </Col>
                </Row>
                
              </div>
            </div>
          </div>
        
      </React.Fragment>
    )
  }
}
export default Project;