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
} from '@mui/material';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';

import api from 'src/context/apiRequest';
import { format } from "date-fns"

import * as yup from 'yup';
import { AdPorps } from './Advertisements';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Link } from 'react-router-dom';
import ReactImageUpload from 'src/components/shared/ReactImageUpload';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import ImageDisplay from 'src/Acc_components/imageDialog/ImageDisplay';
import ModalForm from 'src/Acc_components/modal/ModalForm';
import CustomTextField from '../auth/_components/CustomTextField';
import CustomFormLabel from '../auth/_components/CustomFormLabel';


const validationSchema = yup.object({
  description: yup.string().required('Description is required.'),
  phone: yup.string().required('Phone is required.'),
  company_name: yup.string().required('Company Name is required.'),
});

type Props = {
  el: AdPorps;
}
    
export default function AdSingleRow({el}: Props) {
  const theme = useTheme();

  // date manipulation
  const elStartDate = new Date(el.start).getTime()
  const FormatedStartDate = new Date(elStartDate)
  const elEndDate = new Date(el.end).getTime()
  const FormatedEndDate = new Date(elEndDate)

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [ err, setErr ] = useState<any>();
  const [start_at, setStart_at] = useState<any>(FormatedStartDate);
  const [end_at, setEnd_at] = useState<any>(FormatedEndDate);

  // image procesadId, el.ng
  const [ imageFile, setImageFile ] = useState<any>();
  const [ imageValue, setImageValue ] = useState<any>();

  // Calculating the time difference of two dates
  const today = new Date().getTime()
  const one_day = 1000 * 60 * 60 * 24;
  const Difference_In_Time = elEndDate - today;
  // Calculating the no. of days between two dates
  const remainingDays = Math.round(Difference_In_Time / one_day);

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
      return api().post(`/advertisements/update/${el.id}`, values)
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements']})
    }
  })

  const deleteMutation = useMutation({
    mutationFn: () => {
      return api().delete(`/advertisements/${el?.id}`)
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements']})
    }
  })

  const formik = useFormik({
    initialValues: {
      description: el?.description,
      company_name: el?.company_name,
      phone: el?.phone,
    },

    validationSchema,
    onSubmit: async (values) => {
      try {
        const { description, company_name, phone } = values
        // image processing
        const image = imageFile?.file

        const formattedStartDate = format(start_at, "yyyy-MM-dd");
        const formattedEndDate = format(end_at, "yyyy-MM-dd");

        console.log({ ...values, start_at: formattedStartDate, end_at: formattedEndDate })
        
        const formData = new FormData();
        formData.append('image', image);
        formData.append('company_name', company_name)
        formData.append('description', description)
        formData.append('phone', phone)
        formData.append('start_at', formattedStartDate)
        formData.append('end_at', formattedEndDate)

        const res = await editMutation.mutateAsync( image? formData : { ...values, start_at: formattedStartDate, end_at: formattedEndDate } )
        console.log(res)

        toast.error('Advertisement updated successfully')

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
      <TableRow hover key={el.adId}>
        <TableCell>
          <Stack spacing={1}>
            <Typography color="primary" variant="h6" fontWeight="600">
              {el.company_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack spacing={1}>
            <Typography color="secondary" variant="h6" fontSize={14} fontWeight="600">
              {el.start}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack spacing={1}>
            <Typography color="error" fontSize={14} variant="h6" fontWeight="600">
              {el.end}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack spacing={1}>
            <Chip 
              label={
                <Typography>
                  {remainingDays > 0 ? remainingDays : <Translatable>Expired</Translatable>} 
                  {' '}
                  {remainingDays < 1 ? " " : <Translatable>Days</Translatable>} 
                </Typography>
              }
              variant='filled' 
              sx={{ 
                width: 100, 
                color: theme.palette.grey[500], 
                backgroundColor: theme.palette.grey[200] 
              }}
            />
          </Stack>
        </TableCell>

        <TableCell>
          <Box>
            {el?.status === 'active' ? (
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
              src={el.cover}
              alt={el.cover}
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
            photo={el?.cover}
          />
        </TableCell>

        <TableCell>
          <Link to={`/ad_details/${el?.id}`}>
            <IconButton>
              <IconEye width={18} height={18} color={theme.palette.primary.main}/>
            </IconButton>
          </Link>
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
              title='Edit Advertisement'
            >
              <Box sx={{ minWidth: { sm: '100%', md: 600, lg: 700 } }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <form onSubmit={formik.handleSubmit}>
                <Stack 
                    justifyContent={'center'}
                  >
                    <Box sx={{ display: {md:'flex'}, flexDirection: { sx:'column', md: 'row', lg: 'row'}, gap: { md: 5 } }}>
                      <Box width={{sm: '100%', md:'50%' }}>
                        <CustomFormLabel>
                          <Translatable>
                            Company Name
                          </Translatable>
                        </CustomFormLabel>
                        <CustomTextField
                          fullWidth
                          id="company_name"
                          name="company_name"
                          value={formik.values.company_name}
                          onChange={formik.handleChange}
                          error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                          helperText={formik.touched.company_name && formik.errors.company_name}
                        />
                      </Box>
                      <Box width={{sm: '100%', md:'50%' }}>
                        <CustomFormLabel>
                          <Translatable>
                            Contact Number
                          </Translatable>
                        </CustomFormLabel>
                        <CustomTextField
                          fullWidth
                          id="phone"
                          name="phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          error={formik.touched.phone && Boolean(formik.errors.phone)}
                          helperText={formik.touched.phone && formik.errors.phone}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ display: {md:'flex'}, flexDirection: { sx:'column', md: 'row', lg: 'row'}, gap: { md: 5 } }}>
                      <Box width={{sm: '100%', md:'50%' }}>
                        <CustomFormLabel>
                          <Translatable>
                            Start Date
                          </Translatable>
                        </CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                         
                            renderInput={(props) => (
                              <CustomTextField
                                {...props}
                                fullWidth
                                sx={{
                                  '& .MuiSvgIcon-root': {
                                    width: 18,
                                    height: 18,
                                  },
                                  '& .MuiFormHelperText-root': {
                                    display: 'none',
                                  },
                                }}
                              />
                            )}
                            value={start_at}
                            onChange={(date: any) => {
                              if (date instanceof Date) {
                                // const formattedDate = format(date, "yyyy-MM-dd");
                                setStart_at(date);
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Box>
                      
                      <Box width={{sm: '100%', md:'50%' }}>
                        <CustomFormLabel>
                          <Translatable>
                            End Date
                          </Translatable>
                        </CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            renderInput={(props) => (
                              <CustomTextField
                                {...props}
                                fullWidth
                                sx={{
                                  '& .MuiSvgIcon-root': {
                                    width: 18,
                                    height: 18,
                                  },
                                  '& .MuiFormHelperText-root': {
                                    display: 'none',
                                  },
                                }}
                              />
                            )}
                            value={end_at}
                            onChange={(date: any) => {
                              if (date instanceof Date) {
                                // const formattedDate = format(date, "yyyy-MM-dd");
                                setEnd_at(date);
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Box>
                    </Box>

                    <Box sx={{ display: {md:'flex'}, flexDirection: { sx:'column', md: 'row', lg: 'row'}, gap: { md: 5 } }}>
                      <Box width={{sm: '100%', md:'50%' }}>
                        <CustomFormLabel>
                          <Translatable>
                            Ad description
                          </Translatable>
                        </CustomFormLabel>
                        <CustomTextField
                          id="description"
                          name="description"
                          placeholder="Write description about this advertisement"
                          multiline
                          fullWidth
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          error={formik.touched.description && Boolean(formik.errors.description)}
                          helperText={formik.touched.description && formik.errors.description}
                        />
                      </Box>
                      
                      <Box width={{sm: '100%', md:'50%' }}>
                        <CustomFormLabel>
                          <Translatable>
                            Ad Cover
                          </Translatable>
                        </CustomFormLabel>

                        <ReactImageUpload
                          setImageFile={setImageFile} 
                          imageFile={imageFile} 
                          imageValue={imageValue} 
                          setImageValue={setImageValue}
                        />
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
                    <Button sx={{ width: {xs: '100%', lg: '150px', md: '100%'}}} variant="contained" type="submit">
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
              title='Delete Rank'
            >
              <Box sx={{ width: { xs: 250, md: 400} }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <Box width={'100%'} pt={2}>
                  <Box>
                    <Typography sx={{ color: theme.palette.error.main}}>
                      <Translatable>
                        Are you sure you want to delete this Advertisement?
                      </Translatable>
                    </Typography>
                  </Box>

                  <Box display={'flex'} alignItems={'center'} gap={6} pt={2}>
                    <Typography color="textSecondary" fontWeight="700">
                      <Translatable>
                        {el.company_name}
                      </Translatable>
                    </Typography>
                    {
                      el.images.map((image) => (
                        <img
                          key={image.id}
                          src={image.path}
                          alt={image.path}
                          style={{
                            borderRadius: 3,
                            width: 50,
                          }}
                        />
                      ))
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
