import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import sha512 from "sha512"
import '../App.css';
import {login, incr} from "../helpers/actions"
import styled from "styled-components";
import CustomField from "./CustomFields"
import axios from "axios";
import * as formValidationSchema from "../helpers/ValidationSchema"
// import { Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import  {Form } from "formik"; 
import {Redirect } from "react-router-dom";
import App from "./App"
import { TextField, Button, InputLabel, FormControl, Box, Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid } from "@material-ui/core"

// import { Button } from "react-bootstrap";
// import { Form, Row } from 'react-bootstrap';
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
function Login(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [status, setLogin] = useState(false);
  const update= useCallback((result)=>dispatch(login(result.data)), [dispatch])
  
  const inc= useCallback(()=>dispatch(incr()), [dispatch])
  
  useEffect(() => {
    const fetchData = async (data) => {
      console.log(data)
      if(Object.keys(data).length>0){
        console.log(data,"data")
      const hashed  = sha512(data.password);

      await axios({
        method: 'post',
        url: 'http://dev.api.staller.show/v1/users/login',
        data: {
          email: data.email,
          password: hashed.toString("hex")
        }
      }).then((response)=>{  update(response); setLogin(true);  }).catch((err)=>{ console.log(err); setLogin(false)});  
    //   setLoading(true)
    // update(result);
    }
      // setData(result.data);
    };
    fetchData(data);
  }, [data]);
  let handleSubumit = (values) => {
    console.log(values.email, values.password)
  }
//   console.log("insisew", window.localStorage.getItem("accessToken"))

  if(window.localStorage.getItem("accessToken") || status){
    //   console.log("insisew 60",props , props.location? props.location:  {from: {pathname: "/"} })
      const {pathname} =  props.location 
    //   const {from}= props.location.pathname?{from: {pathname: } } props.location  {from: {pathname: "/"} };
      if(props.location.pathname==="/"){
          return <App />
      }  
      return (< Redirect to={pathname} />)
  }
  return (
    <div className="App">
      <Container  >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={formValidationSchema.loginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setData(values);
          // handleSubmit(values)
    
        }}
      >
        { ({  values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting, }) => (


    
          <Form> 
              <CustomField type="email" name="email" placeholder="Email" />
              <CustomField type="password" name="password" placeholder="Password" />
              <Button m={10} fullWidth={true} variant="outlined" color="secondary" type="submit" disabled={isSubmitting}>Login</Button>
          </Form>
          
        ) }
      </Formik>
      </Container>
    </div>
  );
}

export default Login;
