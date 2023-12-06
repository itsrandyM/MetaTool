import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import{FaEye, FaEyeSlash} from 'react-icons/fa'
import './style.css';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

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
      const response = await fetch('http://localhost:4000/auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Successful login', data);
        // Assuming you have a login function to handle the login logic
        // login(formData);

        if (formData.username && formData.email && formData.password) {
          navigate('home');
        } else {
          console.log('Please fill the fields');
          setError('Please fill the fields');
        }
      } else {
        console.log('Failed to Login', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal Server');
    }
  };

  return (
    <div>
      <h2 className='h2'>Login for Meta</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <h5 style={{ fontSize: '14px', margin: '2px' }} htmlFor='username'>
            User Name:
          </h5>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <h5 style={{ fontSize: '14px' }} htmlFor='email'>
            Email Address:
          </h5>

          <input
            type='text'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <h5 style={{ fontSize: '14px' }} htmlFor='password'>
            Password:
          </h5>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />
            <span
              onClick={handleTogglePassword}
              style={{
                cursor: 'pointer',
                marginLeft: '5px',
                fontSize: '18px',
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {error && (
          <p
            style={{
              color: 'red',
              fontSize: '10px',
              border: '1px solid red',
              backgroundColor: '#ef9a9a',
            }}
          >
            {error}
          </p>
        )}
        <button type='submit' onClick={handleSubmit} className='authentic'>
          Login
        </button>
      </form>
    </div>
  );
}

// Define the login function separately
function login(formData) {
  // You can implement the login logic here, e.g., sending the data to a server
  console.log('Logging in with data:', formData);
}

export default LoginForm;
