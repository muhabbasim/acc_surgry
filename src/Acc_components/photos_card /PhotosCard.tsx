// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { Typography, ImageList, ImageListItem, Box, Avatar } from '@mui/material';

import ChildCard from 'src/components/shared/ChildCard';
import { IconImageInPicture } from '@tabler/icons-react';
import Translatable from '../translatable_text/Translatable';
import ImageDisplay from '../imageDialog/ImageDisplay';

type Props = {
  images: any
}

const PhotosCard = ({ images }: Props) => {

  // cover display
  const [coverDisplay, setCoverDisplay] = useState(false);
  const handleCloseCoverDisplay = () => {
    setCoverDisplay(false);
  }

  return (
    <ChildCard>
      <Typography variant="h4"><Translatable>Photos</Translatable></Typography>
      <Box>
        {images?.length === 0 && (
          <Box width='100%' minHeight="210px" display='flex' justifyContent='center' alignItems='center'>
              <Typography variant="h6" color='gray'fontWeight={600} fontSize={15} pt={1}>
                <Translatable>
                  No images uploaded
                </Translatable>
              </Typography>
            </Box>
          )}
        </Box>
        <ImageList cols={3} gap={15}>
          {images?.map((image: {id: string, path: string, document_name: string}) => (
          <ImageListItem key={image?.id}>
            <Box>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: '#fff1b5', color: '#af8f00', width: 150, height: 150, cursor: 'pointer' }}
                onClick={() => setCoverDisplay(true)}
              >
                <IconImageInPicture size={100} stroke={1}/>
              </Avatar>
              <Typography variant="h6" color='gray' fontWeight={600} fontSize={12} pt={1}>
                {image?.document_name}
              </Typography>
              <ImageDisplay
                open={coverDisplay}
                onClose={handleCloseCoverDisplay}
                photo={image?.path}
              />
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
    </ChildCard >
  )
};

export default PhotosCard;
