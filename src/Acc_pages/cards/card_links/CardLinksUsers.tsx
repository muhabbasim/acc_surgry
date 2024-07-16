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
  Autocomplete,
  Pagination,
  TextField,
  InputAdornment,
} from '@mui/material';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'src/context/apiRequest';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { IconSearch } from '@tabler/icons-react';
import ChildCard from 'src/components/shared/ChildCard';
import { IconPlus } from '@tabler/icons-react';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import TableSkeleton, { TableSkeleton2 } from 'src/Acc_components/table_skeleton/TableSkeleton';
import ErrorSkeleton from 'src/Acc_components/table_skeleton/ErrorSkeleton';
import ModalForm from 'src/Acc_components/modal/ModalForm';
import CustomFormLabel from 'src/Acc_pages/auth/_components/CustomFormLabel';
import CustomCheckbox from 'src/Acc_pages/auth/_components/CustomCheckbox';
import CustomTextField from 'src/Acc_pages/auth/_components/CustomTextField';
import CardLinkSingleRow from './_components/CardLinkSingleRow';


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Document link',
  },
];


type OptionProps = {
  id: string;
  name: string;
}

type DocumentProps = {
  id: string;
  name: string;
}

export default function DocumentLinks() {

  const theme = useTheme();
  const [selectdCardType, setSelectdCardType] = useState<object>(); 
  const [selectedUserType, setSelectedUserType] = useState<object>(); 

  const [err, setErr] = useState<string>('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');


  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  
  const handleClose = () => {
    setOpenAddModal(false);
  }

  const { data: userTypes } = useQuery({
    queryKey: ['user_types'],
    queryFn: async () => 
    await api().get(`/user-types/list`).then((res) => {
      return res.data
    })
  })

  // get fields data
  const { data: cardsData } = useQuery({
    queryKey: ['cards_type'],
    queryFn: async () => 
    await api().get(`/cards/list`).then((res) => {
      return res.data
    })
  })

  // get links data
  const { data: linksData, isLoading, isError } = useQuery({
    queryKey: ['card_links', page, search],
    queryFn: async () => 
    await api().get(`/user-types/has-cards?search=${search}&page=${search ? 1 : page}`).then((res) => {
      return res.data
    })
  })


  // create links 
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: object) => {
      return api().post(`/user-type-cards/create`, values)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['card_links'] });
    }
  })
    
  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      try {
        console.log({ user_types: selectedUserType, cards: selectdCardType });

        const res =  await mutation.mutateAsync({ user_types: selectedUserType, cards: selectdCardType })
        console.log(res);
        toast.success('Link created successfully')
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
    <PageContainer title="ACC Cards link" description="this is Cards link page">
      <Breadcrumb title="Cards link" items={BCrumb} />
      
      <Grid container paddingX={{ sm: 0, md: 2, lg:2 }}>

        <Box width={'100%'}>
          <Stack  my={'20px'} direction="row" justifyContent="flex-end">
              {!openAddModal && (
                <Button sx={{ width: { md: '200px', xs: '100%', backgroundColor: theme.palette.primary.dark }}} variant="contained" onClick={() => setOpenAddModal(!openAddModal)}>
                  <IconPlus size={17} style={{ paddingRight: 3 }}/>
                  <Translatable>Add New Card Link</Translatable>
                </Button>
              )}  
            </Stack>
        </Box>

        <ModalForm
          openModal={openAddModal} 
          handleClose={handleClose}
          title='Add Card Links'
        >
          <Box sx={{ minWidth: { sm: '100%', md: 600, lg: 700 } }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
            { cardsData && userTypes ? (
              
              <Box justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <form onSubmit={formik.handleSubmit}>
                  <Stack 
                    justifyContent={'center'}
                    sx={{ display: 'flex', flexDirection: { sx:'column', md: 'row', lg: 'row'}, gap: { md: 5 } }}
                  >
                    <Box width={{sm: '100%', md:'50%' }}>
                      <CustomFormLabel>
                        <Translatable>
                          Select User Type
                        </Translatable>
                      </CustomFormLabel>

                      <Autocomplete
                        multiple
                        id="multi_user_types"
                        options={userTypes}
                        disableCloseOnSelect
                        getOptionLabel={(option: DocumentProps) => option?.name}
                        onChange={(_e, values) => {
                          const selectedId = values?.map((el: any) => el.id)
                          setSelectedUserType(selectedId);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderOption={(props, option, { selected }) => {
                          return (
                            <li {...props}>
                              <CustomCheckbox style={{ marginRight: 8 }} checked={selected} />
                              {option?.name}
                            </li>
                          )
                        }}
                        fullWidth
                        // filterSelectedOptions
                        renderInput={(params) => (
                          <CustomTextField {...params} placeholder="User Type" aria-label="User Type" />
                        )}
                      />
                    </Box>
                    <Box width={{sm: '100%', md:'50%' }}>
                      <CustomFormLabel>
                        <Translatable>
                          Select Card Type
                        </Translatable>
                      </CustomFormLabel>
                      <Autocomplete
                        multiple
                        id="multi_card_types"
                        options={cardsData}
                        disableCloseOnSelect
                        getOptionLabel={(option: OptionProps) => option?.name}
                        onChange={(_e, values) => {
                          const selectedId = values?.map((el: any) => el.id)
                          setSelectdCardType(selectedId);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderOption={(props, option, { selected }) => {
                          return (
                            <li {...props}>
                              <CustomCheckbox style={{ marginRight: 8 }} checked={selected} />
                              {option?.name}
                            </li>
                          )
                        }}
                        fullWidth
                        filterSelectedOptions
                        renderInput={(params) => (
                          <CustomTextField {...params} placeholder="Card Type" aria-label="Card Type" />
                        )}
                      />
                    </Box>

                  </Stack>

                  {err && (
                    <Box paddingTop={4}>
                      <Typography textAlign={'center'} sx={{color: theme.palette.error.main}}>
                        {err}
                      </Typography>
                    </Box>
                  )}

                  <Stack my={'20px'} direction="row" justifyContent="flex-end">
                    <Button sx={{width: {md: '150px', xs: '100%'}}} variant="contained" type="submit">
                      {isSubmitting ? <Translatable>Processing...</Translatable> : <Translatable>Submit</Translatable>}  
                    </Button>
                  </Stack>
                </form>
              </Box>

              ) : isLoading ? (
                  <TableSkeleton2/>
              ) : isError && (
                <Box>
                  <Typography>
                    Server Error...
                  </Typography>
                </Box>
              )
            }
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
          { linksData ? ( 
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
                    <TableCell />
                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          User Type
                        </Translatable>
                      </Typography>
                    </TableCell>
               
                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Number of Cards
                        </Translatable>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                {linksData?.map((row: any) => {
                  return (
                    <CardLinkSingleRow key={row.id} row={row} />
                  )
                })}
                </TableBody>
              </Table>
              <Box width={'100%'} display={'flex'} justifyContent={'center'} paddingY={5}>
                <Pagination
                  count={linksData?.meta?.last_page} 
                  shape="rounded"
                  color="primary" 
                  variant='outlined'
                  page={linksData?.meta?.current_page}
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
