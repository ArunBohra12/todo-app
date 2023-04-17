import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo/logo-small.png';
import Button from '../../../components/button/button.component';
import SingleLineInput from '../../../components/input/singleLineInput.comopnent';
import AuthContext from '../../../context/auth.context';
import { login } from '../../../api/auth';
import { AUTH_TOKEN_STORAGE_KEY } from '../../../config/constants';
import { successToast } from '../../../utils/toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const { setUser } = AuthContext();

  const loginSubmitHandler = async e => {
    e.preventDefault();

    const loginData = await login({ email, password });

    if (!loginData) return;

    successToast('Login successful');

    const { token, user } = loginData;

    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    setUser(user);
  };

  return (
    <div className='auth-page'>
      <div className='auth-form-container'>
        <div className='auth-form__header'>
          <img src={logo} alt='ToDo' className='auth-form__logo-img' width='30' height='24' />
          <h2 className='auth-form__heading'>Login to your account</h2>
        </div>

        <form className='auth-form' onSubmit={loginSubmitHandler}>
          <SingleLineInput
            type='email'
            placeholder='someone@example.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <SingleLineInput
            type={isPasswordHidden === true ? 'password' : 'text'}
            placeholder='********'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <label htmlFor='show-password' className='show-password-label'>
            <input
              type='checkbox'
              id='show-password'
              checked={!isPasswordHidden}
              onChange={e => setIsPasswordHidden(!e.target.checked)}
            />
            <span>Show password</span>
          </label>

          <div>
            <Link to='/signup' className='switch-auth-page'>
              No Account? Create one!
            </Link>
          </div>

          <Button className='auth-form__submit-btn'>Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
