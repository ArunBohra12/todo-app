import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './context/auth.context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer /> {/* This It will take care of rendering all notifications emitted */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
