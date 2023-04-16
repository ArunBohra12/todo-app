import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer /> {/* This It will take care of rendering all notifications emitted */}
    </BrowserRouter>
  </React.StrictMode>
);
