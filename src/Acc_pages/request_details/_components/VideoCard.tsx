// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { Typography, ImageList, ImageListItem, Box, Avatar, useTheme } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import { IconVideo } from '@tabler/icons-react';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import VideoDisplay from 'src/Acc_components/videoDialog/VideoDisplay';

type Props = {
  videos: any
}

const VideoCard = ({ videos }: Props) => {
  
  const theme = useTheme();
  // cover display
  const [coverDisplay, setCoverDisplay] = useState(false);
  const handleCloseCoverDisplay = () => {
    setCoverDisplay(false);
  }

  return (
    <ChildCard>
      <Typography variant="h4"><Translatable>Videos</Translatable></Typography>
        <Box  >
          {videos?.length === 0 && (
            <Box width='100%' minHeight="180px" display='flex' justifyContent='center' alignItems='center'>
              <Typography variant="h6" color='gray'fontWeight={600} fontSize={15} pt={1}>
                <Translatable>
                  No videos uploaded
                </Translatable>
              </Typography>
            </Box>
          )}
        </Box>

        <ImageList cols={2} gap={20}>
          {videos?.map((video: {id: string, path: string, document_name: string}) => (
            <ImageListItem key={video?.id}>
              <Box key={video?.id}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: theme.palette.success.light, color: theme.palette.success.main, width: 150, height: 150, cursor: 'pointer' }}
                  onClick={() => setCoverDisplay(true)}
                >
                  <IconVideo size={100} stroke={1}/>
                </Avatar>
                <Typography variant="h6" color='gray' fontWeight={600} fontSize={12} pt={1}>
                  {video?.document_name}
                </Typography>
                  <VideoDisplay
                  open={coverDisplay}
                  onClose={handleCloseCoverDisplay}
                  video={video}
                />
              </Box>
          </ImageListItem>
        ))}
      </ImageList>
    </ChildCard >
  )
};

export default VideoCard;
