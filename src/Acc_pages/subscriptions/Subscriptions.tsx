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
  Grid, 
  useTheme,
  Pagination,
  TextField,
  InputAdornment
} from '@mui/material';

import PageContainer from 'src/components/container/PageContainer'
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb'
import { useQuery } from '@tanstack/react-query';
import api from 'src/context/apiRequest';
import { useState } from 'react';

import { IconSearch } from '@tabler/icons-react';
import ChildCard from 'src/components/shared/ChildCard';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import TableSkeleton from 'src/Acc_components/table_skeleton/TableSkeleton';
import ErrorSkeleton from 'src/Acc_components/table_skeleton/ErrorSkeleton';
import SingleSubscription from './SingleSubscription';


interface columnType {
  id: string;
  label: string;
  minWidth: number;
}


const columns: columnType[] = [
  { 
    id: 'card_id', 
    label: 'Card Id', 
    minWidth: 170 
  },
  { 
    id: 'Card Type', 
    label: 'Card Type', 
    minWidth: 170 
  },
  {
    id: 'start_date',
    label: 'Start Date',
    minWidth: 170,
  },
  {
    id: 'end_date',
    label: 'Exp Date',
    minWidth: 170,
  },
  {
    id: 'user',
    label: 'User Information',
    minWidth: 170,
  },
];


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Subscriptions',
  },
];


const subscriptionsData = [
  {
      id: 1,
      card_id: "101",
      card_type: "platinum",
      subscription_date: "2024-01-01",
      exp_date: "2024-12-31",
      user_info: {
          name: "John Doe",
          email: "john.doe@example.com"
      }
  },
  {
      id: 2,
      card_id: "102",
      card_type: "gold",
      subscription_date: "2024-02-01",
      exp_date: "2024-11-30",
      user_info: {
          name: "Jane Smith",
          email: "jane.smith@example.com"
      }
  },
  {
      id: 3,
      card_id: "103",
      card_type: "selver",
      subscription_date: "2024-03-01",
      exp_date: "2024-10-31",
      user_info: {
          name: "Alice Johnson",
          email: "alice.johnson@example.com"
      }
  },
  {
      id: 4,
      card_id: "104",
      card_type: "platinum",
      subscription_date: "2024-04-01",
      exp_date: "2024-09-30",
      user_info: {
          name: "Bob Brown",
          email: "bob.brown@example.com"
      }
  },
  {
      id: 5,
      card_id: "105",
      card_type: "gold",
      subscription_date: "2024-05-01",
      exp_date: "2024-08-31",
      user_info: {
          name: "Carol White",
          email: "carol.white@example.com"
      }
  }
]


export default function Subscriptions() {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data: subscriptionData, isLoading, isError } = useQuery({
    queryKey: ['documents', page, search],
    queryFn: async () => 
    await api().get(`/field-docs?search=${search}&page=${search ? 1 : page}`).then((res) => {
      return res.data
    })
  })

  // handle search function
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (_event: any, page: number) => {
    setPage(page)
  }
  
  return (
    <PageContainer title="SDC Subscriptions" description="this is Subscriptions page">
      <Breadcrumb title="Subscriptions" items={BCrumb} />
      
      <Grid container sx={{ pt: 4 }}>
        <ChildCard>
          <Box paddingBottom={4}>
            <Box paddingBottom={0}>
              <Typography color={theme.palette.primary.dark} variant="h4" mt={1} fontWeight="600">
                <Translatable>
                  ALL SUBSCRIPTIONS
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
            { subscriptionsData ? ( 
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
                      {subscriptionsData?.map((el: any) => {
                        return (
                          <SingleSubscription key={el?.id} el={el}/>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <Box width={'100%'} display={'flex'} justifyContent={'center'} paddingY={5}
                  >
                    <Pagination
                      count={subscriptionData?.meta?.last_page} 
                      shape="rounded"
                      color="primary" 
                      variant='outlined'
                      page={subscriptionData?.meta?.current_page}
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

