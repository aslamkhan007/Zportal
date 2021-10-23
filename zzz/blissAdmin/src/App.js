import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import BeforeLoginRoute from "./components/common/BeforeLoginRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import Login from "./components/Login/Login";
import Forgot from "./components/Login/forgot";
import Reset from "./components/Login/reset";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/profile";
import editProfile from "./components/Profile/editProfile";
import changePassword from "./components/Profile/changePassword";
import Layout from "./components/common/Layout";
import './css/custom.css';
import {userContext} from "./context/userContext";
import Users from "./components/Users/users";
import AddUser from "./components/Users/addUser";
import EditUser from "./components/Users/editUser";
// import Collaborator from "./components/Collaborator/Collaborator";
// import AddCollaborator from "./components/Collaborator/addCollaborator";
// import EditCollaborator from "./components/Collaborator/editCollaborator";
// import Facility from "./components/Facility/Facility";
// import addFacility from "./components/Facility/addfacility";
// import EditFacility from "./components/Facility/EditFacility";
// import Report from "./components/co2Report/report";
// import AddReport from "./components/co2Report/addCo2";



const App = (props) => {
  const [user, setUser] = useState({first_name:"",
  last_name:"",
  email:"",
  profile_img:""});
  const [data, setData] = useState({});
  const UpdateUserContext = (data) => {
    
    setUser(data);
  };
  useEffect(async()=>{
  var user_data =  JSON.parse(localStorage.getItem('userData'));
    
    if(user_data)
    {
      setData(user_data);

    }
  },[]);
  
  return (
    
    <userContext.Provider
    value={{
      user: user,
      UpdateUserContext: UpdateUserContext,
    }}
  >
  <Router>
    <ReactNotification />
     <ScrollToTop>
      <Switch>
      <BeforeLoginRoute
      exact
      path="/login"
      component={Login}
      />
      <BeforeLoginRoute
      exact
      path="/forgot"
      component={Forgot}
      />
      <BeforeLoginRoute
      exact
      path="/reset/:user_id/:pw_token"
      component={Reset}
      />
      <Layout location_props={props}>
      <PrivateRoute
        exact
        path="/"
        component={Dashboard}
      />
      <PrivateRoute
        exact
        path="/profile"
        component={Profile}
      />
      <PrivateRoute
        exact
        path="/change-password"
        component={changePassword}
      />
      
      <PrivateRoute
        exact
        path="/users"
        component={Users}
      />
      <PrivateRoute
        exact
        path="/add-user"
        component={AddUser}
      />
      <PrivateRoute
        exact
        path="/edit-user/:id"
        component={EditUser}
      />
      
      
    </Layout>
      </Switch>
  </ScrollToTop>
</Router>
</userContext.Provider>
  );
}

export default App;
