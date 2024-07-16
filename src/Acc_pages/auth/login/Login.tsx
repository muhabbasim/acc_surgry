
import { Grid, Box, Card } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../_components/AuthLogin';

import auth_cat1 from '../../../assets/auth_bg/auth_cat1.jpg'


const Login2 = () => {
  
  return (
    <PageContainer title="ACC Login" description="this is Login page">
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
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin/>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
