import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const WorkspaceRoute = ({component:Component,...rest}) => {
    return <Route {...rest} component={(props)=>{
        const token =localStorage.getItem("blissToken")
        if(token){
            return <Component {...props}/>
        }
        else{
            console.log("hello");
            return <Redirect to={"/"}/>
        }
    }}/>
}

export default WorkspaceRoute



        

