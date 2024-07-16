import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ChildCard from 'src/components/shared/ChildCard';
import { useQuery } from '@tanstack/react-query';
import api from 'src/context/apiRequest';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Pagination,
  TableContainer,
  useTheme,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';

import { IconSearch } from '@tabler/icons-react';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import TableSkeleton from 'src/Acc_components/table_skeleton/TableSkeleton';
import ErrorSkeleton from 'src/Acc_components/table_skeleton/ErrorSkeleton';
import RequestRow from './RequestRow';


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Requests',
  },
];


export type RequestProps = {
  id: number;
  request_id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  username: string;
  idNum: string;
  birthdate: string;
  registered_at: string;
  rank: string;
  isActive: boolean;
  isApproved: boolean;
  Date: string;
  deleted: boolean;
  acceptanceDate: string;
  attachments: any;
  fieldType: string;
  city: string;
  rate: string;
  avatar: string;
}


const users = [
  {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      image: "john_image.jpg",
      email: "john@example.com",
      type: "provider",
      isActive: true,
      isApproved: false,
      user_services: {
          service_id: 101,
          service_name: "Web Development",
          service_description: "Providing web development services"
      },
      user_visit_records: [
          {
              visit_id: 201,
              visit_date: "2024-05-01",
              visit_purpose: "Consultation"
          },
          {
              visit_id: 202,
              visit_date: "2024-05-15",
              visit_purpose: "Project Discussion"
          }
      ]
  },
  {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      image: "jane_image.jpg",
      email: "jane@example.com",
      type: "customer",
      isActive: true,
      isApproved: true,
      user_visit_records: [
          {
              visit_id: 203,
              visit_date: "2024-05-10",
              visit_purpose: "Service Inquiry"
          },
          {
              visit_id: 204,
              visit_date: "2024-05-20",
              visit_purpose: "Feedback"
          }
      ]
  },
  {
      id: 3,
      name: "Alice Johnson",
      username: "alicejohnson",
      image: "alice_image.jpg",
      email: "alice@example.com",
      type: "provider",
      isActive: false,
      isApproved: false,
      user_services: {
          service_id: 102,
          service_name: "Graphic Design",
          service_description: "Offering graphic design services"
      },
      user_visit_records: [
          {
              visit_id: 205,
              visit_date: "2024-05-05",
              visit_purpose: "Initial Meeting"
          },
          {
              visit_id: 206,
              visit_date: "2024-05-25",
              visit_purpose: "Design Review"
          }
      ]
  }
]


const Requests = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  // get requestData
  const { data: requestData, isLoading, isError } = useQuery({
    queryKey: ['user_requests', page, search],
    queryFn: async () => 
    await api().get(`/users/has-no-rank?search=${search}&page=${search ? 1 : page}`).then((res) => {
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
    <PageContainer title="SDC Requests" description="this is request page">
      <Breadcrumb title="Requests" items={BCrumb} />
      <ChildCard>
        <Box>
          <Box paddingBottom={0}>
            <Typography color={theme.palette.primary.dark} variant="h3" mt={1} fontWeight="600">
              <Translatable>
                User Requests
              </Translatable>
            </Typography>
          </Box>
          
          <Stack direction="row" justifyContent="flex-end" my={3}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch size="1.1rem" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: {sm: '100%', lg: '300px'} }}
                  placeholder="Search Fields"
                  size="medium"
                  onChange={handleSearch}
                  value={search}
                />
              </Stack>

          <TableContainer>
          { users ? ( 
              <>
            
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">
                          <Translatable>
                            User
                          </Translatable>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                          <Translatable>
                            Username
                          </Translatable>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                          <Translatable>
                            Email
                          </Translatable>
                        </Typography>
                      </TableCell>
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
                            User Status
                          </Translatable>
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6">
                          <Translatable>
                            Action
                          </Translatable>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {users?.map((request: any) => (
                      <RequestRow el={request} key={request.id}/>
                    ))}
                  </TableBody>
                </Table>
                <Box width={'100%'} display={'flex'} justifyContent={'center'} paddingY={5} >
                  <Pagination 
                    count={requestData?.meta?.last_page} 
                    shape="rounded"
                    color="primary" 
                    variant='outlined'
                    page={requestData?.meta?.current_page}
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
          
        </Box>
      </ChildCard>
    </PageContainer>
  );
};

export default Requests;
