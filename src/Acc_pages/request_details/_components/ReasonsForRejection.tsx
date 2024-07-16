// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import { IconEraser } from '@tabler/icons-react';
import DashboardCard from 'src/components/shared/DashboardCard';
import Translatable from 'src/Acc_components/translatable_text/Translatable';

type Props = {
  user: any
}

type ReasonsProps = {
  name: string;
}


const ReasonsForRejection = ({ user }: Props) => {
  
  const theme = useTheme();
  const rejectReasons = user?.reject_reasons
  const reasonsNote = user?.reject_note

  return (
    <DashboardCard title="Reject Reasons">
      <Box sx={{ minHeight: 150 }}>
        <Stack spacing={1} mt={2}>
          {rejectReasons?.length === 0 ? 
            <Box width='100%' display='flex' justifyContent='center'> 
              <Typography fontSize={18} color='error'>
                No Reasons added
              </Typography>
            </Box> :

            rejectReasons?.map((reason: ReasonsProps, i: any) => (
              <Stack
                direction="row"
                spacing={3}
                justifyContent="space-between"
                alignItems="center"
                key={i}
                sx={{ cursor: 'text'}}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    variant="rounded"
                    sx={{ bgcolor: theme.palette.error.light, color: theme.palette.error.main, width: 30, height: 30 }}
                  >
                    <IconEraser size={20} stroke={1}/>
                  </Avatar>
                  <Box>
                    <Typography variant="h6" mb="4px">
                      {reason.name}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            )
          )
        }

        </Stack>
        {reasonsNote &&
          <Stack>
            <Box mt={3}>
              <Typography variant="h6" mb="4px">
                <Translatable>
                  Note
                </Translatable>
                :
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" mt="10px" color="gray">
                {reasonsNote}
              </Typography>
            </Box>
          </Stack>
        }
      </Box>
    </DashboardCard>
  );
};

export default ReasonsForRejection;
