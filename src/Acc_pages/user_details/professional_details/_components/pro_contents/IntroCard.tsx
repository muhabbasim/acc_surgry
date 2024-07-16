// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';

import ChildCard from 'src/components/shared/ChildCard';
import { IconCalendar, IconMail, IconPhone, IconStatusChange } from '@tabler/icons-react';
import { toUpper } from 'lodash';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
type Props = {
  user: any
}

const IntroCard = ({ user }: Props) => {
  const theme = useTheme();
  return (

    <ChildCard>
      <Typography fontWeight={600} variant="h4" mb={2}>
        <Translatable>
          Introduction
        </Translatable>
      </Typography>
      <Box width={'100%'} display={'flex'}>
        <Box width={'50%'}>
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <IconCalendar size="21" />
            <Typography variant="h6"> <Translatable>Name</Translatable> : 
              <Typography px={1} fontSize={18} fontWeight={600} style={{display: 'inline'}} color={ theme.palette.primary.dark }>
                {user?.name}
              </Typography>
            </Typography>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <IconCalendar size="21" />
            <Typography variant="h6"> <Translatable>User Type</Translatable> : <Typography display='inline' fontWeight={600} color={theme.palette.success.main}>{toUpper(user?.type)}</Typography></Typography>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <IconPhone size="21" />
            <Typography variant="h6"> <Translatable>Sector</Translatable> :</Typography>
              <Typography variant="h6" fontWeight={600} style={{display: 'inline'}} color={ theme.palette.error.main }>
                {user?.sector}
              </Typography>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <IconPhone size="21" />
            <Typography variant="h6"> <Translatable>Phone</Translatable> : {user?.phone}</Typography>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <IconMail size="21" />
            <Typography variant="h6"> <Translatable>Email</Translatable> : {user?.email}</Typography>
          </Stack>
        </Box>

        <Box  width={'50%'}>
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <IconCalendar size="21" />
            <Typography variant="h6"> <Translatable>Registered At</Translatable> : {user?.registered_at}</Typography>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <IconCalendar size="21" />
            <Typography variant="h6"> <Translatable>Location</Translatable> : {user?.location}</Typography>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <IconStatusChange size="21" />
            <Typography variant="h6"> <Translatable>User Status</Translatable> : 
              <Typography fontWeight={600} px={1} style={{display: 'inline'}} color={user?.isActive ? theme.palette.secondary.main : theme.palette.error.main}>
                {user?.isActive ? <Translatable>ACTIVE</Translatable> : <Translatable>INACTIVE</Translatable>}
              </Typography>
            </Typography>
          </Stack>

          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <IconStatusChange size="21" />
            <Typography variant="h6"> <Translatable>Approval State</Translatable> : 
              <Typography fontWeight={600} px={1} style={{display: 'inline'}} color={user?.isApproved ? theme.palette.secondary.main : theme.palette.error.main}>
                {user?.isApproved ? <Translatable>APPROVED</Translatable> : <Translatable>DISAPPROVED</Translatable>}
              </Typography>
            </Typography>
          </Stack>
          
        </Box>
      </Box>
    </ChildCard>
  )

};

export default IntroCard;
