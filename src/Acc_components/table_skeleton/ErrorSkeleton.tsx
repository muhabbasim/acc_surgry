import { Box, Typography } from '@mui/material'
import { IconError404 } from '@tabler/icons-react'

export default function ErrorSkeleton() {
  return (
    <Box width={'100%'} height={'400px'} display={'flex'} flexDirection={'column'} gap={3} justifyContent={'center'} alignItems={'center'}>
      <div>
        <IconError404 color='red' width={'150px'} height={'150px'}/>
      </div>
      <Typography fontSize={'50px'} textAlign={'center'}>
        Server Error 
      </Typography>
    </Box>
  )
}
