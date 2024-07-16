// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import LandingPageLayout from 'src/layouts/landingpage/LandingPageLayout';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* **** ACC Pages***** */
const Users = Loadable(lazy(() => import('../Acc_pages/users/Users')));
const AccDasboard = Loadable(lazy(() => import('../Acc_pages/dashboard/Dashboard')));
const UserDetail = Loadable(lazy(() => import('../Acc_pages/user_details/normal_user_details/UserDetails')));
const ProviderDetail = Loadable(lazy(() => import('../Acc_pages/user_details/professional_details/ProfessionalDetails')));
const PetDetail = Loadable(lazy(() => import('../Acc_pages/pet_details/PetDetails')));
const Requests = Loadable(lazy(() => import('../Acc_pages/requests/Requests')));
const RequestDetail = Loadable(lazy(() => import('../Acc_pages/request_details/RequestDetails')));
const Subscriptions = Loadable(lazy(() => import('../Acc_pages/subscriptions/Subscriptions')));
const SubscriptionsDetails = Loadable(lazy(() => import('../Acc_pages/subscription_details/SubsctiptionDetails')));
const SubscriptionStates = Loadable(lazy(() => import('../Acc_pages/subscriptions/subs_states/SubscriptionStates')));
const Documents = Loadable(lazy(() => import('../Acc_pages/documents/Documents')));
const DocumentLinks = Loadable(lazy(() => import('../Acc_pages/document_links/DocumentLinks')));
const Services = Loadable(lazy(() => import('../Acc_pages/services/Services')));
const ServiceLinks = Loadable(lazy(() => import('../Acc_pages/service_links/ServiceLinks')));
const Advertisements = Loadable(lazy(() => import('../Acc_pages/advertisements/Advertisements')));
const AdDetails = Loadable(lazy(() => import('../Acc_pages/ad_details/AdDetails')));
const CardTypes = Loadable(lazy(() => import('../Acc_pages/cards/card_types/CardTypes')));
const CardPices = Loadable(lazy(() => import('../Acc_pages/cards/card_prices/CardPrices')));
const CardLinksUser = Loadable(lazy(() => import('../Acc_pages/cards/card_links/CardLinksUsers')));


const Login = Loadable(lazy(() => import('../Acc_pages/auth/login/Login')));
const ForgotPassword = Loadable(lazy(() => import('../Acc_pages/auth/forget_password/ForgotPassword')));
const NotFound = Loadable(lazy(() => import('../Acc_pages/error/Error')));


const Home = Loadable(lazy(() => import('../Acc_landingpage/pages/Home')));


const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [

      // Acc routes
      { path: '/', element: <Navigate to="/dashboards" /> },
      { path: '/dashboards', exact: true, element: <AccDasboard /> },
      { path: '/users', exact: true, element: <Users /> },
      { path: '/users/user_detail/:id', element: <UserDetail /> },
      { path: '/users/provider_detail/:id', element: <ProviderDetail /> },
      { path: '/users/pet_details/:id', element: <PetDetail /> },
      { path: '/requests', exact: true, element: <Requests /> },
      { path: '/requests/req_detail/:id', element: <RequestDetail /> },
      { path: '/subscriptions', exact: true, element: <Subscriptions /> },
      { path: '/sub_details/:id', exact: true, element: <SubscriptionsDetails /> },
      { path: '/subscriptions_states', exact: true, element: <SubscriptionStates /> },
      { path: '/documents', exact: true, element: <Documents /> },
      { path: '/documents_links', exact: true, element: <DocumentLinks /> },
      { path: '/services', exact: true, element: <Services /> },
      { path: '/service_links', exact: true, element: <ServiceLinks /> },
      { path: '/advertisements', exact: true, element: <Advertisements /> },
      { path: '/ad_details/:id', exact: true, element: <AdDetails /> },
      { path: '/cards_types', exact: true, element: <CardTypes /> },
      { path: '/cards_prices', exact: true, element: <CardPices /> },
      { path: '/cards_links_users', exact: true, element: <CardLinksUser /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [

      // Acc routes
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/forgot_password', element: <ForgotPassword /> },
      { path: '*', element: <NotFound/>},

    ],
  },
  {
    path: '/',
    element: <LandingPageLayout />,
    children: [

      // Acc landingpage routes
      { path: '/home', element: <Home /> },

    ],
  },
];

export default Router;
