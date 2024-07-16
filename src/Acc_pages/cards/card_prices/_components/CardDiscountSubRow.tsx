import {
  Typography,
  TableCell,
  TableRow,
  useTheme,
  IconButton,
  Box,
  Stack,
  Button,
  Switch,
  Chip,
} from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import api from 'src/context/apiRequest';
import { useFormik } from 'formik';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import CustomFormLabel from 'src/Acc_pages/auth/_components/CustomFormLabel';
import ModalForm from 'src/Acc_components/modal/ModalForm';
import CustomTextField from 'src/Acc_pages/auth/_components/CustomTextField';
import * as yup from 'yup';


type SubRowProps = {
  subRowEl: any
}

const validationSchema = yup.object({
  discount: yup.number().required('discount is required.'),
  reservation_count: yup.string().required('reservation_count is required.'),
  isActive: yup.boolean(),
});


export default function CardDiscountSubRow({ subRowEl }: SubRowProps) {
  const theme = useTheme();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState<boolean>(false);

  const [err, setErr] = useState<string>('');
  

  const handleClose = () => {
    setOpenDeleteModal(false);
    setOpenEditModal(false);
    setErr('')
  } 

  // edit mutation
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (values: object) => {
      return api().put(`/discounts/update/${subRowEl?.id}`, values);
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts_data']})
    }
  })

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => {
      return api().delete(`/discounts/${subRowEl?.id}`);
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts_data']})
    }
  })


  // submit mutation
  const formik = useFormik({
    initialValues: {
      reservation_count: subRowEl?.reservation_count,
      discount: subRowEl?.discount,
      isActive: false,
    },
    
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values)
        await editMutation.mutateAsync(values)
        toast.success('Discount updated successfully')
        handleClose()

      } catch (error) {
        if(error instanceof AxiosError) {
          setErr(error.response?.data?.message || error.response?.data.error)
        }
        console.log(error);
      }
    },
  });

  const { isSubmitting } = formik


  // delete funcion 
  const handleDelete = async () => {
    try {
      setIsSubmittingDelete(true);

      await deleteMutation.mutateAsync();
      toast.success('Document type deleted successfully')
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
        <TableCell/>

        <TableCell>
          <Chip 
            label={`${subRowEl?.discount}%`} 
            variant='filled' 
            sx={{ 
              width: 90, 
              color: theme.palette.primary.main, 
              backgroundColor: 'primary.light' 
            }}
          />
        </TableCell>

        <TableCell>
          <Chip 
            label={`$${subRowEl?.price}`} 
            variant='filled' 
            sx={{ 
              width: 90, 
              color: 'white', 
              backgroundColor: theme.palette.primary.dark, 
            }}
          />
        </TableCell>

        <TableCell>
        <Chip 
            label={subRowEl?.reservation_count} 
            variant='filled' 
            sx={{ 
              width: 90, 
              color: theme.palette.error.main, 
              backgroundColor: 'error.light' 
            }}
          />
        </TableCell>

  
        <TableCell>
        <Box>
            {subRowEl?.isActive === true ? (
                <Chip 
                  label={<Translatable>ACTIVE</Translatable>} 
                  variant='filled' 
                  sx={{ 
                    width: 90, 
                    color: theme.palette.primary.main, 
                    backgroundColor: 'primary.light' 
                  }}
                />
            ) : (
              <Chip 
                label={<Translatable>INACTIVE</Translatable>} 
                variant='filled' 
                sx={{ 
                  width: 90, 
                  color: theme.palette.error.main, 
                  backgroundColor: 'error.light' 
                }}
              />
            )}
          </Box>
        </TableCell>

        <TableCell>
          <IconButton onClick={() => setOpenDeleteModal(true)}>
            <IconTrash width={18} color={theme.palette.error.main}/>
          </IconButton>
          <IconButton onClick={() => setOpenEditModal(true)}>
            <IconEdit width={18}  color={theme.palette.secondary.main}/>
          </IconButton>
        </TableCell>
      </TableRow>

      { openEditModal && (
        <TableRow>
          <TableCell>
            <ModalForm 
              openModal={openEditModal} 
              handleClose={handleClose}
              title='Edit Card Discount'
            >
              <Box sx={{ minWidth: { sm: '100%', md: 500, lg: 500 }}}  justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <form onSubmit={formik.handleSubmit}>
                  <Stack 
                    justifyContent={'center'}
                    sx={{ display: 'flex', flexDirection: 'row', gap: { md: 3 } }}
                  >
                    <Box display={'flex'} flexDirection={{sm: 'column', md: 'column', lg: 'row',}} gap={2}>
             
                      <Box width={{ sx: '100%', md: '50%'}}>
                        <CustomFormLabel>
                          <Translatable>
                            Discount
                          </Translatable>
                        </CustomFormLabel>
                        <CustomTextField
                          fullWidth
                          id="discount"
                          name="discount"
                          value={formik.values.discount}
                          onChange={formik.handleChange}
                          error={formik.touched.discount && Boolean(formik.errors.discount)}
                          helperText={formik.touched.discount && formik.errors.discount}
                        />
                      </Box>
                      <Box width={{ sx: '100%', md: '50%'}}>
                        <CustomFormLabel>
                          <Translatable>
                            Reservation Count
                          </Translatable>
                        </CustomFormLabel>
                        <CustomTextField
                          fullWidth
                          id="reservation_count"
                          name="reservation_count"
                          value={formik.values.reservation_count}
                          onChange={formik.handleChange}
                          error={formik.touched.reservation_count && Boolean(formik.errors.reservation_count)}
                          helperText={formik.touched.reservation_count && formik.errors.reservation_count}
                        />
                      </Box>
                    </Box>
                  
                    <Box display={'flex'} flexDirection={{sm: 'column', md: 'column', lg: 'row',}} gap={2}>
                      
                      <Box width={{ sx: '100%', md: '50%'}}>
                        <CustomFormLabel>
                          <Translatable>
                            Activate
                          </Translatable>
                        </CustomFormLabel>
                        <Box textAlign="center">
                          <Switch
                            defaultChecked={subRowEl?.isActive}
                            color="primary"
                            onChange={formik.handleChange}
                            name="isActive" 
                          />
                        </Box>
                      </Box>
                    </Box> 
                  </Stack>

                  {err && (
                    <Box paddingTop={4}>
                      <Typography textAlign={'center'} sx={{color: theme.palette.error.main}}>
                        {err}
                      </Typography>
                    </Box>
                  )}
                  <Stack mt={'30px'} direction="row" justifyContent="flex-end">
                    <Button sx={{width: {xs: '100%', lg: '150px', md: '100%'}}} variant="contained" type="submit">
                      {isSubmitting ? <Translatable>Processing...</Translatable> : <Translatable>Edit</Translatable>} 
                    </Button>
                  </Stack>
                </form>
              </Box>
            </ModalForm>
          </TableCell>
        </TableRow>
      )}

      {openDeleteModal && (
        <TableRow>
          <TableCell>
            <ModalForm
              openModal={openDeleteModal} 
              handleClose={handleClose}
              title='Delete Card Link'
            >
              <Box sx={{ width: { xs: 250, md: 400} }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                    <Box width={'100%'} pt={2}>
                      <Typography>
                        <Translatable>
                          Are you sure you want to delete this card discount?
                        </Translatable>
                      </Typography>
                      <Box display={'flex'} gap={2} pt={2}>
                        <Typography color="textSecondary" fontWeight="700">
                          <Translatable>
                            {subRowEl?.discount}
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
