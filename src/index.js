import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import AuthProvider from './components/Auth/AuthProvider';
import Toaster from './components/Toaster';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NextUIProvider className='w-full min-h-screen'>
          <App />
          <Toaster />
        </NextUIProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
