import logo from '../../assets/logo/logo-small.png';
import SingleLineInput from '../../components/input/singleLineInput.comopnent';

import './login.styles.css';

const Login = () => {
  return (
    <div className='auth-page'>
      <div className='auth-form'>
        <div className='auth-form__header'>
          <img src={logo} alt='ToDo' className='auth-form__logo-img' width='30' height='24' />
          <h2 className='auth-form__heading'>Login to your account</h2>
        </div>

        <form className='login-form'>
          <SingleLineInput placeholder='someone@example.com' />
        </form>
      </div>
    </div>
  );
};

export default Login;
