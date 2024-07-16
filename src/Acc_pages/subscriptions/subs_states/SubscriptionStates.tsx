import { Box, CardContent, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "src/components/container/PageContainer";
import api from "src/context/apiRequest";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";

import icon1 from 'src/assets/images/svgs/icon-briefcase.svg';
import Translatable from "src/Acc_components/translatable_text/Translatable";
import DashboardSkeleton from "src/Acc_components/skeletons/DashboardSkeleton";
import ErrorSkeleton from "src/Acc_components/table_skeleton/ErrorSkeleton";




const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Reservations States',
  },
];


export default function SubscriptionStates() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => 
    await api().get(`/dashboard`).then((res) => {
    return res.data
    })
  })

  return (
    <PageContainer title="SDC Statistics" description="this is Statistics page">
      <Breadcrumb title={'Statistics'} items={BCrumb} />

      <Box sx={{ pt: 4 }}>
        { !data ? ( 
          <Grid container>
            <Grid container spacing={3}>
              {/* {data?.field_types.map((el) => ( */}

                <Grid item xs={12} sm={4} lg={4}>
                  <Box bgcolor="primary.light" textAlign="center">
                    <CardContent>
                      <img src={icon1} alt='icon' width="50" />
                      <Typography
                        color='warning.main'
                        mt={1}
                        variant="subtitle1"
                        fontWeight={600}
                      >
                        <Translatable>
                          Gold
                        </Translatable>
                      </Typography>
                      <Typography color={'warning.main'} variant="h4" fontWeight={600}>
                        Subs 342
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} lg={4}>
                  <Box bgcolor="error.light" textAlign="center">
                    <CardContent>
                      <img src={icon1} alt='icon' width="50" />
                      <Typography
                        color='warning.main'
                        mt={1}
                        variant="subtitle1"
                        fontWeight={600}
                      >
                        <Translatable>
                          Selver
                        </Translatable>
                      </Typography>
                      <Typography color={'warning.main'} variant="h4" fontWeight={600}>
                        Subs 128
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} lg={4}>
                  <Box bgcolor="secondary.light" textAlign="center">
                    <CardContent>
                      <img src={icon1} alt='icon' width="50" />
                      <Typography
                        color='warning.main'
                        mt={1}
                        variant="subtitle1"
                        fontWeight={600}
                      >
                        <Translatable>
                          Basic
                        </Translatable>
                      </Typography>
                      <Typography color={'warning.main'} variant="h4" fontWeight={600}>
                        Subs 254
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
              {/* ))} */}
            </Grid>

            <Grid item xs={12} lg={12} mt={3}>
              <Grid container spacing={3}>
                <Grid item sm={12} md={6}>
                  {/* <Chart1 data={data!}/> */}
                </Grid>
                <Grid item sm={12} md={6}>
                  {/* <Chart2 data={data!}/> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        ) : isLoading ? (
            <DashboardSkeleton/>
        ) : isError && (
          <Box>
            <ErrorSkeleton/>
          </Box>
        )
      }
      </Box>

    </PageContainer>
  ) 
}
