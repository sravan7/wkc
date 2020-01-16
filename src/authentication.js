import { Route, Redirect, withRouter } from "react-router-dom";
import React from "react";
import Login from "./Login"
const  Authenticate=withRouter(({location})=>{
    console.log(location)
   return(<Login location={location} />)
})
export default Authenticate
   