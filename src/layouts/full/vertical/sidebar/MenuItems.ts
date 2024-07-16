import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  // IconPoint,
  IconNotes,
  // IconCalendar,
  // IconMail,
  // IconTicket,
  IconUserCircle,
  // IconMessage2,
  IconBasket,
  // IconChartDonut3,
  IconShoppingCart,
  IconAperture,
  IconPoint,
  IconCards,
} from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/dashboards',
    chip: '',
    chipColor: 'secondary',
  },
  {
    navlabel: true,
    subheader: 'USers',
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUserCircle,
    href: '/users',
    chip: '',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'User Requests',
    icon: IconNotes,
    href: '/requests',
    chip: '',
    chipColor: 'secondary',
  },
  {
    navlabel: true,
    subheader: 'card',
  },
  {
    id: uniqueId(),
    title: 'Cards',
    icon: IconCards,
    href: '#',
    chipColor: 'secondary',
    children: [
      {
        id: uniqueId(),
        title: 'Cards Types',
        icon: IconPoint,
        href: '/cards_types',
      },
      {
        id: uniqueId(),
        title: 'Cards Discounts',
        icon: IconPoint,
        href: '/cards_prices',
      },
      {
        id: uniqueId(),
        title: 'Cards Links To User Type',
        icon: IconPoint,
        href: '/cards_links_users',
      },
    ],
  },
  {
    navlabel: true,
    subheader: 'Subs',
  },
  {
    id: uniqueId(),
    title: 'Subscriptions',
    icon: IconBasket,
    href: '/subscriptions',
    chip: '',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Subscriptions States',
    icon: IconNotes,
    href: '/subscriptions_states',
    chip: '',
    chipColor: 'secondary',
  },

  {
    navlabel: true,
    subheader: 'Ser',
  },
  {
    id: uniqueId(),
    title: 'Services',
    icon: IconNotes,
    href: '/services',
    chip: '',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Service Links',
    icon: IconNotes,
    href: '/service_links',
    chip: '',
    chipColor: 'secondary',
  },
  {
    navlabel: true,
    subheader: 'Docs',
  },
  {
    id: uniqueId(),
    title: 'Documents',
    icon: IconNotes,
    href: '/documents',
    chip: '',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Documents Links',
    icon: IconNotes,
    href: '/documents_links',
    chip: '',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Advertisements',
    icon: IconShoppingCart,
    href: '/advertisements',
    chip: '',
    chipColor: 'secondary',
  },
];

export default Menuitems;
