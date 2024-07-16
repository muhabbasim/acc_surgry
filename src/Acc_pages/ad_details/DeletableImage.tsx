import { Box, ImageListItem, useTheme } from '@mui/material'
import { IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'sonner';
import ImageDisplay from 'src/Acc_components/imageDialog/ImageDisplay';
import api from 'src/context/apiRequest';

type ImageProps = {
  photo: any;
}

export default function DeletableImage({ photo }: ImageProps) {
  const theme = useTheme()
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  }

  const queryClient = useQueryClient();
  const deleteImageMutation = useMutation({
    mutationFn: () => {
      return api().delete(`/images/${photo?.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements']})
    }
  })

  const handleDelete = async () => {

    try {
      const res = await deleteImageMutation.mutateAsync()
      console.log(res)
      toast.success('Ad image deleted successfully')

    } catch (error) {
      
    }
  }

  return (
    <ImageListItem >
      <img
        srcSet={`${photo?.path} 1x, ${photo?.path} 2x`}
        alt='ad images'
        loading="lazy"
        style={{ borderRadius: 8, cursor: 'pointer' }}
        onClick={() => setOpenDialog(true)}
      />

      <Box 
        sx={{
          backgroundColor: 'white',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          position: 'absolute',
          top: '-5px',
          left: '-5px',
          border: `1px solid ${theme.palette.error.main}`,
          cursor: 'pointer',
        }}
      >
        <IconX width={17} onClick={handleDelete} color={theme.palette.error.main}/>
      </Box>
      
      <ImageDisplay
        open={openDialog}
        onClose={handleClose}
        photo={photo?.path}
      />
    </ImageListItem>
  )
}
