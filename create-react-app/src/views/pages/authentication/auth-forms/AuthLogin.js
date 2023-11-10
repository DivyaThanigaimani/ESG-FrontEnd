import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AuthLogin = () => {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorState, setErrorState] = useState(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (username, password) => {
    try {
      // Encode the username and password
      const encodedUsername = encodeURIComponent(username);
      const encodedPassword = encodeURIComponent(password);
      console.log(encodedUsername);
      console.log(encodedPassword);
  
      // Make a GET request to the API with the encoded parameters
      const response = await axios.get(`http://localhost:8080/loginmethod/${encodedUsername}/${encodedPassword}`);
  
      if (response.status === 200) {
        // Authentication successful
        navigate('dashboard/Default');
      } else {
        // Authentication failed
        setErrorState('Unable to Login, Please login with valid credentials.');
      }
    } catch (error) {
      console.error(error);
      setErrorState('Unable to Login, Please login with valid credentials');
    }
  };
  
  

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={async (values) => {
        try {
          await handleLogin(values.email, values.password);
        } catch (error) {
          console.error(error);
          if (scriptedRef.current) {
            setErrorState('An error occurred during the login process. Please check your network connection or server.');
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          {/* Email and password form fields */}
          <FormControl fullWidth sx={{ marginBottom: 2 }} error={Boolean(touched.email && errors.email)}>
            <InputLabel htmlFor="outlined-adornment-email-login">Email Address/Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email Address/Username"
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          {/* Password field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }} error={Boolean(touched.password && errors.password)}>
            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          {/* Display error messages, if any */}
          {errorState && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errorState}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Sign in
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;
