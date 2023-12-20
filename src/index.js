import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import AuthProvider from './components/Auth/AuthProvider';
import Toaster from './components/Toaster';
import { CartProvider } from './components/Cart/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <NextUIProvider className='w-full min-h-screen'>
            <App />
            <Toaster />
          </NextUIProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
