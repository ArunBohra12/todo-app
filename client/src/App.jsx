import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/login.page';
import Signup from './pages/auth/signup/signup.page';

import './css/app.css';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
