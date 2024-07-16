// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  Chip,
  Stack,
  Avatar,
  Tooltip,
  TextField,
  Pagination,
  useTheme,
  TableContainer,
  InputAdornment,
  // styled,
} from '@mui/material';
import { IconEye, IconSearch } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import api from 'src/context/apiRequest';
import { useQuery } from '@tanstack/react-query';
import TableSkeleton from '../table_skeleton/TableSkeleton';
import ErrorSkeleton from '../table_skeleton/ErrorSkeleton';
import { upperCase } from 'lodash';
import Translatable from '../translatable_text/Translatable';


export interface UserProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  username: string;
  avatar: string;
  idNum: string;
  birthdate: string;
  registered_at: string;
  rank: string;
  isActive: boolean;
  isApproved: boolean;
  attachments: any;
  Date: Date;
  deleted: boolean;
}


// const BoxStyled = styled(Box)(() => ({
//   padding: '30px',
//   transition: '0.1s ease-in',
//   cursor: 'pointer',
//   color: 'inherit',
//   '&:hover': {
//     transform: 'scale(1.03)',
//   },
// }));

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

const UserListing = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  // const [searchType, setSearchType] = useState('');

  // get fields
  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['users', page, search, ],
    queryFn: async () => 
    await api().get(`/users?search=${search}&page=${search ? 1 : page}`).then((res) => {
      return res.data
    })
  })

  // console.log(userData)
  // const { data: allUsers, isLoading: UsersIsLoading } = useQuery({
  //   queryKey: ['all_users'],
  //   queryFn: async () => 
  //   await api().get(`/users/all`).then((res) => {
  //     return res.data
  //   })
  // })


  // const totalUsers = allUsers?.filter((user: UserProps) => user.isApproved === true)
  // const consoultantNum = allUsers?.filter((user: UserProps) => user?.type === 'consultant' || user?.type === 'مستشار')
  // const userNum = allUsers?.filter((user: UserProps) => user?.type === 'user' || user?.type === 'مستخدم عادي')
  // const practitionerNum = allUsers?.filter((user: UserProps) =>  user.isApproved === true && user?.type === "practitioner" || user.isApproved === true && user?.type === "ممارس محترف")

  
  // handle search function
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  
  const handleChangePage = (_event: any, page: number) => {
    setPage(page)
  }

  return (
    <Box>
      {/* { allUsers ? ( 
        <Grid container spacing={3} textAlign="center">
          <Grid item lg={3} sm={6} xs={12}>
              <BoxStyled
                onClick={() => setSearchType('')}
                sx={{ backgroundColor: 'error.light', color: 'error.main' }}
              >
                <Typography variant="h3">{totalUsers?.length}</Typography>
                <Typography variant="h6">
                  <Translatable>
                    ALL USER
                  </Translatable>
                </Typography>
              </BoxStyled>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <BoxStyled
                onClick={() => setSearchType('consultant')}
                sx={{ backgroundColor: 'warning.light', color: 'warning.main' }}
              >
                <Typography variant="h3">{consoultantNum?.length}</Typography>
                <Typography variant="h6">
                  <Translatable>
                    CONSULTANTS
                  </Translatable>
                </Typography>
              </BoxStyled>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <BoxStyled
                onClick={() => setSearchType('practitioner')}
                sx={{ backgroundColor: 'success.light', color: 'success.main' }}
              >
                <Typography variant="h3">{practitionerNum?.length}</Typography>
                <Typography variant="h6">
                  <Translatable>
                    PRACTITIONERS
                  </Translatable>
                </Typography>
              </BoxStyled>
            </Grid> 
            <Grid item lg={3} sm={6} xs={12}>
              <BoxStyled
                onClick={() => setSearchType('user')}
                sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}

              >
                <Typography variant="h3">{userNum?.length}</Typography>
                <Typography variant="h6">
                  <Translatable>
                    USERS
                  </Translatable>
                </Typography>
              </BoxStyled>
            </Grid> 
          </Grid>
        ) : UsersIsLoading ? (
          <Box width={'100%'} display='flex' gap={2} paddingX={0} my={0}>
            <Skeleton animation="wave" width="100%" height={160}></Skeleton>
            <Skeleton animation="wave" width="100%" height={160}></Skeleton>
            <Skeleton animation="wave" width="100%" height={160}></Skeleton>
            <Skeleton animation="wave" width="100%" height={160}></Skeleton>
          </Box>
        ) : isError && (
          <Box>
            <ErrorSkeleton/>
          </Box>
        )
      } */}


      <Box sx={{ maxWidth: '300px', ml: 'auto' }} my={3}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size="1.1rem" />
              </InputAdornment>
            ),
          }}
          sx={{ width: {sm: '100%', lg: '300px'} }}
          placeholder="Search user"
          size="medium"
          onChange={handleSearch}
          value={search}
        />
      </Box>
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
                      <Typography variant="h6" minWidth={120}>
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
                          Approval State
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
                  {users?.map((user: any) => {

                    let route;
                    if (user.type === 'customer') {
                      route = `/users/user_detail/${user.id}`
                    } else {
                      route = `/users/provider_detail/${user.id}`
                    }

                    return (
                      <TableRow key={user.id} hover>
                        <TableCell>
                          <Stack direction="row" gap="10px" alignItems="center">
                            <Avatar
                              src={''}
                              alt={''}
                              sx={{
                                borderRadius: '100%',
                                width: '35',
                              }}
                            />
                            <Typography variant="h6" px={1} style={{display: 'inline'}} color={ theme.palette.primary.main }>
                              {user?.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Typography
                            color="textSecondary"
                            noWrap
                            sx={{ maxWidth: '250px' }}
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {user.username}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography
                            color="textSecondary"
                            noWrap
                            sx={{ maxWidth: '250px' }}
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {user.email}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Box>
                            <Chip 
                              label={<Translatable>{upperCase(user.type)}</Translatable>}
                              variant='filled' 
                              sx={{ 
                                width: 110, 
                                color: 'white', 
                                backgroundColor: 'primary.dark'
                              }}
                            />
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Box>
                            <Chip 
                              label={user.isApproved ? <Translatable>APPROVED</Translatable> : <Translatable>DISAPPROVED</Translatable>} 
                              variant='filled' 
                              sx={{ 
                                width: 120, 
                                color: user?.isApproved === true ? theme.palette.primary.main : theme.palette.error.main , 
                                backgroundColor: user.isApproved ? 'primary.light' : 'error.light' 
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Chip 
                              // label={upperCase(user?.isActive ? 'Active' : 'Inactive')} 
                              label={user.isActive ? <Translatable>ACTIVE</Translatable> : <Translatable>INACTIVE</Translatable>} 

                              variant='filled' 
                              sx={{ 
                                width: 100, 
                                color: user?.isActive ? theme.palette.primary.main : theme.palette.error.main , 
                                backgroundColor: user.isActive ? 'primary.light' : 'error.light' 
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Details Ticket">
                            <IconButton 
                              component={Link}
                              to={route}
                            >
                              <IconEye color={theme.palette.primary.dark}/>
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              <Box width={'100%'} display={'flex'} justifyContent={'center'} paddingY={5} >
                <Pagination 
                  count={userData?.meta?.last_page} 
                  shape="rounded"
                  color="primary" 
                  variant='outlined'
                  page={userData?.meta?.current_page}
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
  );
};

export default UserListing;
