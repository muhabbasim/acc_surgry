// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './store/Store';
import Spinner from './Acc_components/spinner/Spinner';
import ReactQueryProvider from './ACC_providers/ReactQeuryProvider';
import './utils/i18n';
import { AuthContextProvider } from './context/authContext';
import { Toaster } from 'sonner'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AuthContextProvider>
          <ReactQueryProvider>
            <Toaster/>
            <App />
          </ReactQueryProvider>
        </AuthContextProvider>
      </Suspense>
    </Provider>
  </BrowserRouter>
)
