import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteManager from './routes';
import { GlobalStyle } from './styles/global';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouteManager />
    <ToastContainer autoClose={2000} />
  </React.StrictMode>,
);
