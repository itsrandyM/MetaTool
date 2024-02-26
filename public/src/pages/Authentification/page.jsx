import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#D9D9D9', width: '300px', padding: '20px', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '20px' }}>
          <img src="/Logo icon 5.png" alt="DirectEd" className="login-icon" width="42px" height="38px" />
          <h2 style={{color:'black'}}>DirectEd</h2>
        </div>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'black', fontWeight: '600', textAlign: 'left' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <label htmlFor="password" style={{ display: 'block', color: 'black' }}>Password:</label>
              <a href="#" className="forgot-password-link">Forgot Password?</a>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              />
              <span
                onClick={handleTogglePassword}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
          <button type="submit" style={{ backgroundColor: '#6B8065', color: '#ffff', width: '50%', height: '50px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', marginLeft: '25%' , transition: 'background-color 0.2s ease-in-out' }}>Login</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginForm;
