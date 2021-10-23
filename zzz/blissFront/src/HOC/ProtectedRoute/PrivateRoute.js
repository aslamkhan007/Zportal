import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({component:Component,...rest}) => {
    return <Route {...rest} component={(props)=>{
        const token =localStorage.getItem("blissToken")
        const workspace =localStorage.getItem('userWorkspaceId')
        console.log(workspace,"workspace route");
        if(token && workspace){
            return <Component {...props}/>
        }else if(token && !workspace){
            return <Redirect to={"/createWorkspace"}/>
        }
        else{
            return <Redirect to={"/"}/>
        }
    }}/>
}

export default PrivateRoute



        

