import React, { useState, useEffect,useContext } from "react";
import * as CONFIG from "../../config.json";

import Header from '../common/header';
import Sidebar from '../common/sidebar';
import Footer from '../common/footer';
import { Helmet } from 'react-helmet'
import {
  userContext,
} from "../../context/userContext";

const Dashboard = (props) => {
  var user_data =  JSON.parse(localStorage.getItem('userData'));

  var  context = useContext(userContext);
  const [error, setError] = useState({});
  const [data, setData] = useState({email:'',password:''});


  useEffect(async()=>{
    if(user_data)
    {
      context.UpdateUserContext(user_data);

    }
  },[]);
console.log(props,'props1')
    return (
      <>
      <Helmet>
      <title>{context.user.role == 2?`${CONFIG.A_TITLE} - Profile`:`${CONFIG.C_TITLE} - Profile`}</title>

        </Helmet>
      <div className="wrapper">
      <Sidebar location_props={props}/>
      <div className="main">
       <Header location_props={props}/>
       <main className="content">
       {props.children}
      
          </main>
        <Footer/>
        </div>
      </div>
     </>
    );
};

export default Dashboard;