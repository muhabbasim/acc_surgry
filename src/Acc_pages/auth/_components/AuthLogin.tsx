// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import { Box, Button, Stack, FormGroup, FormControlLabel, Typography, useTheme } from '@mui/material';
import CustomFormLabel from './CustomFormLabel';
import CustomTextField from './CustomTextField';
import CustomCheckbox from './CustomCheckbox';
import { AuthContext } from 'src/context/authContext';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import Translatable from 'src/Acc_components/translatable_text/Translatable';


const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),

});

const AuthLogin = () => {
  const { login } = useContext(AuthContext);
  const [ err, setErr ] = useState('');
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,
    onSubmit: async (values) => {
      
      try {
        const res = await login(values);  
        console.log(res);
        toast.success('Logged in successfully')
      } catch (error) {
        if (error instanceof AxiosError) {
          setErr(error.response?.data?.message || error.response?.data.error)
          console.log(error)
        }
      }
    },
  });

  const { isSubmitting } = formik

  useEffect(() => {
    setTimeout(() => {
      setErr('')
    }, 10000);
  }, [err]) 


  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <Box>
          <CustomFormLabel>Email Address</CustomFormLabel>
          <CustomTextField
            fullWidth
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box mb={3}>
          <CustomFormLabel>Password</CustomFormLabel>
          <CustomTextField
            fullWidth
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
      </Stack>

      { err && (
        <Box style={{ color: theme.palette.error.main, paddingTop: 20 }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          {err} 
        </Box>
      )}

      <Stack justifyContent="space-between" direction="row" alignItems="center" mb={2}>
        <FormGroup>
          <FormControlLabel
            control={<CustomCheckbox defaultChecked />}
            label="Remeber this Device"
          />
        </FormGroup>
        <Typography
          component={Link}
          to="/auth/forgot_password"
          fontWeight={600}
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
          }}
        >
          ? Forgot Password
        </Typography>
      </Stack>
      <Box>
        <Button sx={{width: '100%'}} variant="contained" type="submit">
          {isSubmitting ? <Translatable>Processing...</Translatable> : <Translatable>Login</Translatable>}  
        </Button>
      </Box>
    </form>
  );
};

export default AuthLogin;
