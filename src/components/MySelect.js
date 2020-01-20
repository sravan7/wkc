import { Formik, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import { TextField,ExpansionPanel,ExpansionPanelActions, ExpansionPanelSummary ,ExpansionPanelDetails , Button, InputLabel, FormControl, Box, Checkbox, Radio, FormControlLabel, Select, MenuItem, Grid } from "@material-ui/core"
import React, { useState, useEffect, Fragment, useCallback } from 'react';

const MySelect = (props) => {
  const [fields] = useField(props);
  return (
    <Box as="span" mt={1} mb={1} ml={5} width={"100"} >
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
export default MySelect