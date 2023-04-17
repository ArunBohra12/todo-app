import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../../api/auth';

import logo from '../../../assets/logo/logo-small.png';
import Button from '../../../components/button/button.component';
import SingleLineInput from '../../../components/input/singleLineInput.comopnent';
import AuthContext from '../../../context/auth.context';
import { AUTH_TOKEN_STORAGE_KEY } from '../../../config/constants';
import { successToast } from '../../../utils/toast';

// This style will be loaded for both login and signup page
import '../auth.styles.css';

const Signup = () => {
  const { setUser } = AuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const signupSubmitHandler = async e => {
    e.preventDefault();

    const signupData = await signup({ name, email, password, confirmPassword });

    if (!signupData) return;

    successToast('Signup successful');

    const { token, user } = signupData;

    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    setUser(user);
  };

  return (
    <div className='auth-page'>
      <div className='auth-form-container'>
        <div className='auth-form__header'>
          <img src={logo} alt='ToDo' className='auth-form__logo-img' width='30' height='24' />
          <h2 className='auth-form__heading'>Create an account</h2>
        </div>

        <form className='auth-form' onSubmit={signupSubmitHandler}>
          <SingleLineInput type='text' placeholder='Your Name' value={name} onChange={e => setName(e.target.value)} />

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

          <SingleLineInput
            type={isPasswordHidden === true ? 'password' : 'text'}
            placeholder='********'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
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
            <Link to='/login' className='switch-auth-page'>
              Already have an account? Login!
            </Link>
          </div>

          <Button className='auth-form__submit-btn'>Signup</Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
