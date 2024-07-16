/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import WelcomeCard from '../user_details/professional_details/_components/pro_welcom_card/WelcomeCard';
import { ActionButtons } from '../user_details/professional_details/_components/ActionButtons';
import Banner from 'src/Acc_components/user_details/bannar/Banner';
import RequestContent from './_components/RequestContent';

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

const request = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  logo: "john_image.jpg",
  email: "john@example.com",
  location: 'Service Provider current location',
  phone: '250 5234 50524',
  type: "provider",
  registered_at: "2024-3-12",
  sector: 'Clinic',
  isActive: true,
  isApproved: false,
  attachments: {
    files: [
      {
        id: "2",
        document_name: 'Sertification for work',
        path: 'Sertification for work',
      },
      {
        id: "4",
        document_name: 'Clinic permissions',
        path: 'Sertification for work',
      },
    ],
    images: []
  },
  services: [
    {
      id: "101",
      service_name: "cosmatics",
      desc: "Providing web development services",
      time: [
        { label: 'Saturday' },
        { label: 'Sunday' },  
      ],
      discount: [
        {
          id: 1,
          card: "Gold",
          amount: "20",
        },
        {
          id: 2,
          card: "Regular",
          amount: "5",
        },
        {
          id: 4,
          card: "Selver",
          amount: "10",
        },
      ],
    },
    {
      id: "103",
      service_name: "sergeries",
      desc: "Deleting this user will result in deleting all the data and information related to the user and can not be retained when proceeded",
      time: [
        { label: 'Saturday' },
        { label: 'Sunday' },  
      ],
      discount: [
        {
          id: 102,
          card: "Gold",
          amount: "30",
        },
        {
          id: 104,
          card: "Regular",
          amount: "7",
        },
        {
          id: 105,
          card: "Selver",
          amount: "2",
        },
      ],
    },
    {
      id: "104",
      service_name: "markets",
      desc: "products sells web development services",
      time: [
        { label: 'Friday' },
        { label: 'Sunday' },  
        { label: 'Sunday' },  
      ],
      discount: [],
      products: [
        {
          id: 103,
          name: "Cosmatics",
          price: '12',
          image: "https://www.westpaw.com/cdn/shop/products/BZ031EGG_SKAMP_LARGE_f5723099-41e3-4812-b71c-d77ea16ac33b.png?v=1614387084&width=1500"
        },
        {
          id: 101,
          name: "Cosmatics",
          price: '53',
          image: "https://www.puprise.com/wp-content/uploads/2019/08/Himalaya-Healthy-Pet-Food-Meat-Rice-Dog-Food.jpg"
        },
      ]
    },
    {
      id: "109",
      service_name: "medicine",
      desc: "products sells web development services",
      time: [
        { label: 'Thursday' },
        { label: 'Saturday' },
        { label: 'Sunday' },  
      ],
      discount: [
        {
          id: 106,
          card: "Gold",
          amount: "50",
        },
        {
          id: 104,
          card: "Regular",
          amount: "25",
        },
        {
          id: 102,
          card: "Selver",
          amount: "6",
        },
      ],
      products: [
        {
          id: 103,
          name: "ggsir",
          price: '35',
          image: "https://goofytails.com/cdn/shop/products/newtoy-26_165b4c3d-aa24-4c81-a50f-1873ecae4116.jpg?v=1676119555"
        },
        {
          id: 101,
          name: "xbfddr",
          price: '24',
          image: "https://cdn.petsathome.com/public/images/products/900_7119340.jpg"
        },
      ]
    },
  ]
}

const RequestDetails = () => {
  const location = useLocation();
  const requestId: any = location.pathname.split('/').pop();
  console.log(requestId);
  
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/requests',
      title: 'Requests',
    },
    {
      title: 'Request Details',
    },
  ];
  
  return (
    <PageContainer title="Request details" description="this is request details page">
      {/* breadcrumb */}
      <Breadcrumb title='Request details' items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <ActionButtons user={request} />
          </Grid>
            <Grid item xs={12} lg={8}>
              <WelcomeCard user={request} />
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              <Banner user={request}/>
            </Grid>
            <Grid item xs={12}>
              <RequestContent user={request}/>
            </Grid>
          </Grid>
    </PageContainer>
  );
};

export default RequestDetails
;
