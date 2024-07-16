// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  React.useEffect(() => {
    // Update the document title using the browser API
    const timer = setTimeout(() => {
      handleClick();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          sx={{ width: '100%', color: 'white' }}
        >
          <AlertTitle>{t('! Welcome To Acc Controll pannel')}</AlertTitle>
          
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Welcome;
