import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Button, 
  Grid, 
  useTheme,
  Pagination,
  TextField,
  InputAdornment
} from '@mui/material';

import PageContainer from 'src/components/container/PageContainer'
import * as yup from 'yup';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb'
import { useFormik } from 'formik';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'src/context/apiRequest';

import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from "date-fns"
import AdSingleRow from './AdSingleRow';
import ReactImageUpload from 'src/components/shared/ReactImageUpload';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import ChildCard from 'src/components/shared/ChildCard';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import CustomFormLabel from '../auth/_components/CustomFormLabel';
import CustomTextField from '../auth/_components/CustomTextField';
import TableSkeleton from 'src/Acc_components/table_skeleton/TableSkeleton';
import ErrorSkeleton from 'src/Acc_components/table_skeleton/ErrorSkeleton';
import ModalForm from 'src/Acc_components/modal/ModalForm';


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Advertisements',
  },
];

interface columnType {
  id: string;
  label: string;
  minWidth: number;
}

const columns: columnType[] = [
  { 
    id: 'Company', 
    label: 'Company', 
    minWidth: 150 
  },
  { 
    id: 'Start Date', 
    label: 'Start Date', 
    minWidth: 120 
  },
  { 
    id: 'End Date', 
    label: 'End Date', 
    minWidth: 120 
  },
  { 
    id: 'Remaining Days', 
    label: 'Remaining Days', 
    minWidth: 120 
  },
  { 
    id: 'Status', 
    label: 'Ad Status', 
    minWidth: 100 
  },
  {
    id: 'Ad Images',
    label: 'Ad Cover',
    minWidth: 150,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 120,
  },
];

export type AdPorps = {
  id: string;
  adId: string;
  company_name: string;
  description: string;
  end: string;
  start: string;
  phone: string;
  status: string;
  cover: string;
  images: [
    {
      id: string;
      path: string;
    }
  ]
}

const validationSchema = yup.object({
  description: yup.string().required('Description is required.'),
  company_name: yup.string().required('Company name is required.'),
  phone: yup.string().required('Contact number is required.'),
});


