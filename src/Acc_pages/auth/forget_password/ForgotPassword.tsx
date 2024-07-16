// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid, Box, Card, Typography } from '@mui/material';

import Logo from 'src/layouts/full/shared/logo/Logo';
import PageContainer from 'src/components/container/PageContainer';
import AuthForgotPassword from '../_components/AuthForgotPassword';
import auth_cat1 from '../../../assets/auth_bg/auth_cat1.jpg'


const ForgotPassword2 = () => (
  <PageContainer title="ACC Forgot Password" description="this is Forgot Password page">
    <Box
        style={{ backgroundImage: `url(${auth_cat1})`, objectFit: 'contain', backgroundPosition: 'center', width: '100%', height: '100%', borderRadius: '0'}}
      sx={{

        position: 'relative',
        '&:before': {
          content: '""',
          background: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={12}
          xl={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
            <Box py={'30px'} display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>

            {/* <Box my={3}>
              <Divider/>
            </Box> */}

            <Typography
              color="textSecondary"
              textAlign="center"
              variant="subtitle2"
              fontWeight="400"
            >
              Please enter the email address associated with your account and We will email you a
              link to reset your password.
            </Typography>
            <AuthForgotPassword />
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default ForgotPassword2;
