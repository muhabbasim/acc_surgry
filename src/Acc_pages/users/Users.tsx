import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';

import ChildCard from 'src/components/shared/ChildCard';
import UserListing from 'src/Acc_components/users/UserListing';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Users',
  },
];

const TicketList = () => {

  return (
    <PageContainer title="Users" description="this is user page">
      <Breadcrumb title={'Users'} items={BCrumb} />
      <ChildCard>
        <UserListing />
      </ChildCard>
    </PageContainer>
  );
};

export default TicketList;
