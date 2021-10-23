import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/userApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";
import Header from '../common/header';
import Sidebar from '../common/sidebar';
import Footer from '../common/footer';

const Dashboard = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({});


  useEffect(async()=>{

  },[]);

    return (
   
      
       
          <div className="container-fluid p-0">
            <div className="row mb-2 mb-xl-3">
              <div className="col-auto d-none d-sm-block">
                <h3>Dashboard</h3>
              </div>
              {/* <div className="col-auto ms-auto text-end mt-n1">
                <div className="dropdown me-2 d-inline-block">
                  <a className="btn btn-light bg-white shadow-sm dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-display="static">
                    <i className="align-middle mt-n1" data-feather="calendar" /> Today
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <h6 className="dropdown-header">Settings</h6>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#">Separated link</a>
                  </div>
                </div>
                <button className="btn btn-primary shadow-sm">
                  <i className="align-middle" data-feather="filter">&nbsp;</i>
                </button>
                <button className="btn btn-primary shadow-sm">
                  <i className="align-middle" data-feather="refresh-cw">&nbsp;</i>
                </button>
              </div> */}
            </div>
           
            {/* <div className="card flex-fill">
              <div className="card-header">
                <div className="card-actions float-end">
                  <div className="dropdown show">
                    <a href="#" data-bs-toggle="dropdown" data-bs-display="static">
                      <i className="align-middle" data-feather="more-horizontal" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <h5 className="card-title mb-0">Latest Projects</h5>
              </div>
              <table id="datatables-dashboard-projects" className="table table-striped my-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="d-none d-xl-table-cell">Start Date</th>
                    <th className="d-none d-xl-table-cell">End Date</th>
                    <th>Status</th>
                    <th className="d-none d-md-table-cell">Assignee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Project Apollo</td>
                    <td className="d-none d-xl-table-cell">01/01/2018</td>
                    <td className="d-none d-xl-table-cell">31/06/2018</td>
                    <td><span className="badge bg-success">Done</span></td>
                    <td className="d-none d-md-table-cell">Carl Jenkins</td>
                  </tr>
                  <tr>
                    <td>Project Fireball</td>
                    <td className="d-none d-xl-table-cell">01/01/2018</td>
                    <td className="d-none d-xl-table-cell">31/06/2018</td>
                    <td><span className="badge bg-danger">Cancelled</span></td>
                    <td className="d-none d-md-table-cell">Bertha Martin</td>
                  </tr>
                  <tr>
                    <td>Project Hades</td>
                    <td className="d-none d-xl-table-cell">01/01/2018</td>
                    <td className="d-none d-xl-table-cell">31/06/2018</td>
                    <td><span className="badge bg-success">Done</span></td>
                    <td className="d-none d-md-table-cell">Stacie Hall</td>
                  </tr>
                  <tr>
                    <td>Project Nitro</td>
                    <td className="d-none d-xl-table-cell">01/01/2018</td>
                    <td className="d-none d-xl-table-cell">31/06/2018</td>
                    <td><span className="badge bg-warning">In progress</span></td>
                    <td className="d-none d-md-table-cell">Carl Jenkins</td>
                  </tr>
                  <tr>
                    <td>Project Phoenix</td>
                    <td className="d-none d-xl-table-cell">01/01/2018</td>
                    <td className="d-none d-xl-table-cell">31/06/2018</td>
                    <td><span className="badge bg-success">Done</span></td>
                    <td className="d-none d-md-table-cell">Bertha Martin</td>
                  </tr>
                  <tr>
                    <td>Project X</td>
                    <td className="d-none d-xl-table-cell">01/01/2018</td>
                    <td className="d-none d-xl-table-cell">31/06/2018</td>
                    <td><span className="badge bg-success">Done</span></td>
                    <td className="d-none d-md-table-cell">Stacie Hall</td>
                  </tr>
                  <tr>
                    <td>Project Romeo</td>
                    <td className="d-none d-xl-table-cell">01/01/2018</td>
                    <td className="d-none d-xl-table-cell">31/06/2018</td>
                    <td><span className="badge bg-success">Done</span></td>
                    <td className="d-none d-md-table-cell">Ashley Briggs</td>
                  </tr>
                  <tr>
                    <td>Project Wombat</td>
                    <td className="d-none d-xl-table-cell">01/01/2018</td>
                    <td className="d-none d-xl-table-cell">31/06/2018</td>
                    <td><span className="badge bg-warning">In progress</span></td>
                    <td className="d-none d-md-table-cell">Bertha Martin</td>
                  </tr>
                  <tr>
                    <td>Project Zircon</td>
                    <td className="d-none d-xl-table-cell">01/01/2018</td>
                    <td className="d-none d-xl-table-cell">31/06/2018</td>
                    <td><span className="badge bg-danger">Cancelled</span></td>
                    <td className="d-none d-md-table-cell">Stacie Hall</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        
        
    
        
    
    );
};

export default Dashboard;