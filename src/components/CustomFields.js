import {  Field, ErrorMessage, useField } from 'formik';
import { Form, Button, Row } from 'react-bootstrap';

import React, { useState, useEffect, Fragment } from 'react';
import { FormControlLabel, TextField, Box } from '@material-ui/core';

function CustomField({type, placeholder , ...props}){
    const [fields, metas] = useField(props);
    return (
        <Box component="div" m={1} max-width={"50%"}>
            <TextField required label={props.label} helperText={metas.error} width={"200"} id="outlined-basic" size={props.size}  variant="outlined" type={type}  placeholder={placeholder} {...fields}  />
        </Box>
  );
}

export default CustomField;