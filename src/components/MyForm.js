import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import sha512 from "sha512"
import logo from '../logo.svg';
import '../App.css';
import { login, incr, put, deleteIt } from "../helpers/actions"
import ShowAll from "./ShowAll";
import styled from "styled-components";
import CustomField from "./CustomFields"
import instance from "../helpers/axiosConfig"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Signout from "./Signout";
import {Redirect, withRouter } from "react-router-dom";
import { Formik, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import { Form } from "formik";
import * as formValidationSchema from "../helpers/ValidationSchema"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField,ExpansionPanel,ExpansionPanelActions, ExpansionPanelSummary ,ExpansionPanelDetails , Button, InputLabel, FormControl, Box, Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid } from "@material-ui/core"
import  Mypick  from "./Mypick";
import CustomDatePicker from "./CustomDatePicker"
import MySelect from "./MySelect"
import DeleteButton from "./DeleteButton"
import axios from "axios";
const parseData = (inp)=>{
    let newdata = inp.map(function (val){ 
      let {id, horse_number, horse_name, color, dob, age_verified, ushja_registered}=val;
      console.log(id, horse_number, horse_name, color, dob, age_verified, ushja_registered);
      age_verified=age_verified?true:false;
      ushja_registered = ushja_registered?true:false;
      return {id, horse_name,horse_number,  color, dob, age_verified, ushja_registered}
    }
    )
}
function MyForm(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [signout, setSignout]=useState(false);
  const [loading, setLoading] = useState(false);
  const update = useCallback((result,index) => dispatch(put(result.data,index)), [dispatch])
  const inc = useCallback(() => dispatch(incr()), [dispatch])
  const handleSignout = ()=>{
    setSignout(true);
  }
  useEffect(() => {
    const fetchData = async (data) => {
      console.log(data)
      if (Object.keys(data).length > 0) {
        const hashed = sha512(data.password);
        // http://dev.api.staller.show/v1/horses
        data["age_verified"] = true;
        console.log(data, "data", props.formData)
        const result =axios({
            method: 'PUT',
            url: `http://dev.api.staller.show/v1/horses/${props.formData.id}`,
            headers: {
              Authorization : `Bearer ${window.localStorage.getItem("accessToken")}`
            },
            data
          })
          console.log(result)
          result.then((response)=>{ setLoading(true); console.log(response); update(parseData(response.data.data), props.index);  }).catch((err)=>{setLoading(false)});
        console.log(result)
        setLoading(true)
        // update(result);
      }
      // setData(result.data);
    };
    fetchData(data);
  }, [data]);
  return (
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"  >
        <Box display="flex" justifyContent="center" alignItems="center" className="myForm-container">
          <Formik
            initialValues={props.formData}
            validationSchema={formValidationSchema.postHorseSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values)
              setData(values);
              // handleSubmit(values)
              setSubmitting(false)

            }}
          >
            {({ values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting }) => (
                <Form id='custom-style'>
                  <CustomField size="small" type="text" name="horse_name" label="Horse Name" />
                  <CustomField type="text" name="horse_number" label="Horse Number" />
                  <Mypick type="radio" Component={Radio} value={"true"} name="age_verified" label="Age Verification" />
                  <Mypick ml={-10} type="checkbox" name="ushja_registered" Component={Checkbox} label="Registration" />
                  <CustomDatePicker type="date" name="dob" onChanging={setFieldValue} />
                  <MySelect name="color" label="Color" />
                  <Button  variant="outlined" color="secondary" type="submit" className="custom-button" disabled={isSubmitting}> Update</Button>
                  <DeleteButton variant="outlined" color="Red" className="custom-button" id={props.formData.id} index={props.index}  />
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </Form>
              )}
          </Formik>
        </Box>
      </Grid>
  );
}

export default MyForm;
