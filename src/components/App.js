import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import sha512 from "sha512"
import logo from '../logo.svg';
import '../App.css';
import { login, incr } from "../helpers/actions"
import ShowAll from "./ShowAll";
import styled from "styled-components";
import CustomField from "./CustomFields"
import instance from "../helpers/axiosConfig"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Signout from "./Signout";
import { Formik, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import { Form } from "formik";
import * as formValidationSchema from "../helpers/ValidationSchema"
import { TextField, Button, InputLabel, FormControl, Box, Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid } from "@material-ui/core"
import  Mypick  from "./Mypick";

const CustomDatePicker = (props) => {
  const { setFieldValue } = useFormikContext();
  const [fields] = useField(props);
  console.log("date", fields, props.type)
  return (<Box as="span" ><DatePicker dateFormat="yyyy/MM/dd" type="date" {...fields} strictParsing {...props} onChange={val => { setFieldValue(fields.name, `${val.getFullYear()}-${String(val.getMonth() + 1).padStart(2, "0")}-${String(val.getDate()).padStart(2, "0")}`) }} />  DOB</Box>)
}
const MySelect = (props) => {
  const [fields] = useField(props);
  return (
    <Box as="div" mt={1} mb={1} ml={5} width={"100"} >
      <FormControl p={1} height="5">
        <InputLabel >color</InputLabel>
        <Select width={"100"} height="23" variant="outlined"  {...fields}>
          <MenuItem value={""}>Select Color</MenuItem>
          <MenuItem value={"black"}>Black</MenuItem>
          <MenuItem value={"white"}>White</MenuItem>
          <MenuItem value={"red"}>Red</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

function App() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const update = useCallback((result) => dispatch(login(result.data)), [dispatch])
  const inc = useCallback(() => dispatch(incr()), [dispatch])
  useEffect(() => {
    const fetchData = async (data) => {
      console.log(data)
      if (Object.keys(data).length > 0) {
        const hashed = sha512(data.password);
        // http://dev.api.staller.show/v1/horses
        data["age_verified"] = true;
        console.log(data, "data")
        const result = await instance.post('/v1/horses', { data });
        console.log(result)
        setLoading(true)
        // update(result);
      }
      // setData(result.data);
    };
    fetchData(data);
  }, [data]);
  return (
    <div className="App">
      <Signout />
      <Grid container
        direction="column"
        justify="center"
        alignItems="center"  >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Formik
            initialValues={{ horse_name: 'second', horse_number: '2', age_verified: "", ushja_registered: true, dob: "1997-10-17", color: "black" }}
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
                  <CustomField size="small" type="text" name="horse_name" label="Name" />
                  <CustomField type="text" name="horse_number" label="Number" />
                  <Mypick type="radio" Component={Radio} value={true} name="age_verified" label="Age Verification" />
                  <Mypick ml={-10} type="checkbox" name="ushja_registered" Component={Checkbox} label="Registration" />
                  <CustomDatePicker type="date" name="dob" onChanging={setFieldValue} />
                  <MySelect name="color" />
                  <Button m={10} fullWidth={true} variant="outlined" color="secondary" type="submit" disabled={isSubmitting}>Submit</Button>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </Form>
              )}
          </Formik>
        </Box>
        <ShowAll />

      </Grid>
    </div>
  );
}

export default App;
