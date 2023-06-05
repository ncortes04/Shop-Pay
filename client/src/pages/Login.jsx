import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../utils/apiRoutes';
import authService from '../utils/auth';
import discount from '../assets/discount.svg';
import logo from '../assets/shop-pay.svg';
import lock from '../assets/lock.svg';
import mail from '../assets/mail-letter.svg';

const Login = () => {
  const navigate = useNavigate();
  const [toggleRegister, setToggleRegister] = useState('login');
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  if (authService.loggedIn()) {
    navigate('/');
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      if (toggleRegister === 'register') {
        response = await register(userFormData);
      } else {
        response = await login(userFormData);
      }

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, foundUser } = await response.json();
      authService.login(token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
      username: '',
    });
  };

  const setToggle = function (e) {
    const { name } = e.target;
    e.preventDefault();
    setToggleRegister(name);
  };

  return (
    <div className='login-parent-container'>
      <div className='login-container'>
        <div className='shorflex login-banner'>
          <img src={logo} className='login-banner-text' alt='Logo' />
          <img src={discount} alt='Discount' />
        </div>
        <div className='shorflex login-inputs text-nowrap text-start'>
          <div className='user-registration-div pb-2'>
            <button
              className={toggleRegister === 'login' ? 'active' : null}
              name='login'
              onClick={setToggle}
            >
              SIGN IN
            </button>
            <button
              className={toggleRegister === 'register' ? 'active' : null}
              name='register'
              onClick={setToggle}
            >
              SIGN UP
            </button>
          </div>
          <header>
            <h3 className='text-large-bolder'>Welcome to Shop-Pay</h3>
            <p className='text-medium'>Ease of shopping</p>
          </header>
          <div>
            <div className='login-input-div'>
              <img src={mail} alt='Mail' />
              <input
                className='login-input'
                placeholder='Enter Email'
                name='email'
                value={userFormData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div className='login-input-div'>
              <img src={lock} alt='Lock' />
              <input
                className='login-input'
                placeholder='Enter Password'
                name='password'
                value={userFormData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {toggleRegister === 'register' && (
            <div>
              <div className='login-input-div'>
                <img src={lock} alt='Lock' />
                <input
                  className='login-input'
                  placeholder='Enter Username'
                  name='username'
                  value={userFormData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
          <div>
            <button onClick={handleSubmit} className='login-button'>
            {toggleRegister === 'register' ?'SIGN UP' : 'LOGIN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
