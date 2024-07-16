// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { Button, Box, Stack, Typography, useTheme, MenuItem, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from 'src/context/apiRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

import { useNavigate } from 'react-router-dom';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import ModalForm from 'src/Acc_components/modal/ModalForm';
import CustomFormLabel from 'src/Acc_pages/auth/_components/CustomFormLabel';
import CustomSelect from 'src/Acc_components/form_components/custom_elements/CustomSelect';
import CustomCheckbox from 'src/Acc_pages/auth/_components/CustomCheckbox';
import CustomTextField from 'src/Acc_pages/auth/_components/CustomTextField';


const validationSchema = yup.object({
  note: yup.string(),
});

type Props = {
  user: any
}

export const ActionButtons = ({ user }: Props) => {
  const [err, setErr] = useState<string>('');
  const theme = useTheme();
  const [selectedRank, setSelectedRank] = useState<string>('');
  const [openAcceptModal, setOpenAcceptModal] = useState<boolean>(false);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isDeactivating, setisDeactivating] = useState<boolean>(false);
  const [selectedReasons, setSelectedReasons] = useState<object>(); 

  const router = useNavigate()

  const handleClose = () => {
    setOpenRejectModal(false);
    setOpenAcceptModal(false);
    setErr('')
  }

  const userStatus = user?.isActive

  // ranks data
  const { data: ranksData } = useQuery({
    queryKey: ['ranks'],
    queryFn: async () => 
    await api().get(`/ranks`).then((res) => {
      return res.data
    })
  })

  // ranks data
  const { data: rejectReasons } = useQuery({
    queryKey: ['reject_reasons'],
    queryFn: async () => 
    await api().get(`/reject-reasons/get-all`).then((res) => {
      return res.data
    })
  })

  const QueryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: (value: any) => {
      return api().put(`/user-requests/approve/${user.request_id}`, value);
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['current_user'] });
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: () => {
      return api().post(`/users/change-status/${user.id}`);
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['current_user'] });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: (value: any) => {
      return api().put(`/user-requests/approve/${user.request_id}`, value);
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['current_user'] });
    }
  });

  const formik = useFormik({
    initialValues: {
      note: '',
    },

    validationSchema,
    onSubmit: async (values) => {

      try {
        const res = await rejectMutation.mutateAsync({...values, reasons: selectedReasons, status: "rejected" });
        console.log(res);
        toast.success('User rejected')
        router(`/requests`)

        setErr('')
        handleClose();

      } catch (error) {
        if (error instanceof AxiosError) {
          setErr(error.response?.data?.message || error.response?.data.error)
          console.log(error)
        }
      }
    },
  });

  const { isSubmitting } = formik

  const handleApprove = async () => {

    try {
      setIsApproving(true)

      console.log({'rank_id': selectedRank, status: "accepted"});
      const res = await approveMutation.mutateAsync({'rank_id': selectedRank, status: "accepted"})
      console.log(res);
      toast.success('User status updated successfully')
      router(`/users/pro_detail/${user.id}`)
      setIsApproving(false)

    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data?.message || error.response?.data.error)
        console.log(error)
      }
      setIsApproving(false)
    }
  }


  const handleUpdateUserStatus = async () => {

    try {
      setisDeactivating(true)

      const res = await updateStatusMutation.mutateAsync()
      console.log(res);
      if( !userStatus ) {
        toast.success('User is activated successfully')
      } else {
        toast.success('User is deactivated successfully')
      }
      setisDeactivating(false)

    } catch (error) {
      console.log(error)
      setisDeactivating(false)
    }
  }

  return (
    <>
      { user?.isApproved ? (
        <Box display='flex' sx={{ border: '1px solid #e8e8e8', paddingX: '20px'}}>
          <Box display={'flex'} gap={2} width={'100%'} justifyContent={'end'}> 
            <Stack my={'20px'} direction="row" justifyContent="flex-end">
              <Button sx={{width: {md: '150px', xs: '100%'}}} variant="contained" color={ !userStatus ? 'primary' : 'error'} onClick={handleUpdateUserStatus}>
                {isDeactivating ? <Translatable>Processing...</Translatable> : !userStatus ? <Translatable>Activate</Translatable> :  <Translatable>Deactivate</Translatable>}  
              </Button>
            </Stack>
          </Box>
        </Box>
      ) : (
        <Box display='flex' sx={{ border: '1px solid #e8e8e8', paddingX: '20px'}}>
          <Box display={'flex'} gap={2} width={'100%'} justifyContent={'end'}> 
            <Stack my={'20px'} direction="row" justifyContent="flex-end">
              <Button sx={{width: {md: '150px', xs: '100%'}}} variant="contained" onClick={() => setOpenRejectModal(true)} color='error'>
                <Translatable>
                  Reject  
                </Translatable>
              </Button>
            </Stack>
            <Stack my={'20px'} direction="row" justifyContent="flex-end">
              <Button sx={{width: {md: '150px', xs: '100%'}}} variant="contained" color='primary' onClick={() => setOpenAcceptModal(true)}>
                {isApproving ? <Translatable>Processing...</Translatable> : <Translatable>Approve</Translatable>}  
              </Button>
            </Stack>
          </Box>
        </Box>
      )}

      <ModalForm
        openModal={openAcceptModal} 
        handleClose={handleClose}
        title='Rank assignment'
      >
        <Box sx={{ minWidth: { sm: '100%', md: 600, lg: 700 } }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
          <Stack>
            <Box width={{sm: '100%', md:'100%' }}>
              <Box width={{sm: '100%', md:'100%' }}>
                <CustomFormLabel>
                <Translatable>
                  Select Rank
                </Translatable>
                </CustomFormLabel>
                <CustomSelect
                  labelId="Rank_type_select"
                  id="field_type"
                  fullWidth
                  name="field_type"
                  value={selectedRank} 
                  onChange={(e: any) => setSelectedRank(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {ranksData?.data?.map((el: any) => (
                    <MenuItem key={el.id} value={el.id}>{el.en_name}</MenuItem>
                  ))}
                </CustomSelect>
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
          
          <Stack mt={'40px'} direction="row" justifyContent="flex-end">
            <Button sx={{width: {xs: '100%', lg: '150px', md: '100%'}}} color='error' variant="contained" onClick={handleApprove} type="submit">
              { isApproving ? <Translatable>Processing...</Translatable> : <Translatable>Submit</Translatable>}  
            </Button>
          </Stack>
        </Box>
      </ModalForm>

      { rejectReasons && 
        <ModalForm
          openModal={openRejectModal} 
          handleClose={handleClose}
          title='Reject Request'
        >
          <Box sx={{ minWidth: { sm: '100%', md: 600, lg: 700 } }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
            <form onSubmit={formik.handleSubmit}>
              <Stack>
                <Box width={{sm: '100%', md:'100%' }}>
                  <Box width={{sm: '100%', md:'100%' }}>
                    <CustomFormLabel>
                      <Translatable>
                        Select Reason
                      </Translatable>
                    </CustomFormLabel>

                    <Autocomplete
                      multiple
                      id="multi_reasons"
                      options={rejectReasons}
                      disableCloseOnSelect
                      getOptionLabel={(option: any) => option?.name}
                      onChange={(_e, values) => {
                        const selectedId = values?.map((el: any) => String(el.id))
                        setSelectedReasons(selectedId);
                      }}
                      isOptionEqualToValue={(option, value) => option?.id === value?.id}

                      renderOption={(props, option, { selected }) => {
                        return (
                          <li {...props}>
                            <CustomCheckbox style={{ marginRight: 8 }} checked={selected} />
                            {option?.name}
                          </li>
                        )
                      }}
                      fullWidth
                      filterSelectedOptions
                      renderInput={(params) => (
                        <CustomTextField {...params} placeholder="Selected reasons" aria-label="Mulit" />
                      )}
                    />
                  </Box>
                  <Box width={{sm: '100%', md:'100%' }}>
                    <CustomFormLabel>
                      <Translatable>
                        Additional Note
                      </Translatable>
                    </CustomFormLabel>
                    <CustomTextField
                      id="note"
                      name="note"
                      placeholder="Write additional notes"
                      multiline
                      fullWidth
                      value={formik.values.note} 
                      onChange={formik.handleChange}
                      error={formik.touched.note && Boolean(formik.errors.note)}
                      helperText={formik.touched.note && formik.errors.note}
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
              
              <Stack mt={'40px'} direction="row" justifyContent="flex-end">
                <Button sx={{width: {xs: '100%', lg: '150px', md: '100%'}}} color='error' variant="contained" type="submit">
                  { isSubmitting ? <Translatable>Processing...</Translatable> : <Translatable>Reject</Translatable>}  
                </Button>
              </Stack>
            </form>
          </Box>
        </ModalForm>
      }
    </>

  );
};
