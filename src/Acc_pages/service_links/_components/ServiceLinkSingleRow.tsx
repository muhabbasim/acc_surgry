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
  Button, 
  useTheme,
  Collapse,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconTrash } from '@tabler/icons-react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/context/apiRequest';
import { AxiosError } from 'axios';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import ModalForm from 'src/Acc_components/modal/ModalForm';
import ServiceLinkSubRow from './ServiceLinkSubRow';


type RowProps = {
  row: any
}

export default function ServiceLinkSingleRow({ row }: RowProps) {
  
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');

  const handleClose = () => {
    setOpenDeleteModal(false);
  } 

  // delete mutation
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => {
      return api().delete(`/service-types/${row?.id}/links`)
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service_links']})
    }
  })

  const handleDelete = async () => {
    try {
      setIsSubmitting(true)

      await deleteMutation.mutateAsync();
      toast.success('Service link deleted successfully')
      handleClose()

      setIsSubmitting(false)

    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
      }
      console.log(error)
    }
  }


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
              {row?.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Chip
            label={row?.services?.length}
            variant='filled' 
            sx={{ 
              width: 70, 
              color: theme.palette.success.main, 
              backgroundColor: 'success.light' 
            }}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                  Service Links
                </Translatable>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">
                        <Translatable>
                          Label
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
                  {row?.services?.map((subClass: any) => (
                    <ServiceLinkSubRow key={subClass?.id} subRowEl={subClass}/>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {openDeleteModal && (
        <TableRow>
          <TableCell>
            <ModalForm 
              openModal={openDeleteModal} 
              handleClose={handleClose}
              title='Delete Service Link'
            >
              <Box sx={{ width: { xs: 250, md: 400} }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <Box width={'100%'} pt={2}>
                  <Typography>
                    <Translatable>
                      Are you sure you want to delete this service link?
                    </Translatable>
                  </Typography>
                  <Box display={'flex'} gap={2} pt={2}>
                    <Typography color="textSecondary" fontWeight="700">
                      <Translatable>
                        {row.user_type} 
                      </Translatable>
                      {" "} service links
                    </Typography>
                  </Box>
                </Box>

                {err && (
                  <Box paddingTop={4}>
                    <Typography textAlign={'center'} sx={{color: theme.palette.error.main}}>
                      {err}
                    </Typography>
                  </Box>
                )}
              <Stack mt={'30px'} direction="row" justifyContent="flex-end">
                <Button
                  color="error"
                  startIcon={<IconTrash width={18} />}
                  onClick={handleDelete}
                >
                  {isSubmitting ? <Translatable>Processing...</Translatable> : <Translatable>Delete</Translatable>}  
                </Button>
              </Stack>
              </Box>
            </ModalForm>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
