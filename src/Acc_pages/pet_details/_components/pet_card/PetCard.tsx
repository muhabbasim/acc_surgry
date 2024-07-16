import { Box, Typography } from '@mui/material'
import './style.css'
import { upperCase } from 'lodash';

type Props = {
  pet: any;
}

export default function PetCard({ pet }: Props) {

  const subType = pet?.subscription?.type
  let cardType;
  let card;

  if( subType === 'gold') {
    cardType = 'gold_card';
    card = 'gold';
  } else if( subType === 'selver' ) {
    cardType = 'selver_card';
    card = 'selver';
  } else if( subType === 'platinum' ) {
    cardType = 'platinum_card';
    card = 'platinum';
  }

  return (
      <Box className={`${cardType}`} color='white' sx={{ border: "1px solid #e8e8e8", p: 2, width: '360px', borderRadius: 1 }}>
        <Box className={`${card}`}>
          <Typography fontSize={70} fontWeight={800}>
            {upperCase(pet?.subscription?.type)}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='end' >
          <img src="/src/assets/images/logos/Acc_logo.png" alt="" style={{ width: '120px', filter: 'grayscale(100%)' }} />
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='start' gap={1}>
          <Typography px={1} fontWeight={600} variant="h6">  
            {pet.pet_name}
          </Typography>
          <Typography px={1} fontSize={18} fontWeight={600} style={{display: 'inline'}}>
            {pet?.subscription?.id}
          </Typography>
          <Typography px={1} fontSize={18} fontWeight={600} style={{display: 'inline'}}>
            {pet?.subscription?.type}
          </Typography>
        </Box>
        <Box display='flex' gap={2}>
          <Box display='flex' pt={1} flexDirection='column' justifyContent='start' gap={0}>
            <Typography px={1} fontSize={16} fontWeight={600} style={{display: 'inline'}}>
              Start Date
            </Typography>
            <Typography px={1} fontSize={16} fontWeight={600} style={{display: 'inline'}}>
              {pet?.subscription?.start}
            </Typography>
          </Box>
          <Box display='flex' pt={1} flexDirection='column' justifyContent='start' gap={0}>
            <Typography px={1} fontSize={16} fontWeight={600} style={{display: 'inline'}}>
              Exp Date
            </Typography>
            <Typography px={1} fontSize={16} fontWeight={600} style={{display: 'inline'}}>
              {pet?.subscription?.start}
            </Typography>
          </Box>
        </Box>
      </Box>
  )
}
