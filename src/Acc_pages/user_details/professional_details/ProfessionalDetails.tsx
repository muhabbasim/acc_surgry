/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import { ActionButtons } from './_components/ActionButtons';
import { useQuery } from '@tanstack/react-query';
import api from 'src/context/apiRequest';
import WelcomeCard from 'src/Acc_components/user_details/welcomCard/WelcomeCard';
import ProUserSkeleton from 'src/Acc_components/skeletons/ProUserSkeleton';
import Banner from 'src/Acc_components/user_details/bannar/Banner';
import ProContent from './_components/pro_contents/ProContent';

const user = {
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
    isApproved: true,
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
            card: "platinum",
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
            card: "platinum",
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
            card: "platinum",
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


const ProfessionalDetails = () => {
  const location = useLocation();
  const userId: any = location.pathname.split('/').pop();
  const [mounting, setMounting] = useState<boolean>(true);
  
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
      title: 'Provider',
    },
  ];
  
 
  useEffect(() => {
    setTimeout(() => {
      setMounting(false);
    }, 700);
  }, [])

  const { data: userData } = useQuery({
    queryKey: ['current_user', userId],
    queryFn: async () => 
    await api().get(`/users/show/${userId}`).then((res) => {
      return res.data
    })
  })

  console.log(userData)


  return (
    <PageContainer title="Providers" description="this is Providers page">
      <Breadcrumb title='Providers' items={BCrumb} />

      {mounting ? (
        <>
          <ProUserSkeleton/>
        </>
      ): (
        <>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <ActionButtons user={user} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <WelcomeCard user={user} />
          </Grid>
          <Grid item xs={12} sm={12} lg={4}>
            <Banner user={user}/>
          </Grid>
          <Grid item xs={12}>
            <ProContent user={user}/>
          </Grid>
        </Grid>
        </>
      )}
    
    </PageContainer>
  );
};

export default ProfessionalDetails
;
