/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid } from '@mui/material';
import { fetchTicket } from 'src/store/apps/tickets/TicketSlice';
import { useDispatch } from 'src/store/Store';
import PageContainer from 'src/components/container/PageContainer';
import WelcomeCard from 'src/Acc_components/user_details/welcomCard/WelcomeCard';
import Banner from 'src/Acc_components/user_details/bannar/Banner';
import Pets from './_components/Pets';
import ChildCard from 'src/components/shared/ChildCard';
import AccountTab from 'src/Acc_components/user_details/AccountTab';

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

const UserDetails = () => {
  const dispatch = useDispatch();

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
  


  const user = {
    id: 1,
    name: "John Doe",
    img: "",
    username: "johndoe",
    image: "john_image.jpg",
    email: "john@example.com",
    type: "Customer",
    isActive: true,
    pets: [
        {
            id: '1',
            pet_name: "Buddy",
            image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            clinic_visit_history: [
                {
                    visit_type: "Checkup",
                    date: "2024-04-10",
                    meds: "Vitamins",
                    service: "General Checkup",
                    provider_name: "Dr. Smith"
                },
                {
                    visit_type: "Vaccination",
                    date: "2024-05-10",
                    meds: "Rabies Vaccine",
                    service: "Vaccination",
                    provider_name: "Dr. Jones"
                }
            ]
        },
        {
            id: '2',
            pet_name: "Whiskers",
            image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            clinic_visit_history: [
                {
                    visit_type: "Dental Cleaning",
                    date: "2024-03-15",
                    meds: "None",
                    service: "Dental",
                    provider_name: "Dr. Lee"
                },
                {
                    visit_type: "Checkup",
                    date: "2024-04-20",
                    meds: "Antibiotics",
                    service: "General Checkup",
                    provider_name: "Dr. Brown"
                }
            ]
        },
        {
            id: '3',
            pet_name: "Garfield",
            image: "https://images.unsplash.com/photo-1458410489211-ba19aa2f2902?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            clinic_visit_history: [
                {
                    visit_type: "Dental Cleaning",
                    date: "2024-03-15",
                    meds: "None",
                    service: "Dental",
                    provider_name: "Dr. Lee"
                },
                {
                    visit_type: "Checkup",
                    date: "2024-04-20",
                    meds: "Antibiotics",
                    service: "General Checkup",
                    provider_name: "Dr. Brown"
                }
            ]
        },
    ]
  }

  return (
    <PageContainer title="User details" description="this is User details page">
      {/* breadcrumb */}
      <Breadcrumb title={'User details'}  items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <WelcomeCard user={user} />
        </Grid>
        <Grid item xs={20} sm={3}>
          <Banner user={user} />
        </Grid>
        <Grid item xs={12}>
          <ChildCard>
            <AccountTab />
          </ChildCard>
        </Grid>
        <Grid item sm={12} md={12}>
          <Pets pets={user.pets}/>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserDetails;
