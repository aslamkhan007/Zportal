import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/userApi";
import * as CONFIG from "../../config.json";
import { CreateNotification } from "../../Utils/notification";

const Login = (props) => {
 



  useEffect(async()=>{
    props.history.push('/login')
  },[]);

    return (
      <></>
    );
};

export default Login;