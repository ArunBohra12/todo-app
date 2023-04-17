import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/login.page';
import Signup from './pages/auth/signup/signup.page';
import Loader from './components/loader/loader.component';
import AuthContext from './context/auth.context';

import './css/app.css';

const App = () => {
  const { isLoading } = AuthContext();

  if (isLoading === true) {
    return (
      <div className='app content-center'>
        <Loader />
      </div>
    );
  }

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
