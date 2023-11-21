import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, CssBaseline } from '@mui/material';

import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthRegister from '../auth-forms/AuthRegister';
import backgroundImg from '../../../../assets/images/b3.jpg';

const Register = () => {
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

        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                        <Typography variant="h1" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
                      SIGN UP
                    </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthRegister />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to="/pages/login/login3" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Already have an account?
                      </Typography>
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
            <Typography variant="body2">
              © SustainSphere
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;
