import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import './login.css'


function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/auth/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const { token } = data;
        localStorage.setItem('token', token);
        navigate('/home');
      } else {
        toast.error(data.message || 'Invalid email or password', toastOptions);
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Internal Server Error', toastOptions);
    }
  };

  return (
    <div className="form-container">
      <div className='icon5'>
        <img src="/Logo icon 5.png" className="login-icon" width="42px" height="38px" />
        <h2>DirectEd</h2>
      </div>

      <h2 className="form-title">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className='input'

          />
        </div>

        <div className="input-container">
          <div className='pass'>
            <label htmlFor="password">Password:</label>
            <a href="#" className="forgot-password-link">Forgot Password?</a>
          </div>


          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className='input'
            />
            <span
              onClick={handleTogglePassword}
              className="password-toggle"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* <div className="checkbox-container">
          <label htmlFor="agreeTerms" style={{ color: 'black', marginLeft: '1px' }}
          >I agree to the terms and conditions</label>
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
        </div> */}

        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login">
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
