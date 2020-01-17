import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { login, incr, signoutAction } from "../helpers/actions"
import styled from "styled-components";
import CustomField from "./CustomFields"
import axios from "axios";
import instance from "../helpers/axiosConfig"
import DatePicker from "react-datepicker";
import {Redirect, withRouter } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
// import { Form } from "react-bootstrap";
import * as formValidationSchema from "../helpers/ValidationSchema"
import { TextField, Button, InputLabel, FormControl, Box, Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid } from "@material-ui/core"



const Signout= (props)=>{
    const dispatch=useDispatch();
    const [status, setStatus]=useState(false);
    const clearStore=useCallback(()=>(dispatch(signoutAction())),[dispatch])
    const handleClick = ()=>{
        window.localStorage.clear()
        window.location.reload();
        clearStore();
        setStatus(true);
    }
    console.log(status)
    // onClick={props.handleSignout}
    return ( 
           status?<Redirect to="/" />:<Box as="div" display="flex" justifyContent="flex-end" > <Button onClick={handleClick} variant="outlined" color="primary" mr={4} pr={4} >Signout</Button></Box>     
    )
}
export default Signout