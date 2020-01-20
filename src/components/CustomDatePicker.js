import { Formik, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import { TextField,ExpansionPanel,ExpansionPanelActions, ExpansionPanelSummary ,ExpansionPanelDetails , Button, InputLabel, FormControl, Box, Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid } from "@material-ui/core"
import React, { useState, useEffect, Fragment, useCallback } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CustomDatePicker = (props) => {
  const { setFieldValue } = useFormikContext();
  const [fields] = useField(props);
  console.log("date", fields, props)
  return (<Box as="span" >
    <DatePicker dateFormat="yyyy/MM/dd" type="date" {...fields} strictParsing {...props}
    
    onChange={val => { setFieldValue(fields.name, `${val.getFullYear()}-${String(val.getMonth() + 1).padStart(2, "0")}-${String(val.getDate()).padStart(2, "0")}`) }} />  DOB</Box>)
}
export default CustomDatePicker