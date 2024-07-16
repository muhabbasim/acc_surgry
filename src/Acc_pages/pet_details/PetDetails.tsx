/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { CardContent, Grid, Accordion, AccordionSummary, AccordionDetails, Divider, Stack, Typography, useTheme } from '@mui/material';
import BlankCard from 'src/components/shared/BlankCard';
import { fetchTicket } from 'src/store/apps/tickets/TicketSlice';
import { useDispatch } from 'src/store/Store';
import PageContainer from 'src/components/container/PageContainer';
import { IconChevronDown, IconPaw } from '@tabler/icons-react';
import Translatable from 'src/Acc_components/translatable_text/Translatable';

import bgimg from 'src/assets/images/footprints.png'
import PetCard from './_components/pet_card/PetCard';
import { upperCase } from 'lodash';

// type UserProps = {
//   AgentName: string;
//   Date: string;
//   Id: number
//   Label: string;
//   Status: string;
//   thumb: string;
//   ticketDescription:string;
//   ticketTitle: string;
// }

const pet = {
  id: '1',
  pet_name: "Buddy",
  subscription: {
    type: "gold",
    id: "313-350343543",
    start: "2024-05-10",
    end: "2025-05-10",
  },
  image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  clinic_visit_history: [
      {
          visit_type: "Checkup",
          date: "2024-04-10",
          meds: "Vitamins",
          request_status: "Accepted",
          service: "General Checkup",
          provider_name: "Dr. Smith"
      },
      {
          visit_type: "Vaccination",
          date: "2024-05-10",
          meds: "Rabies Vaccine",
          request_status: "On Hold",
          service: "Vaccination",
          provider_name: "Dr. Jones"
      }
  ]
}

const PetDetails = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation();
  const userId: any = location.pathname.split('/').pop();

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/users',
      title: 'Users',
    },
    {
      title: 'User Details',
    },
  ];
  
  useEffect(() => {
    dispatch(fetchTicket(userId));
  }, [dispatch]);
  

  return (
    <PageContainer title="Pet details" description="this is Pet details page">
      {/* breadcrumb */}
      <Breadcrumb title={'Pet details'}  items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <BlankCard>
            <CardContent sx={{ p: '25px' }}>
              <img
                src={pet?.image}
                alt='photo'
                loading="lazy"
                style={{ borderRadius: 10, width: '100%', height: '600px', objectFit: "cover" }}
              />
            </CardContent>
          </BlankCard>
        </Grid>

        <Grid item xs={12} lg={8}>
          <BlankCard>
            <CardContent sx={{ p: '25px', minHeight: '650px' }}>
              <Stack direction="row" gap={0} alignItems="center" mb={3}>
                <IconPaw size="21" color='lightgray'/>
                <Typography color={ theme.palette.primary.dark } variant="h6">  
                  <Typography px={1} fontSize={18} fontWeight={600} style={{display: 'inline'}} color={ theme.palette.error.main }>
                    {upperCase(pet?.pet_name)}
                  </Typography>
                </Typography>
              </Stack> 

              <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} my={6}>
                <PetCard pet={pet}/>
              </Stack>

              <Grid>
                <Typography color={theme.palette.primary.dark} variant="h3" mb={1}>Clinics Visits</Typography>
                <Typography variant="h6" fontWeight={400} color="textSecondary" textAlign="center" mb={4}></Typography>

                {pet.clinic_visit_history.map((visit: any, i) => {
                  return (
                    <Accordion elevation={9} key={i}>
                      <AccordionSummary
                        expandIcon={<IconChevronDown />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography variant="h6" px={2} py={1}>Visit Reconrd {i + 1}</Typography>
                      </AccordionSummary>
                      <Divider />
                      <AccordionDetails sx={{ p: 4, color: theme.palette.primary.dark}} style={{ backgroundImage: `url(${bgimg})`}}>
                        <Stack direction="row" gap={2} alignItems="center" mb={1}>
                          <Typography  variant="h6"> <Translatable>Visit Type</Translatable> : </Typography>
                          <Typography fontSize={16} fontWeight={400} style={{display: 'inline'}} color={ theme.palette.primary.main }>
                            {visit?.visit_type}
                          </Typography>
                        </Stack>
                        <Stack direction="row" gap={2} alignItems="center" mb={1}>
                          <Typography variant="h6"> <Translatable>Date</Translatable> :</Typography>
                          <Typography fontSize={16} fontWeight={400} style={{display: 'inline'}} color={ theme.palette.error.main }>
                            {visit?.date}
                          </Typography>
                        </Stack>
                        <Stack direction="row" gap={2} alignItems="center" mb={1}>
                          <Typography variant="h6"> <Translatable>Service</Translatable> :</Typography>
                          <Typography fontSize={16} fontWeight={400} style={{display: 'inline'}} color={ theme.palette.primary.dark }>
                            {visit?.service}
                          </Typography>
                        </Stack>
                        <Stack direction="row" gap={2} alignItems="center" mb={1}>
                          <Typography variant="h6"> <Translatable>Provider Name</Translatable> :</Typography>
                          <Typography fontSize={16} fontWeight={400} style={{display: 'inline'}} color={ theme.palette.primary.dark }>
                            {visit?.provider_name}
                          </Typography>
                        </Stack>
                        <Stack direction="row" gap={2} alignItems="center" mb={1}>
                          <Typography variant="h6"> <Translatable>Request Status</Translatable> :</Typography>
                          <Typography fontSize={16} fontWeight={400} style={{display: 'inline'}} color={ theme.palette.primary.dark }>
                            {visit?.request_status}
                          </Typography>
                        </Stack>
                        <Stack direction="row" gap={2} alignItems="center" mb={1}>
                          <Typography variant="h6"> <Translatable>meds</Translatable> :</Typography>
                          <Typography fontSize={16} fontWeight={400} style={{display: 'inline'}} color={ theme.palette.primary.main }>
                            {visit?.meds}
                          </Typography>
                        </Stack>
                        <Stack direction="row" gap={2} alignItems="center" mb={1}>
                          <Typography variant="h6"> <Translatable>Report</Translatable> :  
                            <Typography variant="subtitle1" pt={1} px={2} color="textSecondary">
                              Admin dashboard template should include user & SEO friendly design with a variety of
                              components and application designs to help create
                            </Typography>
                          </Typography>
                        </Stack>
                       
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
              </Grid>
            </CardContent>
          </BlankCard>
        </Grid>
    
      </Grid>
    </PageContainer>
  );
};

export default PetDetails;