export default function Advertisements() {

  const theme = useTheme();
  const [ imageFile, setImageFile ] = useState<any>();
  const [ imageValue, setImageValue ] = useState<any>();
  const [ err, setErr ] = useState<any>();
  const [ ErrorMs, setErrorMs ] = useState<string>('');
  const [page, setPage] = useState(0);
  const [start_at, setStart_at] = useState<any>();
  const [end_at, setEnd_at] = useState<any>();
  const [search, setSearch] = useState('');


  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  
  const handleClose = () => {
    setOpenAddModal(false);
  }

  const { data: adsData, isLoading, isError } = useQuery({
    queryKey: ['advertisements', page, search],
    queryFn: async () => 
    await api().get(`/advertisements?search=${search}&page=${search ? 1 : page}`).then((res) => {
      return res.data
    })
  })

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: any) => {
      return api().post(`/advertisements/create`, values)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    }
  })

  const formik = useFormik({
    initialValues: {
      description: '',
      company_name: '',
      phone: '',
    },

    validationSchema,
    onSubmit: async (values) => {
      setErrorMs('')
      setErr('')
      const { description, company_name, phone } = values

      try {
       
        // validations 
        if (!start_at ) {
          setErrorMs('Start date is required')
          toast.error('Start date is required')
          return
        } else if (!end_at) {
          setErrorMs('End date is required')
          toast.error('End date is required')
          return
        } else if (!imageFile) {
          setErrorMs('At least one image is required')
          toast.error('images are required')
          return
        }

        const imageFiles = imageFile?.file
        console.log({ ...values, 'start_at': start_at, 'end_at': end_at, 'images': imageFiles })

        const formData = new FormData();
        formData.append('image', imageFiles);
        formData.append('description', description)
        formData.append('start_at', start_at)
        formData.append('end_at', end_at)
        formData.append('company_name', company_name)
        formData.append('phone', phone)

        // values url connections
        const res = await mutation.mutateAsync(formData)
        console.log(res)
        toast.error('Advertisement created successfully')
      
        // input clear up
        formik.setFieldValue('description', '')
        formik.setFieldValue('start_at', '')
        formik.setFieldValue('end_at', '')
        formik.setFieldValue('en_ncompany_nameame', '')
        formik.setFieldValue('phone', '')
        setImageFile(undefined)
        setImageValue(undefined)
      
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

  // handle search function
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };


  const handleChangePage = (_event: any, page: number) => {
    setPage(page)
  }

  return (
    <PageContainer title="ACC Advertisements" description="this is advertisements page">
      <Breadcrumb title="Advertisements" items={BCrumb} />
      
        <Grid container>
          <Box width={'100%'}>
            <Stack  my={'20px'} direction="row" justifyContent="flex-end">
                {!openAddModal && (
                    <Button sx={{ width: { md: '150px', xs: '100%', backgroundColor: theme.palette.primary.dark }}} variant="contained" onClick={() => setOpenAddModal(!openAddModal)}>
                      <IconPlus size={17} style={{ paddingRight: 3 }}/>
                      <Translatable>Add New Ad</Translatable>
                    </Button>
                )}  
            </Stack>
          </Box>

          <ModalForm
            openModal={openAddModal} 
            handleClose={handleClose}
            title='Add New Advertisement'
            sx={{overflow: 'scroll'}}
          >
            <Box justifyContent={'center'} alignItems={'center'} width={{ sm: '500px', md:'800px', lg: '900px'}}>
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
                                const formattedStartDate = format(date, "yyyy-MM-dd");
                                setStart_at(formattedStartDate);
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
                                const formattedEndDate = format(date, "yyyy-MM-dd");
                                setEnd_at(formattedEndDate);
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
                    {ErrorMs && (
                      <Box paddingTop={1}>
                        <Typography textAlign={'center'} sx={{color: theme.palette.error.main}}>
                          {ErrorMs}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Stack my={'20px'} direction="row" justifyContent="flex-end">
                    <Button sx={{width: {md: '150px', xs: '100%', backgroundColor: theme.palette.primary.dark }}} variant="contained" type="submit">
                      {isSubmitting ? <Translatable>Processing...</Translatable> : <Translatable>Submit</Translatable>}  
                    </Button>
                  </Stack>
                </form>
              </Box>
          </ModalForm>

          <ChildCard>
            <Box paddingBottom={4}>
              <Box paddingBottom={0}>
                <Typography color={theme.palette.primary.dark} variant="h4" mt={1} fontWeight="600">
                  <Translatable>
                    ALL ADVERTISEMENTS
                  </Translatable>
                </Typography>
              </Box>
              
              <Stack direction="row" justifyContent="flex-end">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch size="1.1rem" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: {sm: '100%', lg: '300px'} }}
                  placeholder="Search Ads"
                  size="medium"
                  onChange={handleSearch}
                  value={search}
                />
              </Stack>
            </Box>

            <TableContainer >
              { adsData ? ( 
                  <>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column: any) => (
                            <TableCell
                              key={column.id}
                              style={{ minWidth: column.minWidth }}
                            >
                              <Typography variant="h6" fontWeight="500">
                                <Translatable>
                                  {column.label}
                                </Translatable>
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {adsData?.data?.map((el: any) => {
                          return (
                            <AdSingleRow key={el?.id} el={el}/>
                          );
                        })}
                      </TableBody>
                    </Table>
                    <Box width={'100%'} display={'flex'} justifyContent={'center'} paddingY={5}
                    >
                      <Pagination
                        count={adsData?.meta?.last_page} 
                        shape="rounded"
                        color="primary" 
                        variant='outlined'
                        page={adsData?.meta?.current_page}
                        onChange={handleChangePage}
                      />
                    </Box>
                  </>

                ) : isLoading ? (
                    <TableSkeleton/>
                ) : isError && (
                  <Box>
                    <ErrorSkeleton/>
                  </Box>
                )
              }
    
            
            </TableContainer>
          </ChildCard>

        </Grid>
    </PageContainer>

  )
}
