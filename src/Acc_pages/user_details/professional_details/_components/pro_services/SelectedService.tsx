import { Avatar, Box, Chip, Divider, Grid, Stack, Typography, useTheme } from "@mui/material"
import Translatable from "src/Acc_components/translatable_text/Translatable"

type Props = {
  service: any
  user: any
}

export default function SelectedService({ service, user }: Props) {
  const theme = useTheme();

  return (
    <Box>
      <Stack p={2} gap={0} direction="row" py={3}>
        <Typography variant="body2"><Translatable>Service details</Translatable></Typography>
      </Stack>

      <Divider />

      <Box display="flex" alignItems="center" p={3}>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Box>
        <Chip
          label="Provider Name"
          sx={{ ml: 'auto', height: '25px', bgcolor: theme.palette.primary.dark, color: 'white' }}
          size="small"
        />
      </Box>


      <Box sx={{ px: 2 }}>
        <Stack direction="row" gap={2} alignItems="center" p={3}>
          <Typography variant="h6"> <Translatable>Description</Translatable>
            <Typography p={1} color={ theme.palette.primary.dark }>
              {service?.desc}
            </Typography>
          </Typography>
        </Stack>

        <Divider />


        <Stack direction="column" alignItems="start" p={3}>
          <Typography variant="h6" pb={2}> <Translatable>Time</Translatable></Typography>
          <Box display='flex' flexDirection='row' gap={2}>
            {service?.time?.map((time: any, i: any) => (
              <Chip
                label={time?.label}
                key={i}
                sx={{ ml: 'auto', height: '25px' }}
                color="default"
                size="medium"
              />
            ))}
          </Box>
        </Stack>

        <Divider />

        {service?.discount?.length == 0 ? null : (
    
          <Stack direction="column" gap={1} alignItems="start" p={3}>
            <Typography variant="h6"> <Translatable>Discounts</Translatable></Typography>

            <Grid container spacing={3} >
              {service?.discount.map((item: any) => (

                <Grid item lg={4} key={item?.id}>
                  <Stack direction="row" gap={2} p={2} mt={1} sx={{ border: '1px solid #eaeaea' }}>
                    <Typography variant="h6" fontWeight={800} sx={{ color: `${item?.card === 'Gold'? '#ddb906' : item?.card === 'Selver' ? 'gray' : '#56317a'}`}}>
                      {item?.card}
                    </Typography>
                    <Chip
                      label={`${item?.amount}%`}
                      sx={{ ml: 'auto', height: '25px', bgcolor: theme.palette.primary.dark, color: 'white' }}
                      size="small"
                    />
                  </Stack>
                </Grid>
              ))}
            </Grid>  
          </Stack>
        )}


      <Divider />

      {service?.products?.length == undefined ? null : (
        <>
          {/* <Divider /> */}
          <Box p={3}>
            <Typography variant="h6">Products ({service?.products?.length})</Typography>
            <Grid container spacing={3}>
              {service?.products?.map((product: any) => {
                return (
                  <Grid item lg={4} key={product.id} sx={{ cursor: 'pointer'}}>
                    <Stack direction="row" gap={2} mt={2} p={2} sx={{ border: '1px solid #eaeaea' }}>
                      <Avatar
                        variant="rounded"
                        sx={{ width: '48px', height: '48px', bgcolor: (theme:any) => theme.palette.grey[100] }}
                      >
                        <Avatar
                          src={product.image}
                          alt="av"
                          variant="rounded"
                          sx={{ width: '24px', height: '24px' }}
                        ></Avatar>
                      </Avatar>
                      <Box mr={'auto'}>
                        <Typography variant="subtitle2" fontWeight={600} mb={1}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2">Price: ${product.price}</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Divider/>
        </>
      )}
    </Box>
  </Box>
)
}
