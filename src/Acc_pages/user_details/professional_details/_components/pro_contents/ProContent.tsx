// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import IntroCard from './IntroCard';
import UploadedFiles from './UploadedFiles';
import ServicesCard from '../pro_services/ServicesCard';


type Props = {
  user: any
}

const ProContent = ({ user }: Props) => {
  return (
    <PageContainer title="Request details" description="this is User Profile page">
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <IntroCard user={user}/>
        </Grid>
        <Grid item xs={12} lg={12}>
          <UploadedFiles user={user}/>
        </Grid>
        <Grid item xs={12} lg={12}>
          <ServicesCard user={user}/>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProContent;
