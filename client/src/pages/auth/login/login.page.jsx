import { useState } from 'react';

import logo from '../../../assets/logo/logo-small.png';
import Button from '../../../components/button/button.component';
import SingleLineInput from '../../../components/input/singleLineInput.comopnent';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const loginSubmitHandler = e => {
    e.preventDefault();
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

          <Button className='auth-form__submit-btn'>Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
