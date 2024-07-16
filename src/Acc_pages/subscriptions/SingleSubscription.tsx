import {
  Typography,
  Box,
  TableCell,
  TableRow,
  Stack,
  useTheme,
  Avatar,
  Chip,
} from '@mui/material';
import { upperCase } from 'lodash';

type Props = {
  el: any;
}
    
export default function SingleSubscription({el}: Props) {
  const theme = useTheme();

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Stack spacing={1}>
            <Typography color={theme.palette.primary.dark} variant="h6" fontWeight="600">
              {el?.card_id}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack spacing={1}>
            <Chip
              label={upperCase(el?.card_type)} 
              variant='filled' 
              sx={{ 
                width: 120, 
                color: el?.card_type === "gold" ? "#b27513" : ( el?.card_type === 'selver' ? "#5e5f60" : "#56317a" ), 
                backgroundColor: el?.card_type === "gold" ? "#fff9e0" : ( el?.card_type === 'selver' ? "dbdbdb" : "#f4eaff" ) 
              }}
            />
          </Stack>
        </TableCell>
       
        <TableCell>
          <Stack spacing={1}>
            <Typography color={theme.palette.secondary.dark} variant="h6" fontWeight="600">
              {el?.subscription_date}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack spacing={1}>
            <Typography color={theme.palette.error.main} variant="h6"  fontWeight="600">
              {el?.exp_date}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction="row" gap="10px" alignItems="center">
            <Avatar
              src={''}
              alt={''}
              sx={{
                borderRadius: '100%',
                width: '35',
              }}
            />
            <Box>
              <Typography variant="h6" px={0} fontSize={14} color={ theme.palette.primary.dark }>
                {el?.user_info?.name}
              </Typography>
              <Typography variant="h6" px={0} fontSize={12} color={ theme.palette.success.dark }>
                {el?.user_info?.email}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
  
}
