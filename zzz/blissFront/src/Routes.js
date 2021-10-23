import React from "react";
import { Switch, Route, withRouter ,useLocation} from 'react-router-dom';
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import ResetPassword from "./pages/Account/ResetPassword";
import ForgotPassword from "./pages/Account/ForgotPassword";
import AccountActivate from "./pages/Account/AccountActivate";
import ImpersonationLogin from "./pages/Account/Impersonation";
import Dashboard from "./pages/Dashboard/Dashboard";
import Cards from "./pages/Project/Cards";
import settings from "./pages/Settings/Settings";
import Project from "./pages/Dashboard/Project";
import Account from "./pages/Settings/Account";
import Users from "./pages/Settings/Users";
import Workspacesetting from "./pages/Settings/Workspace";
import Security from "./pages/Settings/Security";
import RecycleBin from "./pages/Settings/RecycleBin";
import ArchivePage from "./pages/Settings/ArchivePage";
import Import from "./pages/Settings/Import";
import Workspace from "./pages/Workspace/CreateWorkSpace";
import SelectWorkspace from "./pages/Workspace/SelectWorkSpace"
import InviteUser from "./pages/Workspace/InviteUser";
import ManageInviteWorkSpace from "./pages/Workspace/ManageInviteWorkSpace"
import DigitalTransformation from "./pages/Dashboard/DigitalTransformation";
import Programs from "./pages//Project/Programs"
import Page404 from "./pages/Page404";
import PrivateRoute from "./HOC/ProtectedRoute/PrivateRoute";
import WorkspaceRoute from "./HOC/ProtectedRoute/WorkspaceRoute";
import PublicRoute from "./HOC/ProtectedRoute/PublicRoute";
import Sidebar from "./components/Common/Sidebar";

function App(props) {
  let location = useLocation();
  console.log("location==",location)
  
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
  const Route = ()=>(
    <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PublicRoute path="/register/:token?" component={Register} />
        <PublicRoute path="/forgotPassword" component={ForgotPassword} />
        <PublicRoute path="/resetPassword/:token" component={ResetPassword} />
        <PublicRoute path="/account/activate/:token" component={AccountActivate} />
        <PublicRoute path="/impersonation/:id" component={ImpersonationLogin} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/cards" component={Cards} />
        <PrivateRoute path="/settings" component={settings} />
        <PrivateRoute path="/account" component={Account} />
        <PrivateRoute path="/user" component={Users} />
        <PrivateRoute path="/workspace" component={Workspacesetting} />
        <PrivateRoute path="/security" component={Security} />
        <PrivateRoute path="/recycle" component={RecycleBin} />
        <PrivateRoute path="/archive-page" component={ArchivePage} />
        <PrivateRoute path="/import" component={Import} />
        <PrivateRoute path="/dashboard-project" component={Project} />
        <PrivateRoute path="/dashboard-digital-transformation" component={DigitalTransformation} />
        <PrivateRoute path="/programs/:projectId?" component={Programs} />
        <WorkspaceRoute path="/createWorkspace" component={Workspace} />
        <WorkspaceRoute path="/selectWorkspace" component={SelectWorkspace} />
        <WorkspaceRoute path="/inviteUser" component={InviteUser} />
        <WorkspaceRoute path="/manageInviteWorkSpace" component={ManageInviteWorkSpace} />
        <Route component={Page404} />
      </Switch>
  )

  return (
    <React.Fragment>
      {location.pathname.includes("register")  || location.pathname.includes("forgotPassword")  || location.pathname.includes("resetPassword")   || location.pathname.includes("impersonation") || location.pathname.includes("createWorkspace")  || location.pathname.includes("selectWorkspace") || location.pathname.includes("inviteUser")  || location.pathname.includes("account/activate")  || location.pathname.includes("manageInviteWorkSpace") || location.pathname === '/'
      ?
      <Route />
      :
      <div className="main-sec">
      <Sidebar 
         sidebarTitle={location.pathname === 'settings'?'Settings': location.pathname === '/dashboard' ?"Dashboards":"Programs"}
         sidebar={(location.pathname === '/settings' ||
          location.pathname === '/account' ||
          location.pathname === '/user' || 
          location.pathname === '/security' || 
          location.pathname === '/recycle'|| 
          location.pathname === '/archive-page'|| 
          location.pathname === '/import' ||
          location.pathname === '/Workspace')?sidebar:{}}
        />
       <Route />
      </div> 
     }
      
       
    </React.Fragment>
  );
}

export default withRouter(App);
