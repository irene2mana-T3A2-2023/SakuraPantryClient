import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import App from './App';
import AuthProvider from './components/Auth/AuthProvider';
import Toaster from './components/Toaster';
import { CartProvider } from './components/Cart/CartContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <NextUIProvider className='w-full min-h-screen'>
            <App />
            <Toaster />
          </NextUIProvider>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
