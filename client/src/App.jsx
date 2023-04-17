import Loader from './components/loader/loader.component';
import AuthContext from './context/auth.context';
import PreAuthRoutes from './routes/preAuthRoutes';
import PostAuthRoutes from './routes/postAuthRoutes';

import './css/app.css';

const App = () => {
  const { isLoading, isAuthenticated } = AuthContext();

  if (isLoading === true) {
    return (
      <div className='app content-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='app'>
      {/* prettier-ignore */}
      {isAuthenticated === true ? <PostAuthRoutes /> : <PreAuthRoutes />}
    </div>
  );
};

export default App;
