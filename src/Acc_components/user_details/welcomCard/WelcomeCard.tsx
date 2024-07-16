// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Avatar, Typography, Card, CardContent, Grid} from '@mui/material';

// import welcomeImg from 'src/assets/images/backgrounds/welcome-bg.svg';
import welcomeImg from 'src/assets/images/footprints.png';
import Translatable from 'src/Acc_components/translatable_text/Translatable';

type UserProps = {
  user: any
}

const WelcomeCard = ({ user }: UserProps) => {
  
  return (

    <Card elevation={0}  sx={{ backgroundColor: (theme) => theme.palette.primary.light, py: 0 }}>
      <CardContent sx={{ py: 4, px: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid item sm={6} display="flex" alignItems="center">
            <Box
              gap="16px"
              sx={{
                display: {
                  xs: 'block',
                  sm: 'flex',
                },
                alignItems: 'center',
                gap: '36px'
              }}
            >
              <Avatar src={user?.image} alt="img" sx={{ width: 120, height: 120 }} />
              <Box>
                <Typography variant="h6" whiteSpace="nowrap">
                  <Translatable>
                    {user?.name}
                  </Translatable>
                </Typography>
                <Typography variant="h3" whiteSpace="nowrap">
                  {user?.email} 
                </Typography>

              </Box>
            </Box>
             
          </Grid>
          <Grid item sm={6}>
            <Box mb="-30px" pt={1} style={{ opacity: 0.8 }}>
              <img src={welcomeImg} alt={welcomeImg} width={'390px'} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
