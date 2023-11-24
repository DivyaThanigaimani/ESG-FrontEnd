import React from 'react';

import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Typography, useMediaQuery, CssBaseline } from '@mui/material';

import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';

import backgroundImg from '../../../../assets/images/b3.jpg';

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <CssBaseline />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden', // Remove both horizontal and vertical scrollbars
        }}
      >
        {/* Navigation Bar */}
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Grid container direction="column" justifyContent="space-between" sx={{ px: 3, paddingTop: 2, marginLeft: 2 }}>
            <Typography variant="h1" color="primary" fontWeight="bold">
              SustainSphere
            </Typography>
            <Typography variant="body2" color="white" fontWeight="bold">
              Where Innovation Meets Eco-Conscious Living
            </Typography>
          </Grid>
        </Grid>

        {/* Header Section */}
        <Grid item xs={12} sx={{ mb: matchDownSM ? 2 : 4 }}>
          <Grid container justifyContent="flex-start" alignItems="center"></Grid>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}></Grid>

                  {/* #header-container where the header content will be inserted */}
                  <div id="header-container">
                    {/* Add the login form label here */}
                    <Typography variant="h1" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
                      LOGIN
                    </Typography>
                  </div>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                     
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>

        {/* Footer Section */}
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <Grid container justifyContent="center">
            <Typography variant="body2">© SustainSphere</Typography>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
