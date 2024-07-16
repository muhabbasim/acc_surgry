// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';
import starBg from 'src/assets/images/backgrounds/gold.png';
import BlankCard from 'src/components/shared/BlankCard';
import { toUpper } from 'lodash';
import Translatable from 'src/Acc_components/translatable_text/Translatable';

type Props = {
  user: any;
}


const Banner = ({ user }: Props) => {

  return (
    <BlankCard>
      <CardContent sx={{ p: '25px' }}>
        <Typography variant="subtitle1" textAlign="center" mb={2} textTransform="uppercase" color="textSecondary">
          <Translatable>
            {toUpper("User Type")}
          </Translatable>
        </Typography>
        <Box textAlign="center">
          <img src={starBg} alt="star" width={95} />
          <Typography variant="h5">
            <Translatable>
              {toUpper(user.type)}
            </Translatable>
          </Typography>
        </Box>
      </CardContent>
    </BlankCard>
  );
};

export default Banner;
