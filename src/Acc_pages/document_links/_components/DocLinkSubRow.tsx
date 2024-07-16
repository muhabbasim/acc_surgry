import {
  Typography,
  TableCell,
  TableRow,
  useTheme,
  Avatar,
  IconButton,
  Box,
  Stack,
  Button,
  Switch,
  Chip,
} from '@mui/material';
import { IconEdit, IconImageInPicture, IconMail, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import api from 'src/context/apiRequest';
import { useFormik } from 'formik';
import { IconVideo } from '@tabler/icons-react';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import CustomFormLabel from 'src/Acc_pages/auth/_components/CustomFormLabel';
import ModalForm from 'src/Acc_components/modal/ModalForm';


type SubRowProps = {
  subRowEl: any
}

const docCustomized = [

  {
    id: 2,
    name: 'Document lable',
    tags: 'Market, Mall',
    doc_type: 'vid',
    percent: 98,
    icon: <IconVideo/>,
    color: '#0399ea',
    lightcolor: '#bce7ff',
  },
  {
    id: 3,
    name: 'Document lable',
    tags: 'Chocolate, Yummy',
    doc_type: 'image',
    percent: 46,
    icon: <IconImageInPicture/>,
    color: '#af8f00',
    lightcolor: '#fff1b5',
  },
  {
    id: 4,
    name: 'Document lable',
    tags: 'Elecric, Wire, Current',
    doc_type: 'pdf',
    percent: 23,
    icon: <IconMail/>,
    color: '#156d6d',
    lightcolor: '#d3ffff',
  },
];

export default function DocLinkSubRow({ subRowEl }: SubRowProps) {
  const theme = useTheme();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState<boolean>(false);

  const [err, setErr] = useState<string>('');
  
  const elCustomized = docCustomized.find((doc: any) => doc.doc_type === subRowEl?.doc_type )
  // console.log(subRowEl)

  const handleClose = () => {
    setOpenDeleteModal(false);
    setOpenEditModal(false);
    setErr('')
  } 

  // edit mutation
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (values: object) => {
      return api().put(`/user-type-documents/update/${subRowEl?.id}`, values);
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document_links']})
    }
  })

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => {
      return api().delete(`/user-type-documents/${subRowEl?.id}`);
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document_links']})
    }
  })


  // submit mutation
  const formik = useFormik({
    initialValues: {
      isRequired: subRowEl?.isRequired,
      isActive: subRowEl?.isActive
    },
    onSubmit: async (values) => {
      try {
        console.log(values)
        const res = await editMutation.mutateAsync(values)
        console.log(res)
        toast.success('Document updated successfully')
        handleClose()

      } catch (error) {
        if(error instanceof AxiosError) {
          setErr(error.response?.data?.message || error.response?.data.error)
        }
        console.log(error);
      }
    },
  });

  const { isSubmitting } = formik


  // delete funcion 
  const handleDelete = async () => {
    try {
      setIsSubmittingDelete(true);

      await deleteMutation.mutateAsync();
      toast.success('Document type deleted successfully')
      handleClose()

      setIsSubmittingDelete(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
      }
    }
  }

  return (
    <>
      <TableRow key={subRowEl?.id}>
       
        <TableCell >
          <Typography color="textSecondary" fontWeight="400">
            {subRowEl?.document_type?.name}
          </Typography>
        </TableCell>

        <TableCell>
          <Box display={'flex'} gap={2} alignItems={'center'}>

            <Avatar
              variant="rounded"
              sx={{ bgcolor: elCustomized?.lightcolor, color: elCustomized?.color, width: 40, height: 40 }}
            >
              {elCustomized?.icon}
            </Avatar>
            <Typography
              color="textSecondary"
              variant="subtitle2"
              fontWeight="400" whiteSpace="nowrap">
              {subRowEl?.type}
            </Typography>
          </Box>

        </TableCell>
        <TableCell>
          <Box>
            {subRowEl?.isRequired ? (
              <Chip 
                label={<Translatable>TRUE</Translatable>} 
                variant='filled' 
                sx={{ 
                  width: 90, 
                  color: theme.palette.primary.main, 
                  backgroundColor: 'primary.light' 
                }}
              />
            ) : (
              <Chip 
                label={<Translatable>FALSE</Translatable>} 
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
        <TableCell>
          <Box>
            {subRowEl?.isActive ? (
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
        <TableCell>
          <IconButton onClick={() => setOpenDeleteModal(true)}>
            <IconTrash width={18} color={theme.palette.error.main}/>
          </IconButton>
          <IconButton onClick={() => setOpenEditModal(true)}>
            <IconEdit width={18}  color={theme.palette.secondary.main}/>
          </IconButton>
        </TableCell>
      </TableRow>

      { openEditModal && (
        <TableRow>
          <TableCell>
            <ModalForm 
              openModal={openEditModal} 
              handleClose={handleClose}
              title='Edit Document'
            >
              <Box sx={{ minWidth: { sm: '100%', md: 500, lg: 500 }}}  justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <form onSubmit={formik.handleSubmit}>
                  <Stack 
                    justifyContent={'center'}
                    sx={{ display: 'flex', flexDirection: { sx:'column', md: 'row', lg: 'row'}, gap: { md: 3 } }}
                  >
                    <Box>
                      <CustomFormLabel>
                        <Translatable>
                          Is Required
                        </Translatable>
                      </CustomFormLabel>
                      <Box textAlign="center">
                        <Switch
                          defaultChecked={subRowEl?.isRequired}
                          color='success'
                          onChange={formik.handleChange}
                          name="isRequired"
                        />
                      </Box>
                    </Box>
                    
                    <Box>
                      <CustomFormLabel>
                        <Translatable>
                          Is Active
                        </Translatable>
                      </CustomFormLabel>
                      <Box textAlign="center">
                        <Switch
                          defaultChecked={subRowEl?.isActive}
                          onChange={formik.handleChange}
                          name="isActive"
                        />
                      </Box>
                    </Box>
                  </Stack>
                  {err && (
                    <Box paddingTop={4}>
                      <Typography textAlign={'center'} sx={{color: theme.palette.error.main}}>
                        {err}
                      </Typography>
                    </Box>
                  )}
                  <Stack mt={'30px'} direction="row" justifyContent="flex-end">
                    <Button sx={{width: {xs: '100%', lg: '150px', md: '100%'}}} variant="contained" type="submit">
                      {isSubmitting ? <Translatable>Processing...</Translatable> : <Translatable>Edit</Translatable>} 
                    </Button>
                  </Stack>
                </form>
              </Box>
            </ModalForm>
          </TableCell>
        </TableRow>
      )}

      {openDeleteModal && (
        <TableRow>
          <TableCell>
            <ModalForm
              openModal={openDeleteModal} 
              handleClose={handleClose}
              title='Delete Document type'
            >
              <Box sx={{ width: { xs: 250, md: 400} }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                    <Box width={'100%'} pt={2}>
                      <Typography>
                        <Translatable>
                          Are you sure you want to delete this document?
                        </Translatable>
                      </Typography>
                      <Box display={'flex'} gap={2} pt={2}>
                        <Typography color="textSecondary" fontWeight="700">
                          <Translatable>
                            {subRowEl.name}
                          </Translatable>
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
                      { isSubmittingDelete ? <Translatable>Processing...</Translatable> : <Translatable>Delete</Translatable>}  
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
