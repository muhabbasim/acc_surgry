// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Box, 
  Drawer, 
  ListItemText,
  Chip,
  ListItemButton,
  Stack,
  List,
  ListItem,
} from '@mui/material';

import ChildCard from 'src/components/shared/ChildCard';
import Translatable from 'src/Acc_components/translatable_text/Translatable';
import AppCard from 'src/components/shared/AppCard';
import Scrollbar from 'src/Acc_components/custom-scroll/Scrollbar';
import SelectedService from './SelectedService';


type Props = {
  user: any
}

const secdrawerWidth = 340;

const ServicesCard = ({ user }: Props) => {

  const firstService = user?.services[0]
  const [selectedService, setSelectedService] = useState<string>(firstService?.id);
  
  const service =  user?.services.find((service: any) => service.id === selectedService);

  return (
    <ChildCard>
      <Typography variant="h4" pb={2}><Translatable>Services</Translatable></Typography>
      
      <AppCard>
        <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: '100%', md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <List>
            <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>

            { user?.services?.map((service: any, i: any) => (
              <ListItem key={service?.id} alignItems="flex-start"
                onClick={() => {setSelectedService(service.id)}}
              >
                <ListItemButton 
                  sx={{ mb: 1, py: 2 }} 
                    selected={service?.id === selectedService} 
                    alignItems="flex-start"
                  >
                  <ListItemText onClick={() => {}}>
                    <Stack direction="row" gap="10px" alignItems="center">
                      <Typography variant="subtitle2" mb={0.5} fontWeight={600} mr={'auto'}>
                        {service?.service_name}
                      </Typography>
                      <Chip
                        label={`Sr ${i + 1}`}
                        size="small"
                        color={service?.service_name === 'market' ? 'primary' : service?.service_name === 'cosmatics' ? 'error' : 'success'}
                      />
                    </Stack>
                    <Typography variant="subtitle2" noWrap width={'80%'} color="text.secondary">
                      {service?.desc}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            </Scrollbar>

          </List>
        </Box>

        <Drawer
          anchor="right"
          variant="permanent"
          sx={{
            zIndex: 0,
            width: '200px',
            flex: '1 1 auto',
            [`& .MuiDrawer-paper`]: { position: 'relative' },
          }}
        >
          <SelectedService service={service} user={user}/>
        </Drawer>
      </AppCard>
    </ChildCard >
  )
};

export default ServicesCard;
