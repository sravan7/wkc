import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {login, incr, get} from "../helpers/actions"
import instance from  "../helpers/axiosConfig"
// import { Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import  {Form } from "formik"; 
// import axios from "axios";
import * as axios from 'axios';

import {TextField, Button,InputLabel, FormControl,   Box,Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid} from "@material-ui/core"
const parseData = (inp)=>{
let newdata = inp.map(function (val){ 
  let {id, horse_number, horse_name, color, dob, age_verified, ushja_registered}=val;
  console.log(id, horse_number, horse_name, color, dob, age_verified, ushja_registered);
  age_verified=age_verified?"true":"false";
  ushja_registered = ushja_registered?true:false;
  return {id, horse_name,horse_number,  color, dob, age_verified, ushja_registered}
}
)
return newdata;
}
function ShowAll(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const update= useCallback((result)=>dispatch(get(result)), [dispatch])
  useEffect(() => {
    const fetchData = async (data) => {
      if(Object.keys(data).length>0){
      data["age_verified"]=true;
      console.log(data,"data")
      const result =axios({
          method: 'GET',
          url: 'http://dev.api.staller.show/v1/horses',
          headers: {
            Authorization : `Bearer ${window.localStorage.getItem("accessToken")}`
          }
        })
        console.log(result)
        result.then((response)=>{ setLoading(true); console.log(response); update(parseData(response.data.data));  }).catch((err)=>{setLoading(false)})
    }
    };
    fetchData(data);
  }, [data]);
  return (
    <Button onClick={()=>{setData({yes: true})}} disabled={!props.enable} variant="contained" color="primary"  >Show All </Button>
  )
}

export default ShowAll