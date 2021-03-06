import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import sha512 from "sha512"
import logo from '../logo.svg';
import '../App.css';
import { login, post } from "../helpers/actions"
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
import axios from "axios";
import CustomDatePicker from "./CustomDatePicker"
import MySelect from "./MySelect"
import MyForm from "./MyForm"

function App() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [signout, setSignout]=useState(false);
  const [loading, setLoading] = useState(true);
  const horseData = useSelector((state) =>{ return state.horseData} )
  console.log(horseData?horseData: null)
  const update = useCallback((result) => dispatch(post(result.data)), [dispatch])
  const handleSignout = ()=>{
    setSignout(true);
  }
  useEffect(() => {
    const fetchData = async (data) => {
      console.log(data)
      if (Object.keys(data).length > 0) {
        // http://dev.api.staller.show/v1/horses
        data["age_verified"] = true;
        console.log(data, "data")
        const result =axios({
          method: 'POST',
          url: `http://dev.api.staller.show/v1/horses`,
          headers: {
            Authorization : `Bearer ${window.localStorage.getItem("accessToken")}`
          },
          data
        })
        console.log(result)
        result.then((response)=>{ setLoading(true); console.log(response);   }).catch((err)=>{setLoading(false)});
        setLoading(true)
        // update(result);
      }
      // setData(result.data);
    };
    fetchData(data);
  }, [data]);
  return (
    <div className="App">
      <Signout handleSignout={handleSignout} />
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              Create A Horse
          </ExpansionPanelSummary>
      <ExpansionPanelDetails >
      <Grid container
        direction="column"
        justify="center"
        alignItems="center"  >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Formik
            initialValues={{ horse_name: 'second', horse_number: '2', age_verified: "true", ushja_registered: true, dob: "1997-10-17", color: "black" }}
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
                <Form>
                  <CustomField size="small" type="text" name="horse_name" label="Horse Name" />
                  <CustomField type="text" name="horse_number" label="Horse Number" />
                  <Mypick type="radio" Component={Radio} value={"true"} name="age_verified" label="Age Verification" />
                  <Mypick ml={-10} type="checkbox" name="ushja_registered" Component={Checkbox} label="Registration" />
                  <CustomDatePicker type="date" name="dob" onChanging={setFieldValue} />
                  <MySelect name="color" label="Color" />
                  <Button m={10} fullWidth={true} variant="outlined" color="secondary" type="submit" disabled={isSubmitting}>Submit</Button>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </Form>
              )}
          </Formik>
        </Box>
      </Grid>
      </ExpansionPanelDetails>
      </ExpansionPanel>
      <ShowAll enable={loading} />
      {
        horseData.map((val,index)=> <MyForm index={index} formData={val} key={val.id} />)
      }
    </div> 
  );
}

export default App;
