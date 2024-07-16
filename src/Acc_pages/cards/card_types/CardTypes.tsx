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
  InputAdornment,
  Switch
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
import ReactImageUpload from 'src/components/shared/ReactImageUpload';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import ChildCard from 'src/components/shared/ChildCard';
import Translatable from 'src/Acc_components/translatable_text/Translatable';

import TableSkeleton from 'src/Acc_components/table_skeleton/TableSkeleton';
import ErrorSkeleton from 'src/Acc_components/table_skeleton/ErrorSkeleton';
import ModalForm from 'src/Acc_components/modal/ModalForm';
import CustomFormLabel from 'src/Acc_pages/auth/_components/CustomFormLabel';
import CustomTextField from 'src/Acc_pages/auth/_components/CustomTextField';
import CardTypeRow from './CardTypeRow';


interface columnType {
  id: string;
  label: string;
  minWidth: number;
}

const columns: columnType[] = [
  { 
    id: 'label En', 
    label: 'Label En', 
    minWidth: 150 
  },
  { 
    id: 'label Ar', 
    label: 'Label Ar', 
    minWidth: 150 
  },
  { 
    id: 'Price', 
    label: 'Price', 
    minWidth: 150 
  },
  { 
    id: 'Status', 
    label: 'Ad Status', 
    minWidth: 100 
  },
  {
    id: 'Ad Images',
    label: 'Card Image',
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
  en_name: yup.string().required('Label in English is required.'),
  ar_name: yup.string().required('Label in Arabic is required.'),
  price: yup.string().required('price is required.'),
  isActive: yup.boolean(),
});


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Card Types',
  },
];

export default function CardTypes() {

  const theme = useTheme();
  const [ imageFile, setImageFile ] = useState<any>();
  const [ imageValue, setImageValue ] = useState<any>();
  const [ err, setErr ] = useState<any>();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');


  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  
  const handleClose = () => {
    setOpenAddModal(false);
  }

  const { data: cardsData, isLoading, isError } = useQuery({
    queryKey: ['cards', page, search],
    queryFn: async () => 
    await api().get(`/cards?search=${search}&page=${search ? 1 : page}`).then((res) => {
      return res.data
    })
  })

  // console.log(cardsData)

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: any) => {
      return api().post(`/cards/create`, values)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    }
  })

  const formik = useFormik({
    initialValues: {
      en_name: '',
      ar_name: '',
      price: '',
      isActive: false,
    },

    validationSchema,
    onSubmit: async (values) => {
      setErr('')
      const { ar_name, en_name, isActive, price } = values
      // console.log(values)

      try {
       
        const imageFiles = imageFile?.file
        // console.log({ ...values, 'images': imageFiles })

        const formData = new FormData();
        formData.append('image', imageFiles);
        formData.append('ar_name', ar_name)
        formData.append('en_name', en_name)
        formData.append('price', price)
        formData.append('isActive', new Boolean(isActive).toString())

        // values url connections
        const res = await mutation.mutateAsync(formData)
        console.log(res)
        toast.error('Card created successfully')
      
        // input clear up
        formik.setFieldValue('ar_name', '')
        formik.setFieldValue('en_name', '')
        formik.setFieldValue('price', '')
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
    <PageContainer title="SDC Card Types" description="this is Card Types page">
      <Breadcrumb title="Card Types" items={BCrumb} /> 
      
      <Grid container>
          <Box width={'100%'}>
            <Stack  my={'20px'} direction="row" justifyContent="flex-end">
                {!openAddModal && (
                    <Button sx={{ width: { md: '150px', xs: '100%', backgroundColor: theme.palette.primary.dark }}} variant="contained" onClick={() => setOpenAddModal(!openAddModal)}>
                      <IconPlus size={17} style={{ paddingRight: 3 }}/>
                      <Translatable>Add New Card</Translatable>
                    </Button>
                )}  
            </Stack>
          </Box>

          <ModalForm
            openModal={openAddModal} 
            handleClose={handleClose}
            title='Add New Card'
            sx={{overflow: 'scroll'}}
          >
            <Box justifyContent={'center'} alignItems={'center'} width={{ sm: '500px', md:'800px', lg: '900px'}}>
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
                            color="error"
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
                    ALL CARDS ADDED
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
                  placeholder="Search cards"
                  size="medium"
                  onChange={handleSearch}
                  value={search}
                />
              </Stack>
            </Box>

            <TableContainer >
              { cardsData ? ( 
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
                        {cardsData?.data?.map((el: any) => {
                          return (
                            <CardTypeRow key={el?.id} el={el}/>
                          );
                        })}
                      </TableBody>
                    </Table>
                    <Box width={'100%'} display={'flex'} justifyContent={'center'} paddingY={5}
                    >
                      <Pagination
                        count={cardsData?.meta?.last_page} 
                        shape="rounded"
                        color="primary" 
                        variant='outlined'
                        page={cardsData?.meta?.current_page}
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
