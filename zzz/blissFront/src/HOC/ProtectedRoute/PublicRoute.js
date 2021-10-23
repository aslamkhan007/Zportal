import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({component:Component,...rest}) => {
    return <Route {...rest} component={(props)=>{
        const token =localStorage.getItem("blissToken")
        if(token){
            return <Redirect to={"/dashboard"}/>
        }else{
            return <Component {...props}/>
        }
    }}/>
}

export default PublicRoute



        

