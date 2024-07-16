import {
  Typography,
  Box,
  IconButton,
  TableCell,
  TableRow,
  Stack,
  useTheme,
  Button,
  Avatar,
  Switch,
  Chip,
} from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';
import ModalForm from 'src/Acc_components/modal/ModalForm';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import api from 'src/context/apiRequest';

import * as yup from 'yup';
import CustomFormLabel from '../auth/_components/CustomFormLabel';
import CustomTextField from '../auth/_components/CustomTextField';
import ReactImageUpload from 'src/components/shared/ReactImageUpload';
import ImageDisplay from 'src/Acc_components/imageDialog/ImageDisplay';

const validationSchema = yup.object({
  en_name: yup.string().required('Label in English is required.'),
  ar_name: yup.string().required('Label in Arabic is required.'),
  isActive: yup.boolean(),
});

type Props = {
  el: any;
}
    
export default function ServiceSingleRow({el}: Props) {

  const theme = useTheme();
  const [err, setErr] = useState<string>('');
  const [isDeleting, setisDeleting] = useState<boolean>(false);
  const [ imageFile, setImageFile ] = useState<any>();
  const [ imageValue, setImageValue ] = useState<any>();

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [coverDisplay, setCoverDisplay] = useState(false);
  const handleClose = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setCoverDisplay(false);
  }
  
  // edit mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: object) => {
      return api().post(`/service-types/update/${el?.id}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service']})
    }
  })

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => {
      return api().delete(`/document-types/${el?.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service']})
    }
  })
  
  const formik = useFormik({
    initialValues: {
      en_name: el.en_name,
      ar_name: el.ar_name,
      isActive: el.isActive,
    },

    validationSchema,
    onSubmit: async (values) => {

      try {

        const { en_name, ar_name, isActive } = values
        const imageFiles = imageFile?.file
        console.log({...values, imageFiles});

        const formData = new FormData();
        const isactive = isActive.toString()

        formData.append('image', imageFiles);
        formData.append('en_name', en_name);
        formData.append('ar_name', ar_name);
        formData.append('isActive', isactive);

        const res = await mutation.mutateAsync(imageFile ? formData : { ...values, isActive: isactive });
        console.log(res)
        toast.success('Service updated successfully')

        setImageFile(undefined)
        setImageValue(undefined)
        handleClose();
      } catch (error) {
        if (error instanceof AxiosError) {
          setErr(error.response?.data?.message || error.response?.data.error)
        }
      }
    },
  });

  const { isSubmitting } = formik

  const handleDelete = async () => {
    try {
      setisDeleting(true);
      const res = await deleteMutation.mutateAsync();
      console.log(res);
      toast.success('Document deleted successfully')

      handleClose()
      setisDeleting(false);

    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
      }
    }
  }

  return (
    <>
      <TableRow hover key={el.id}>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box>
              <Typography color="primary" variant="h6" mt={1} fontWeight="600">
                {el.en_name}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box>
              <Typography color="textSecondary" variant="h6" mt={1} fontWeight="400">
                {el.ar_name}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Box>
            {el?.isActive ? (
                <Chip 
                  label={<Translatable>ACTIVE</Translatable>} 
                  variant='filled' 
                  sx={{ 
                    width: 100, 
                    color: theme.palette.primary.main, 
                    backgroundColor: 'primary.light' 
                  }}
                />
            ) : (
              <Chip 
                label={<Translatable>INACTIVE</Translatable>} 
                variant='filled' 
                sx={{ 
                  width: 100, 
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
            onClose={handleClose}
            photo={el?.image}
          />
        </TableCell>

        <TableCell>
          <IconButton onClick={() => setOpenDeleteModal(true)}>
            <IconTrash width={18} color={theme.palette.error.main}/>
          </IconButton>
          <IconButton onClick={() => setOpenEditModal(true)}>
            <IconEdit width={18} color={theme.palette.secondary.main}/>
          </IconButton>
        </TableCell>
      </TableRow>
      
      { openEditModal && (
        <TableRow>
          <TableCell>
            <ModalForm
              openModal={openEditModal} 
              handleClose={handleClose}
              title='Edit Service'
            >
              <Box sx={{ minWidth: { sm: '100%', md: 600, lg: 800 } }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <form onSubmit={formik.handleSubmit}>
                  <Stack 
                    justifyContent={'center'}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Box display={'flex'} flexDirection={{sm: 'column', md: 'column', lg: 'row',}} gap={{lg: 2}}>
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

                    <Box display={'flex'} flexDirection={{sm: 'column', md: 'column', lg: 'row',}} gap={2}>
                      <Box width={'100%'}>
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
                      <Box display='flex' width={'100%'} justifyContent='center' alignItems='center' gap={2}>
                        <CustomFormLabel>
                          <Translatable>
                            Activate
                          </Translatable>
                        </CustomFormLabel>
                        <Box textAlign="center">
                          <Switch 
                            color="primary"
                            defaultChecked={el?.isActive}
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
                  <Stack mt={'60px'} direction="row" justifyContent="flex-end">
                    <Button sx={{width: {xs: '100%', lg: '150px', md: '100%', backgroundColor: theme.palette.primary.dark }}} variant="contained" type="submit">
                      {isSubmitting ? <Translatable>Processing...</Translatable> : <Translatable>Submit</Translatable>}  
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
              title='Delete Service Type'
            >
              <Box sx={{ width: { xs: 250, md: 600} }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <Box width={'100%'} pt={2}>
                  <Box display='flex' flexDirection="column" gap={2} width={'100%'} pt={2}>
                    <Typography>
                      <Translatable>
                        Are you sure you want to delete this service type?
                      </Translatable>
                    </Typography>

                    <Typography color={theme.palette.error.main}>
                      <Translatable>
                        Note: Deleting this will automatically delete everything related to it including all users and links which may cause damage to the data structures
                      </Translatable>
                    </Typography>
                  </Box>
                  <Box display={'flex'} alignItems={'center'} gap={6} pt={2}>
                    <Typography color="textSecondary" fontWeight="700">
                      <Translatable>
                        {el.en_name}
                      </Translatable>
                    </Typography>
                    <Stack spacing={1} display={'flex'} flexDirection={'row'} gap={2}>
                      <Avatar
                        variant="rounded"
                        src={el?.image}
                      >
                        {el?.image}
                      </Avatar>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight="400" whiteSpace="nowrap">
                        {el.review}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
                <Stack mt={'30px'} direction="row" justifyContent="flex-end">
                  <Button
                    color="error"
                    startIcon={<IconTrash width={18} />}
                    onClick={handleDelete}
                    disabled
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
