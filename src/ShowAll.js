import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import sha512 from "sha512"
import logo from './logo.svg';
import './App.css';
import {login, incr, get} from "./actions"
import styled from "styled-components";
import CustomField from "./CustomFields"
import axios from "axios";
import instance from  "./axiosConfig"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import  {Form } from "formik"; 
import {TextField, Button,InputLabel, FormControl,   Box,Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid} from "@material-ui/core"
function ShowAll() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const update= useCallback((result)=>dispatch(get(result.data)), [dispatch])
  useEffect(() => {
    const fetchData = async (data) => {
      if(Object.keys(data).length>0){
      data["age_verified"]=true;
      console.log(data,"data")
      await instance.get('/v1/horses').then((response)=>{ setLoading(true); update(response.data); }).catch((err)=>{setLoading(false)});  ;
    //   setLoading(true)
    // update(result);
    }
    };
    fetchData(data);
  }, [data]);
  return (
    <Button onClick={()=>{setData({yes: true})}} disabled={loading} variant="contained" color="primary"  >Show All </Button>
  )
}

export default ShowAll