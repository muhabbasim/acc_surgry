// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';

import PhotosCard from 'src/Acc_components/photos_card /PhotosCard';
import FileDialogDeletable from 'src/Acc_components/file_dialog/FileDialogDeletable';

type Props = {
  user: any
}

const UploadedFiles = ({ user }: Props) => {
  
  const attachments = user?.attachments

 

  return (
 
    <Box display='flex' gap={3}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={6} lg={6}>
          <FileDialogDeletable files={attachments?.files}/>
        </Grid>
        <Grid item sm={12} md={6} lg={6}>
          <PhotosCard images={attachments?.images}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UploadedFiles;
