// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import UploadedFiles from './UploadedFiles';
import IntroCard from 'src/Acc_pages/user_details/professional_details/_components/pro_contents/IntroCard';

type UserProps = {
  user: any
}

const RequestContent = ({ user }: UserProps) => {

  return (
    <PageContainer title="Request details" description="this is User Profile page">
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <IntroCard user={user}/>
        </Grid>
        <Grid item xs={12} lg={12}>
          <UploadedFiles user={user}/>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default RequestContent;
