import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/login/login.page';
import Signup from '../pages/auth/signup/signup.page';

// This component will hold all of the routes that are seen before authentication
// But not seen after authentication
const PreAuthRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={<Navigate replace to='/login' />} />
    </Routes>
  );
};

export default PreAuthRoutes;
