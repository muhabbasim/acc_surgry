import { FC, useContext, useEffect } from 'react';
import { styled, Container, Box, useTheme } from '@mui/material';
import { useSelector } from 'src/store/Store';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppState } from 'src/store/Store';
import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import Customizer from './shared/customizer/Customizer';
import { useTranslation } from 'react-i18next';
import { AuthContext } from 'src/context/authContext';
import { Languages } from 'src/data/LanguageData';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayout: FC = () => {
  const { i18n } = useTranslation();
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();
  const route = useNavigate();
  const { currentUser } = useContext(AuthContext)
  const currentLang = Languages.find((_lang) => _lang.value === customizer.isLanguage) || Languages[0];
  
  if (!currentUser) { 
    route('/auth/login');
  }


  useEffect(() => {
    i18n.changeLanguage(customizer.isLanguage);
  }, [currentLang]);

  return (
    <MainWrapper>

      <Sidebar />

      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
          }),
        }}
      >

        <Header />
        
        {/* PageContent */}
        <Container
          maxWidth="xl"
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >

          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>

        </Container>
        <Customizer />
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
