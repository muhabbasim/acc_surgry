// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { Typography, ImageList, ImageListItem, Box } from '@mui/material';

import ChildCard from 'src/components/shared/ChildCard';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import { Link } from 'react-router-dom';

type Props = {
  pets: any
}

const Pets = ({ pets }: Props) => {

  return (
    <ChildCard>
      <Typography variant="h4"><Translatable>Pets</Translatable></Typography>
      <Box>
        {pets?.length === 0 && (
          <Box width='100%' minHeight="180px" display='flex' justifyContent='center' alignItems='center'>
              <Typography variant="h6" color='gray'fontWeight={600} fontSize={15} pt={1}>
                <Translatable>
                  No pets registered
                </Translatable>
              </Typography>
            </Box>
          )}
        </Box>
        <ImageList cols={3} gap={15}>
          {pets?.map(( pet: any ) => (
          <ImageListItem key={pet?.id}>
            <Link to={`/user/pet_details/${pet.id}`}>
              <Box>
                <ImageListItem>
                  <img
                    srcSet={`${pet?.image} 1x, ${pet?.image} 2x`}
                    alt='photo'
                    loading="lazy"
                    style={{ borderRadius: 6, minWidth: '100%', height: '300px', objectFit: 'cover' }}
                    />
                </ImageListItem>
                <Typography variant="h6" color='gray' fontWeight={600} fontSize={15} pt={2}>
                  {pet?.pet_name}
                </Typography>
              </Box>
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </ChildCard >
  )
};

export default Pets;
