import {
  Typography,
  TableCell,
  TableRow,
  useTheme,
  IconButton,
  Box,
  Stack,
  Button,
} from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import api from 'src/context/apiRequest';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import ModalForm from 'src/Acc_components/modal/ModalForm';


type SubRowProps = {
  subRowEl: any
}

export default function ServiceLinkSubRow({ subRowEl }: SubRowProps) {
  const theme = useTheme();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState<boolean>(false);

  const [err, setErr] = useState<string>('');
  
  const handleClose = () => {
    setOpenDeleteModal(false);
    setErr('')
  } 

  // edit mutation
  const queryClient = useQueryClient();

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => {
      return api().delete(`/user-type-services/${subRowEl?.id}`);
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service_links']})
    }
  })

  // delete funcion 
  const handleDelete = async () => {
    try {
      setIsSubmittingDelete(true);

      await deleteMutation.mutateAsync();
      toast.success('Service link deleted successfully')
      handleClose()

      setIsSubmittingDelete(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
      }
    }
  }

  return (
    <>
      <TableRow key={subRowEl?.id}>
        <TableCell >
          <Typography color={theme.palette.success.main} fontWeight="800" fontSize={16}>
            {subRowEl?.name}
          </Typography>
        </TableCell>

        <TableCell>
          <IconButton onClick={() => setOpenDeleteModal(true)}>
            <IconTrash width={18} color={theme.palette.error.main}/>
          </IconButton>
        </TableCell>
      </TableRow>

      {openDeleteModal && (
        <TableRow>
          <TableCell>
            <ModalForm
              openModal={openDeleteModal} 
              handleClose={handleClose}
              title='Delete Service Link'
            >
              <Box sx={{ width: { xs: 250, md: 400} }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                    <Box width={'100%'} pt={2}>
                      <Typography>
                        <Translatable>
                          Are you sure you want to delete this service link?
                        </Translatable>
                      </Typography>
                      <Box display={'flex'} gap={2} pt={2}>
                        <Typography color="textSecondary" fontWeight="700">
                          <Translatable>
                            {subRowEl.name}
                          </Translatable>
                        </Typography>
                      </Box>
                    </Box>
                    {err && (
                      <Box paddingTop={4}>
                        <Typography textAlign={'center'} sx={{color: theme.palette.error.main}}>
                          {err}
                        </Typography>
                      </Box>
                    )}
                  <Stack mt={'30px'} direction="row" justifyContent="flex-end">
                    <Button
                      color="error"
                      startIcon={<IconTrash width={18} />}
                      onClick={handleDelete}
                      // disabled
                    >
                      { isSubmittingDelete ? <Translatable>Processing...</Translatable> : <Translatable>Delete</Translatable>}  
                    </Button>
                  </Stack>
              </Box>
            </ModalForm>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
