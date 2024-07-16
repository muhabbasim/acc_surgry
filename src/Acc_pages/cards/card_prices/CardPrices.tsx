import PageContainer from 'src/components/container/PageContainer'
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb'
import { useFormik } from 'formik';
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
  MenuItem,
  FormHelperText,
  Switch,
} from '@mui/material';
import * as yup from 'yup';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'src/context/apiRequest';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { IconSearch } from '@tabler/icons-react';
import ChildCard from 'src/components/shared/ChildCard';
import { IconPlus } from '@tabler/icons-react';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import TableSkeleton from 'src/Acc_components/table_skeleton/TableSkeleton';
import ErrorSkeleton from 'src/Acc_components/table_skeleton/ErrorSkeleton';
import ModalForm from 'src/Acc_components/modal/ModalForm';
import CustomFormLabel from 'src/Acc_pages/auth/_components/CustomFormLabel';
import CustomTextField from 'src/Acc_pages/auth/_components/CustomTextField';
import CardDiscountSingleRow from './_components/CardDiscountSingleRow';
import CustomSelect from 'src/Acc_components/form_components/custom_elements/CustomSelect';


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Document link',
  },
];

const validationSchema = yup.object({
  discount: yup.string().required('discount is required.'),
  reservation_count: yup.string().required('reservation_count is required.'),
  card_id: yup.string().required('card_id is required.'),
  isActive: yup.boolean(),
});

export default function DocumentLinks() {

  const theme = useTheme();
  const [err, setErr] = useState<string>('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  
  const handleClose = () => {
    setOpenAddModal(false);
  }

  // get fields data

  const { data: cardsData } = useQuery({
    queryKey: ['cards_list'],
    queryFn: async () => 
    await api().get(`/cards/list`).then((res) => {
      return res.data
    })
  })
  
  const { data: discountsData, isLoading, isError } = useQuery({
    queryKey: ['discounts_data', page, search],
    queryFn: async () => 
    await api().get(`/cards/discounts?search=${search}&page=${search ? 1 : page}`).then((res) => {
      return res.data
    })
  })


  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: any) => {
      return api().post(`/discounts/create`, values)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts_data'] });
    }
  })
  
  const formik = useFormik({
    initialValues: {
      reservation_count: '',
      discount: '',
      card_id: '',
      isActive: false,
    },
    
    validationSchema,
    onSubmit: async (values) => {
      try {

        const res = await mutation.mutateAsync(values)
        console.log(res)
        toast.success('Discount created successfully')

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

  // handle search function
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (_event: any, page: number) => {
    setPage(page)
  }


  return (
    <PageContainer title="SDC Document link" description="this is Document link page">
      <Breadcrumb title="Document link" items={BCrumb} />
      
      <Grid container paddingX={{ sm: 0, md: 2, lg:2 }}>

        <Box width={'100%'}>
          <Stack  my={'20px'} direction="row" justifyContent="flex-end">
              {!openAddModal && (
                  <Button sx={{ width: { md: '150px', xs: '100%', backgroundColor: theme.palette.primary.dark }}} variant="contained" onClick={() => setOpenAddModal(!openAddModal)}>
                    <IconPlus size={17} style={{ paddingRight: 3 }}/>
                    <Translatable>Add Discount</Translatable>
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
                  <Box width={{ sx: '100%', md: '100%'}}>
                    <CustomFormLabel>
                      <Translatable>
                        Select Card Type
                      </Translatable>
                    </CustomFormLabel>
                    <CustomSelect
                      labelId="field_type_select"
                      id="card_id"
                      fullWidth
                      name="card_id"
                      value={formik.values.card_id} 
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {cardsData?.map((el: any) => (
                        <MenuItem key={el.name} value={el.id}>{el.name}</MenuItem>
                      ))}
                    </CustomSelect>
                    {formik.errors.card_id && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {' '}
                        {formik.errors.card_id}{' '}
                      </FormHelperText>
                    )}
                  </Box>
                  <Box width={{ sx: '100%', md: '100%'}}>
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
                </Box>
              
                <Box display={'flex'} flexDirection={{sm: 'column', md: 'column', lg: 'row',}} gap={2}>
                  
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
                  ALL CARD LINKS
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
                placeholder="Search Links"
                size="medium"
                onChange={handleSearch}
                value={search}
              />
            </Stack>
          </Box>

          <TableContainer>
          { discountsData ? ( 
            <>
              <Table
                aria-label="collapsible table"
                sx={{
                  whiteSpace: {
                    xs: 'nowrap',
                    sm: 'unset',
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell width={300}>
                      <Typography variant="h6">
                        <Translatable>
                          Show Discounts
                        </Translatable>
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Label En
                        </Translatable>
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Label Ar
                        </Translatable>
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Card Price
                        </Translatable>
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Status
                        </Translatable>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                {discountsData?.data?.map((row: any) => {
                  return (
                    <CardDiscountSingleRow key={row.id} row={row} />
                  )
                })}
                </TableBody>
              </Table>
              <Box width={'100%'} display={'flex'} justifyContent={'center'} paddingY={5}>
                <Pagination
                  count={discountsData?.meta?.last_page} 
                  shape="rounded"
                  color="primary" 
                  variant='outlined'
                  page={discountsData?.meta?.current_page}
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
