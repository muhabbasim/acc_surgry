import { Box, Button, Grid, ImageList, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { IconCalendar, IconId, IconPhone, IconStatusChange, IconUser } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'react-router'
import PageContainer from 'src/components/container/PageContainer'
import ChildCard from 'src/components/shared/ChildCard'
import api from 'src/context/apiRequest'
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb'
import { IconListDetails } from '@tabler/icons-react'
import { toUpper } from 'lodash'

import { ReactMultiImageUpload } from 'src/components/shared/ReactMultiImageUpload'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import ReactImageUpload from 'src/components/shared/ReactImageUpload'
import Translatable from 'src/Acc_components/translatable_text/Translatable'
import ErrorSkeleton from 'src/Acc_components/table_skeleton/ErrorSkeleton'
import ModalForm from 'src/Acc_components/modal/ModalForm'
import ImageDisplay from 'src/Acc_components/imageDialog/ImageDisplay'


const BCrumb = [
  {
    to: '/subscriptions',
    title: 'Subscriptions',
  },
  {
    title: 'Subscription Details',
  },
];

type ImageFilesProps = {
  file: any;
  data_url: any;
}


function AdDetails() {
  const theme = useTheme();
  const location = useLocation();
  const adId = location.pathname.split('/')[2]
  // const [ err, setErr ] = useState<any>();
  // const [ isLoadingEx, setisLoadingEx ] = useState<boolean>(true);

  const [ openAdImagesModal, setOpenAdImagesModal ] = useState<boolean>(false) 
  const [ openAdCoverModal, setOpenAdCoverModal ] = useState<boolean>(false) 

  const [ submitting, setSubmitting ] = useState<boolean>(false) 
  const [ submittingCover, setSubmittingCover ] = useState<boolean>(false) 

  // ad images
  const [ images, setImages ] = useState<any>([]) 
  const [ imagesValue, setImagesValue ] = useState<any>() 

  // ad image cover
  const [ image, setImage ] = useState<any>() 
  const [ imageValue, setImageValue ] = useState<any>() 

  const [coverDisplay, setCoverDisplay] = useState(false);

  const handleCloseCoverDisplay = () => {
    setCoverDisplay(false);
  }

  // fetch ad data
  const { data: singleAd, isLoading, isError } = useQuery({
    queryKey: ['advertisements'],
    queryFn: async () => 
    await api().get(`/advertisements/show/${adId}`).then((res) => {
      return res.data 
    })
  })

  const queryClient = useQueryClient();
  const adImagesMutation = useMutation({
    mutationFn: (values: any) => {
      return api().post(`/advertisements/update/${singleAd?.id}`, values)
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements']})
    }
  })

  const handleClose = () => {
    setOpenAdImagesModal(false);
    setOpenAdCoverModal(false);
    // setErr('')
  }

  const handleSubmitAdImages = async () => {

    try {
      setSubmitting(true);

      const formData = new FormData();

      // image processing
      const imageFiles = images.map((image: ImageFilesProps) => {
        return image.file
      })

      imageFiles.map((file: any) => {
        formData.append('images[]', file);
      });

      for ( var [key, value] of formData.entries() ){
        console.log(key,value);
      }
     
      const res = await adImagesMutation.mutateAsync(formData);
      console.log(res)

      toast.success('Ad images updated successfully')

      setImagesValue(undefined)
      setImages([])
      setSubmitting(false);
      handleClose();
      
    } catch (error) {
      if (error instanceof AxiosError) {
        // setErr(error.response?.data?.message || error.response?.data.error)
        console.log(error);
      }

      setSubmitting(false);
    }
  }

  const handleSubmitAdCover = async () => {

    try {
      setSubmittingCover(true);

      const formData = new FormData();

      // image processing
      const coverImage = image.file;
      formData.append('image', coverImage);

      for ( var [key, value] of formData.entries() ){
        console.log(key,value);
      }
     
      const res = await adImagesMutation.mutateAsync(formData);
      console.log(res)
      toast.success('Ad cover updated successfully')
      
      setImage(null);
      setImageValue(undefined);
      setSubmittingCover(false);
      handleClose();
      
    } catch (error) {
      if (error instanceof AxiosError) {
        // setErr(error.response?.data?.message || error.response?.data.error)
        console.log(error);
      }

      setSubmittingCover(false);
    }
  }

  return (
    <PageContainer title="SDC Subscription" description="this is Subscription page">
      <Breadcrumb title="Subscription" items={BCrumb} />
      
      <Grid display={'flex'} flexDirection={'column'} paddingX={{ sm: 0, md:  2, lg: 2 }} gap={4}>
        <Box>
          <Typography color={theme.palette.primary.dark} variant="h3" mt={1} fontWeight="600">
            <Translatable>
              Subscription Details
            </Translatable>
          </Typography>
        </Box>
        { singleAd ? ( 
            <>
              <ChildCard>
                <Grid container spacing={3}>
                  <Grid item sm={12} md={6} lg={6}>
                    <Stack direction="row" gap={2} alignItems="center" mb={2}>
                      <IconId size="21" />
                      <Typography variant="h6"><Translatable>Ad ID</Translatable>: <span style={{color: theme.palette.primary.main}}>{singleAd?.adId}</span></Typography>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center" mb={2}>
                      <IconUser size="21" />
                      <Typography variant="h6"><Translatable>Company</Translatable>: <span style={{color: theme.palette.success.main}}>{toUpper(singleAd?.company_name)}</span></Typography>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center" mb={2}>
                      <IconPhone size="21" />
                      <Typography variant="h6"><Translatable>Phone</Translatable>: <span style={{color: theme.palette.text.disabled}}>{singleAd?.phone}</span></Typography>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center" mb={1}>
                      <IconStatusChange size="21" />
                      <Typography variant="h6"><Translatable>Ad Status</Translatable>: <span style={{color: theme.palette.success.main}}>{toUpper(singleAd?.status)}</span></Typography>
                    </Stack>
                  </Grid>

                  <Grid item sm={12} md={6} lg={6}>
                    <Stack direction="row" gap={2} alignItems="center" mb={2}>
                      <IconCalendar size="21" />
                      <Typography variant="h6"><Translatable>Start Date</Translatable>Start Date: <span style={{color: theme.palette.primary.main}}>{singleAd?.start}</span></Typography>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center" mb={2}>
                      <IconCalendar size="21" />
                      <Typography variant="h6"><Translatable>End Date</Translatable>: <span style={{color: theme.palette.error.main}}>{singleAd?.end}</span></Typography>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center" mb={1}>
                      <IconListDetails size="21" />
                      <Typography variant="h6"><Translatable>Ad Description</Translatable>: </Typography>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center"  paddingX={4} mb={2}>
                      <Typography  variant="h6"><span style={{ color: theme.palette.text.disabled}}>{singleAd?.description}</span></Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </ChildCard>

              <Grid container spacing={4}>
                
                <Grid item sm={12} lg={12}>
                  <ChildCard>
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <Typography variant="h4">
                        <Translatable>
                          Subsctiption Type
                        </Translatable>
                      </Typography>
                    </Box>
                    <ImageList cols={1}>
                      <img
                        srcSet={singleAd?.cover}
                        alt='ad cover'
                        loading="lazy"
                        style={{ borderRadius: 8, cursor: 'pointer', width: '100%', height: '230px', objectFit: 'cover' }}
                        onClick={() => setCoverDisplay(true)}
                      />
                      <ImageDisplay
                        open={coverDisplay}
                        onClose={handleCloseCoverDisplay}
                        photo={singleAd?.cover}
                      />
                    </ImageList>
                  </ChildCard >
                </Grid>
              </Grid>
            </>
          ) : isLoading ? (
            <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={4}>
              <Skeleton width="100%" animation="wave" variant="rounded"  height={230}></Skeleton>
              <Box display={'flex'} gap={4} width={'100%'}>
                <Skeleton animation="wave" width="50%" variant="rounded" height={300}></Skeleton>
                <Skeleton animation="wave" width="50%" variant="rounded" height={300}></Skeleton>
              </Box>
            </Box>
          ) : isError && (
            <Box>
              <ErrorSkeleton/>
            </Box>
          )
        }
      </Grid>
      
      <ModalForm
        openModal={openAdImagesModal} 
        handleClose={handleClose}
        title='Upload Ad Images'
      >
        <Box mt={5} sx={{ minWidth: { sm: 400, md: 600, lg: 700 }, minHeight: '200px' }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
          <ReactMultiImageUpload
            images={images}
            setImages={setImages}
            imagesValue={imagesValue}
            setImagesValue={setImagesValue}
          />
          <Stack  my={'20px'} direction="row" justifyContent="flex-end">
            <Button sx={{width: {md: '150px', xs: '100%'}}} variant="contained" color="primary" onClick={handleSubmitAdImages}>
              {submitting ? <Translatable>Processing...</Translatable> : <Translatable>Submit</Translatable>}  
            </Button>
          </Stack>
        </Box>
      </ModalForm>

      <ModalForm
        openModal={openAdCoverModal} 
        handleClose={handleClose}
        title='Upload Ad Cover'
      >
        <Box mt={5} sx={{ minWidth: { sm: 400, md: 600, lg: 700 }, minHeight: '200px' }} justifyContent={'center'} alignItems={'center'} width={'100%'}>
          <ReactImageUpload
            imageFile={image}
            setImageFile={setImage}
            imageValue={imageValue}
            setImageValue={setImageValue}
          />
          <Stack  my={'20px'} direction="row" justifyContent="flex-end">
            <Button sx={{width: {md: '150px', xs: '100%'}}} variant="contained" color="primary" onClick={handleSubmitAdCover}>
              {submittingCover ? <Translatable>Processing...</Translatable> : <Translatable>Submit</Translatable>}  
            </Button>
          </Stack>
        </Box>
      </ModalForm>

      {/* <EditAdInfo
        handleClose={handleClose}
        openEditModal={openEditModal}
        data={singleAd!}
      /> */}
    </PageContainer>
  )
}

export default AdDetails