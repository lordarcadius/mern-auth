import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../core/utils';

function Login() {

  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Fields can't be empty!");
    }
    try {
      const url = "https://mern-auth-server-lordarcadius-projects.vercel.app/auth/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      }
      );
      const result = await response.json();
      const { success, message, token, name, email, error } = result;
      if (success) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        handleSuccess(message);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div><label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='text'
            name='email'
            placeholder='Enter your email'
            value={loginInfo.email}
          />
        </div>
        <div><label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='text'
            name='password'
            placeholder='Enter your password'
            value={loginInfo.password}
          />
        </div>
        <button type='submit'>Login</button>
        <span>Don't have an account? <Link to="/signup">Signup</Link></span>
        <ToastContainer />
      </form>
    </div>
  )
}

export default Login