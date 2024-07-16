import {
  Typography,
  Box,
  IconButton,
  TableCell,
  TableRow,
  Stack,
  useTheme,
  Button,
  Chip,
  Switch,
} from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';

import api from 'src/context/apiRequest';

import * as yup from 'yup';
import ReactImageUpload from 'src/components/shared/ReactImageUpload';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import ImageDisplay from 'src/Acc_components/imageDialog/ImageDisplay';
import ModalForm from 'src/Acc_components/modal/ModalForm';
import CustomFormLabel from 'src/Acc_pages/auth/_components/CustomFormLabel';
import CustomTextField from 'src/Acc_pages/auth/_components/CustomTextField';



const validationSchema = yup.object({
  en_name: yup.string().required('Label in English is required.'),
  ar_name: yup.string().required('Label in Arabic is required.'),
  price: yup.string().required('Price is required.'),
  isActive: yup.boolean(),
});

type Props = {
  el: any;
}
    
export default function CardTypeRow({el}: Props) {
  const theme = useTheme();


  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [ err, setErr ] = useState<any>();

  // image procesadId, el.ng
  const [ imageFile, setImageFile ] = useState<any>();
  const [ imageValue, setImageValue ] = useState<any>();

  // cover display
  const [coverDisplay, setCoverDisplay] = useState(false);
  const handleCloseCoverDisplay = () => {
    setCoverDisplay(false);
  }

  const handleClose = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
  }

  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (values: any) => {
      return api().post(`/cards/update/${el.id}`, values)
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards']})
    }
  })

  const deleteMutation = useMutation({
    mutationFn: () => {
      return api().delete(`/cards/${el?.id}`)
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards']})
    }
  })

  const formik = useFormik({
    initialValues: {
      en_name: el?.en_name,
      ar_name: el?.ar_name,
      price: el?.price,
      isActive: el?.isActive,
    },

    validationSchema,
    onSubmit: async (values) => {
      try {
        const { en_name, ar_name, isActive, price } = values
        const isActiveString =  isActive.toString()
        console.log(values)
        // image processing
        const image = imageFile?.file

        const formData = new FormData();
        formData.append('image', image);
        formData.append('ar_name', ar_name)
        formData.append('en_name', en_name)
        formData.append('price', price)
        formData.append('isActive', isActive.toString())

        const res = await editMutation.mutateAsync( image ? formData : { ...values, isActive: isActiveString })
        console.log(res)

        toast.error('Card updated successfully')

        setImageFile(undefined)
        setImageValue(undefined)
        setErr('')
        handleClose()

      } catch (error) {
        if (error instanceof AxiosError) {
          setErr(error.response?.data?.message || error.response?.data.error)
        }
        console.log(error)
      }
    },
  });

  const { isSubmitting } = formik


  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteMutation.mutateAsync();
      toast.success('Rank deleted successfully')
      handleClose()
      setIsDeleting(false)

    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
        console.log(error);
      }
    }
  }
  

  return (
    <>
      <TableRow hover key={el.id}>
        <TableCell>
          <Stack spacing={1}>
            <Typography color="primary" variant="h6" fontWeight="600">
              {el.en_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack spacing={1}>
            <Typography color="secondary" variant="h6" fontSize={14} fontWeight="600">
              {el.ar_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack spacing={1}>
            <Chip 
              label={`$ ${el?.price}`} 
              variant='filled' 
              sx={{ 
                width: 60, 
                color: 'white', 
                backgroundColor: theme.palette.primary.dark, 
              }}
            />
          </Stack>
        </TableCell>

        <TableCell>
          <Box>
            {el?.isActive === true ? (
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
          <Stack direction="row" gap="10px" alignItems="center">
            <img
              src={el.image}
              alt={el.image}
              style={{
                borderRadius: '50%',
                width: 50,
                height: 50,
                cursor: 'pointer'
              }}
              onClick={() => setCoverDisplay(true)}
            />
          </Stack>
          <ImageDisplay
            open={coverDisplay}
            onClose={handleCloseCoverDisplay}
            photo={el?.image}
          />
        </TableCell>

        <TableCell>
          <IconButton onClick={() => setOpenDeleteModal(true)}>
            <IconTrash width={18} height={18} color={theme.palette.error.main}/>
          </IconButton>
          <IconButton onClick={() => setOpenEditModal(true)}>
            <IconEdit width={18} height={18} color={theme.palette.secondary.main}/>
          </IconButton>
        </TableCell>
      </TableRow>
      
      { openEditModal && (
        <TableRow>
          <TableCell>
            <ModalForm
              openModal={openEditModal} 
              handleClose={handleClose}
              title='Edit Card Type'
            >
              <Box sx={{ minWidth: { sm: '100%', md: 600, lg: 700 } }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
              <form onSubmit={formik.handleSubmit}>
                  <Stack 
                    justifyContent={'center'}
                  >
                       <Box display={'flex'} flexDirection={{sm: 'column', md: 'column', lg: 'row',}} gap={2}>
                    <Box width={'100%'}>
                      <CustomFormLabel>
                        <Translatable>
                          Label in English
                        </Translatable>
                      </CustomFormLabel>
                      <CustomTextField
                        fullWidth
                        id="en_name"
                        name="en_name"
                        value={formik.values.en_name}
                        onChange={formik.handleChange}
                        error={formik.touched.en_name && Boolean(formik.errors.en_name)}
                        helperText={formik.touched.en_name && formik.errors.en_name}
                      />
                    </Box>

                    <Box width={'100%'}>
                      <CustomFormLabel>
                        <Translatable>
                          Label in Arabic
                        </Translatable>
                      </CustomFormLabel>
                      <CustomTextField
                        fullWidth
                        id="ar_name"
                        name="ar_name"
                        value={formik.values.ar_name}
                        onChange={formik.handleChange}
                        error={formik.touched.ar_name && Boolean(formik.errors.ar_name)}
                        helperText={formik.touched.ar_name && formik.errors.ar_name}
                      />
                    </Box>
                  </Box>

                  <Box width={'100%'}>
                      <CustomFormLabel>
                        <Translatable>
                          Price
                        </Translatable>
                      </CustomFormLabel>
                      <CustomTextField
                        fullWidth
                        id="price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                      />
                    </Box>
                    <Box sx={{ display: {md:'flex'}, flexDirection: { sx:'column', md: 'row', lg: 'row'}, gap: { md: 5 } }}>
                      <Box width={{ sx: '100%', md: '50%'}}>
                        <CustomFormLabel>
                          <Translatable>
                            Ad Images
                          </Translatable>
                        </CustomFormLabel>
                        
                        <ReactImageUpload
                          setImageFile={setImageFile} 
                          imageFile={imageFile} 
                          imageValue={imageValue} 
                          setImageValue={setImageValue}
                        />
                      </Box>

                      <Box width={{ sx: '100%', md: '50%'}}>
                        <CustomFormLabel>
                          <Translatable>
                            Activate
                          </Translatable>
                        </CustomFormLabel>
                        <Box textAlign="center">
                          <Switch 
                            // defaultChecked 
                            defaultChecked={el?.isActive}
                            color="primary"
                            onChange={formik.handleChange}
                            name="isActive" 
                          />
                        </Box>
                      </Box>
                    </Box>
                  
                  </Stack>
                  <Box>
                    {err && (
                      <Box paddingTop={4}>
                        <Typography textAlign={'center'} sx={{color: theme.palette.error.main}}>
                          {err}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Stack my={'20px'} direction="row" justifyContent="flex-end">
                    <Button sx={{width: {md: '150px', xs: '100%'}}} variant="contained" type="submit">
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
              title='Delete Card Type'
            >
              <Box sx={{ width: { xs: 250, md: 400} }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <Box width={'100%'} pt={2}>
                  <Box>
                    <Typography sx={{ color: theme.palette.error.main}}>
                      <Translatable>
                        Are you sure you want to delete this card type?
                      </Translatable>
                    </Typography>
                  </Box>

                  <Box display={'flex'} alignItems={'center'} gap={6} pt={2}>
                    <Typography color="textSecondary" fontWeight="700">
                      <Translatable>
                        {el.en_name}
                      </Translatable>
                    </Typography>
                    {
                      el.cover &&
                        <img
                          src={el.cover}
                          alt={el.cover}
                          style={{
                            borderRadius: 3,
                            width: 50,
                          }}
                        />
                    }
                  </Box>
                </Box>
              <Stack mt={'30px'} direction="row" justifyContent="flex-end">
                <Button
                  color="error"
                  // disabled
                  startIcon={<IconTrash width={18} />}
                  onClick={handleDelete}
                >
                  {isDeleting ? <Translatable>Processing...</Translatable> : <Translatable>Delete</Translatable>}  
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
