import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
const Footer = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({email:'',password:''});


  useEffect(async()=>{

  },[]);

    return (
      <footer className="footer">
      <div className="container-fluid">
        <div className="row text-muted">
          <div className="col-6 text-start">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a className="text-muted" href="#">Support</a>
              </li>
              <li className="list-inline-item">
                <a className="text-muted" href="#">Help Center</a>
              </li>
              <li className="list-inline-item">
                <a className="text-muted" href="#">Privacy</a>
              </li>
              <li className="list-inline-item">
                <a className="text-muted" href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="col-6 text-end">
            <p className="mb-0">
              © 2021 - <Link to="/" className="text-muted">Client Panel</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;