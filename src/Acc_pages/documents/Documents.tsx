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
  MenuItem,
  FormHelperText,
  Switch,
  Pagination,
  TextField,
  InputAdornment
} from '@mui/material';
import { useFormik } from 'formik';

import PageContainer from 'src/components/container/PageContainer'
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb'
import * as yup from 'yup';
import DocumentSingleRow from './DocumentSingleRow';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'src/context/apiRequest';
import { toast } from 'sonner';
import { useState } from 'react';

import { IconPlus, IconSearch } from '@tabler/icons-react';
import ChildCard from 'src/components/shared/ChildCard';
import { AxiosError } from 'axios';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import CustomFormLabel from '../auth/_components/CustomFormLabel';
import CustomTextField from '../auth/_components/CustomTextField';
import CustomSelect from 'src/Acc_components/form_components/custom_elements/CustomSelect';
import TableSkeleton from 'src/Acc_components/table_skeleton/TableSkeleton';
import ErrorSkeleton from 'src/Acc_components/table_skeleton/ErrorSkeleton';
import ModalForm from 'src/Acc_components/modal/ModalForm';


const validationSchema = yup.object({
  en_name: yup.string().required('Label in English is required.'),
  ar_name: yup.string().required('Label in Arabic is required.'),
  type: yup.string().required('Document type is required.'),
  isActive: yup.boolean(),
});

interface columnType {
  id: string;
  label: string;
  minWidth: number;
}


const columns: columnType[] = [
  { 
    id: 'Label En', 
    label: 'Label En', 
    minWidth: 170 
  },
  { 
    id: 'Label Ar', 
    label: 'Label Ar', 
    minWidth: 170 
  },
  {
    id: 'earnings',
    label: 'Document Type',
    minWidth: 170,
  },
  {
    id: 'Active',
    label: 'Is Active',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
  },
];


const DocTypeData = [
  {
    id: 'image',
    name: 'Image',
  },
  {
    id: 'pdf',
    name: 'PDF',
  },
  {
    id: 'vid',
    name: 'Video',
  },
];

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Documents',
  },
];


export default function Documents() {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [ err, setErr ] = useState<any>();


  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  
  const handleClose = () => {
    setOpenAddModal(false);
  }

  const { data: documentsData, isLoading, isError } = useQuery({
    queryKey: ['documents', page, search],
    queryFn: async () => 
    await api().get(`/document-types?search=${search}&page=${search ? 1 : page}`).then((res) => {
      return res.data
    })
  })

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: object) => {
      return api().post(`/document-types/create`, values)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    }
  })

  const formik = useFormik({
    initialValues: {
      en_name: '',
      ar_name: '',
      type: '',
      isActive: false,
    },

    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const res = await mutation.mutateAsync(values);
        console.log(res);
        toast.success('Document created successfully')
        formik.setFieldValue('ar_name', '')
        formik.setFieldValue('en_name', '')

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
    <PageContainer title="SDC Documents" description="this is documents page">
      <Breadcrumb title="Documents" items={BCrumb} />
      
      <Grid container>
        <Box width={'100%'}>
          <Stack  my={'20px'} direction="row" justifyContent="flex-end">
            {!openAddModal && <Button sx={{ width: { md: '150px', xs: '100%', backgroundColor: theme.palette.primary.dark }}} variant="contained" onClick={() => setOpenAddModal(!openAddModal)}>
              <IconPlus size={17} style={{ paddingRight: 3 }}/>
              <Translatable>Add Document</Translatable>
            </Button>}
          </Stack>
          
          <ModalForm
            openModal={openAddModal} 
            handleClose={handleClose}
            title='Add Document'
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
                          Select Document Type
                        </Translatable>
                      </CustomFormLabel>
                      <CustomSelect
                        labelId="type_select"
                        id="type"
                        fullWidth
                        name="type"
                        value={formik.values.type} 
                        onChange={formik.handleChange}
                      >
                        {DocTypeData.map((el) => (
                          <MenuItem key={el.name} value={el.id}>{el.name}</MenuItem>
                        ))}
                      </CustomSelect>
                      {formik.errors.type && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {' '}
                          {formik.errors.type}{' '}
                        </FormHelperText>
                      )}
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

        </Box>

        <ChildCard>
          <Box paddingBottom={4}>
            <Box paddingBottom={0}>
              <Typography color={theme.palette.primary.dark} variant="h4" mt={1} fontWeight="600">
                <Translatable>
                  ALL ADDED DOCUMENTS
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
                placeholder="Search Documents"
                size="medium"
                onChange={handleSearch}
                value={search}
              />
            </Stack>
          </Box>
        
          <TableContainer>
            { documentsData ? ( 
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
                      {documentsData?.data?.map((el: any) => {
                        return (
                          <DocumentSingleRow key={el?.id} el={el} selection={DocTypeData}/>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <Box width={'100%'} display={'flex'} justifyContent={'center'} paddingY={5}
                  >
                    <Pagination
                      count={documentsData?.meta?.last_page} 
                      shape="rounded"
                      color="primary" 
                      variant='outlined'
                      page={documentsData?.meta?.current_page}
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
