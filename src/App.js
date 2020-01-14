import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import sha512 from "sha512"
import logo from './logo.svg';
import './App.css';
import axios from "axios";
// import { Form } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from "react-bootstrap";
function App() {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      console.log(data)
      const hashed  = sha512(data.password);
      const result = await axios({
        method: 'post',
        url: 'http://dev.api.staller.show/v1/users/login',
        data: {
          email: data.email,
          password: hashed.toString("hex")
        }
      });
      console.log(result)
      setLoading(true)
      // setDsata(result.data);
    };
    fetchData(data);
  }, [data]);
  let handleSubmit = (values) => {
    console.log(values.email, values.password)
  }
  return (
    <div className="App">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setData(values);
          handleSubmit(values)
          if (loading) {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
          </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
