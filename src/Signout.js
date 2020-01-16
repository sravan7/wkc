import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import sha512 from "sha512"
import logo from './logo.svg';
import './App.css';
import { login, incr, signoutAction } from "./actions"
import ShowAll from "./ShowAll";
import styled from "styled-components";
import CustomField from "./CustomFields"
import axios from "axios";
import instance from "./axiosConfig"
import DatePicker from "react-datepicker";
import {Redirect } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
// import { Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import { Form } from "formik";
import * as formValidationSchema from "./ValidationSchema"
import { TextField, Button, InputLabel, FormControl, Box, Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid } from "@material-ui/core"



export default function Signout(){
    const dispatch=useDispatch();
    const [status, setStatus]=useState(false);
    const clearStore=useCallback(()=>(dispatch(signoutAction())),[dispatch])
    const handleClick = ()=>{
        window.localStorage.clear()
        clearStore();
        setStatus(true);
    }
    return ( 
            status?<Redirect to="/" />: <Box as="div" display="flex" justifyContent="flex-end" position left> <Button onClick={handleClick} variant="outlined" color="primary" mr={4} pr={4} >Signout</Button></Box>     
    )
}