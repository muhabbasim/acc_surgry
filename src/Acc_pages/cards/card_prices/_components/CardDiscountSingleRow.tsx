import {
  Typography,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  useTheme,
  Collapse,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
 import CardDiscountSubRow from './CardDiscountSubRow';


type RowProps = {
  row: any
}

export default function CardDiscountSingleRow({ row }: RowProps) {
  
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" fontWeight="600">
              {row.en_name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" fontWeight="600">
              {row.ar_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Chip
            label={`$${row?.price}`}
            variant='filled' 
            sx={{ 
              width: 70, 
              color: 'white', 
              backgroundColor: theme.palette.primary.dark,
            }}
          />
        </TableCell>

        <TableCell>
          <Box>
            {row?.isActive === true ? (
                <Chip 
                  label={<Translatable>ACTIVE</Translatable>} 
                  variant='filled' 
                  sx={{ 
                    width: 90, 
                    color: theme.palette.primary.main, 
                    backgroundColor: 'primary.light' 
                  }}
                />
            ) : (
              <Chip 
                label={<Translatable>INACTIVE</Translatable>} 
                variant='filled' 
                sx={{ 
                  width: 90, 
                  color: theme.palette.error.main, 
                  backgroundColor: 'error.light' 
                }}
              />
            )}
          </Box>
        </TableCell>

      </TableRow>

      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0, margin: 'auto' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  mt: 2,
                  backgroundColor: (theme) => theme.palette.grey.A200,
                  p: '5px 15px',
                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey.A200
                        : 'rgba(0, 0, 0, 0.87)'
                    }`,
                }}
              >
                <Translatable>
                  Card Discounts
                </Translatable>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell/>
                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Discount
                        </Translatable>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Price
                        </Translatable>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Reservation Count
                        </Translatable>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Status
                        </Translatable>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Action
                        </Translatable>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.discounts?.map((subClass: any) => (
                    <CardDiscountSubRow key={subClass?.id} subRowEl={subClass}/>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </>
  );
}
