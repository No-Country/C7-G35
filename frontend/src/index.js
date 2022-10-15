import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import { FormProvider } from './providers/FormProviders';
import { UserProvider } from './providers/UserProviders';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <UserProvider>
        <FormProvider>
          <RouterProvider router={Router} />
        </FormProvider>
      </UserProvider>
    </CookiesProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
