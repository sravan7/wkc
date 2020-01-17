
import {  Field, ErrorMessage, useField } from 'formik';
import React, { useState, useEffect, Fragment } from 'react';
import { TextField, Button, InputLabel, FormControl, Box, Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid } from "@material-ui/core"
export default function Mypick ({ label, ...props }) {
  const [fields] = useField(props);
  console.log(fields, "fields")
  return (
    <Box as="div" ml={props.m} pl={2}>
      <FormControlLabel
        {...fields}
        control={<props.Component color="primary" />}
        label={label}
      />
    </Box>)
}