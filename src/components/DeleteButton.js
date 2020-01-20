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
import { Dialog, DialogActions,DialogContent,DialogContentText, DialogTitle ,Button,  InputLabel, FormControl, Box, Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid } from "@material-ui/core"
import  Mypick  from "./Mypick";
import CustomDatePicker from "./CustomDatePicker"
import MySelect from "./MySelect"
import axios from "axios";

function DeleteButton(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const update = useCallback((index) => dispatch(deleteIt(index)), [dispatch])
  const [data, setData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  
  const handleConfirm =()=>{
      setData({delete: true})
      setOpen(false);
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
            method: 'DELETE',
            url: `http://dev.api.staller.show/v1/horses/${props.id}`,
            headers: {
              Authorization : `Bearer ${window.localStorage.getItem("accessToken")}`
            }
          })
          console.log(result, props.index)
          result.then((response)=>{ setLoading(true); console.log(response); update(props.index);  }).catch((err)=>{setLoading(false)});
        console.log(result)
        setLoading(true)
        // update(result);
      }
      // setData(result.data);
    };
    fetchData(data);
  }, [data]);
  return (
        <Box as="span" display="flex" justifyContent="center" alignItems="center" >
            <Button variant="outlined" color="red" className="custom-button" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >{"Do you want to Delete it ?"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
  );
}

export default DeleteButton;
