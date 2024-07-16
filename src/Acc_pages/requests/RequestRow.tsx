
import {
  Box,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Chip,
  Stack,
  Avatar,
  Tooltip,
  useTheme,
} from '@mui/material';
import { IconEye } from '@tabler/icons-react';
import { upperCase } from 'lodash';
import { Link } from 'react-router-dom';
import { RequestProps } from './Requests';
import Translatable from 'src/Acc_components/translatable_text/Translatable';


type Props = {
  el: RequestProps;
}

export default function RequestRow({ el }: Props) {
  const theme = useTheme();

  return (
    <TableRow hover>
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
            <Typography variant="h6" px={1} style={{display: 'inline'}} color={ theme.palette.primary.main }>
              {el?.name}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography
          color="textSecondary"
          noWrap
          sx={{ maxWidth: '250px' }}
          variant="subtitle2"
          fontWeight={400}
        >
          {el.username}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          color="textSecondary"
          noWrap
          sx={{ maxWidth: '250px' }}
          variant="subtitle2"
          fontWeight={400}
        >
          {el.email}
        </Typography>
      </TableCell>

      <TableCell>
        <Box>
          <Chip 
            label={<Translatable>{upperCase(el.type)}</Translatable>}
            variant='filled' 
            sx={{ 
              width: 110, 
              color: 'white', 
              backgroundColor: 'primary.dark'
            }}
          />
        </Box>
      </TableCell>

      <TableCell>
        <Box>
          <Chip 
            label={el.isApproved ? <Translatable>APPROVED</Translatable> : <Translatable>DISAPPROVED</Translatable>} 
            variant='filled' 
            sx={{ 
              width: 120, 
              color: el.isApproved === true ? theme.palette.primary.main : theme.palette.error.main, 
              backgroundColor: el.isApproved === true ? theme.palette.primary.light : theme.palette.error.light, 
            }}
          />
        </Box>
      </TableCell>
   
      <TableCell align="right">
        <Tooltip title="Request details">
          <IconButton 
            component={Link}
            to={`/requests/req_detail/${el.id}`}
          >
            <IconEye/>
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
  
}
