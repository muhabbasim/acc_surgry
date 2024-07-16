import { Autocomplete, Box, Button, ImageListItem, Stack, Typography, useTheme } from '@mui/material'
import { IconFileAnalytics, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react'
import { toast } from 'sonner';
import ModalForm from 'src/Acc_components/modal/ModalForm';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import CustomCheckbox from 'src/Acc_pages/auth/_components/CustomCheckbox';
import CustomFormLabel from 'src/Acc_pages/auth/_components/CustomFormLabel';
import CustomTextField from 'src/Acc_pages/auth/_components/CustomTextField';
import api from 'src/context/apiRequest';
import * as yup from 'yup';

type ImageProps = {
  file: any;
}

const rejectionReasons = [
  {
      id: 1,
      name: "Incorrect File Format",
      label_ar: "تنسيق الملف غير صحيح"
  },
  {
      id: 2,
      name: "File is Corrupted",
      label_ar: "الملف تالف"
  },
  {
      id: 3,
      name: "Incomplete Information",
      label_ar: "معلومات غير مكتملة"
  },
  {
      id: 4,
      name: "Unauthorized File Type",
      label_ar: "نوع الملف غير مصرح به"
  },
  {
      id: 5,
      name: "Virus Detected",
      label_ar: "تم الكشف عن فيروس"
  }
]


const validationSchema = yup.object({
  note: yup.string(),
});

export default function DeletableFile({ file }: ImageProps) {
  const theme = useTheme();
  const [err, setErr] = useState<string>('');
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [selectedReasons, setSelectedReasons] = useState<object>(); 

  const handleClose = () => {
    setOpenRejectModal(false);
  }

  // ranks data
  // const { data: rejectReasons } = useQuery({
  //   queryKey: ['reject_reasons'],
  //   queryFn: async () => 
  //   await api().get(`/reject-reasons/get-all`).then((res) => {
  //     return res.data
  //   })
  // })

  const QueryClient = useQueryClient();

  const rejectMutation = useMutation({
    mutationFn: (value: any) => {
      return api().put(`/user-requests/approve/${''}`, value);
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
        toast.success('File rejected successfully')

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


  return (
    <ImageListItem >
      <Stack
        direction="column"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        onClick={() => {''}}
      >
        <Stack spacing={2} 
          sx={{ 
          position: 'relative', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: theme.palette.primary.light, 
          color: theme.palette.primary.main, 
          width: 150, 
          height: 150,
          borderRadius: 1
        }}>
          <Box 
            style={{
              backgroundColor: 'white',
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              border: `1px solid ${theme.palette.error.main}`,
              cursor: 'pointer',
            }}
          >
            <IconX width={17} onClick={() => setOpenRejectModal(true)} color={theme.palette.error.main}/>
          </Box>
          <a style={{ color: theme.palette.primary.dark, zIndex: 10 }} href={file?.path} target="_blank" key={file?.id} >
            <Box>
              <IconFileAnalytics size={100} stroke={1}/>
            </Box>
          </a>
        </Stack>
          <Box>
          <Typography variant="h6" sx={{color: theme.palette.primary.dark, }} mb="4px">
              {file?.document_name}
            </Typography>
          </Box>
      </Stack>

      { rejectionReasons && 
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
                      options={rejectionReasons}
                      // disableCloseOnSelect
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
    </ImageListItem>
  )
}
