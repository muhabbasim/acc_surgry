import { useState } from 'react';
import { Box, Menu, Button, Divider } from '@mui/material';
import { IconChevronDown } from '@tabler/icons-react';
import AppLinks from './AppLinks';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

const AppDD = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { t } = useTranslation();

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <Box>
        <Button
          aria-label="show 11 new notifications"
          color="inherit"
          variant="text"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            bgcolor: anchorEl2 ? 'primary.light' : '',
            color: anchorEl2 ? 'primary.main' : (theme) => theme.palette.text.secondary,
          }}
          onClick={handleClick2}
          endIcon={<IconChevronDown size="15" style={{ marginLeft: '-5px', marginTop: '2px' }} />}
        >
            {t('Apps')}
        </Button>
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '600px',
            },
            '& .MuiMenu-paper ul': {
              p: 0,
            },
          }}
        >
            <Box display="flex">
              <Box p={4} pr={0} pb={3}>
                <AppLinks />
                <Divider />
              </Box>
              <Divider orientation="vertical" />
            </Box>
        </Menu>
      </Box>
    </>
  );
};

export default AppDD;
