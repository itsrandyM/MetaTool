import React, { useState } from 'react';
import './style.css'; // Import the CSS file

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can call the login function here and pass the formData as an argument
    login(formData);
  };

  return (
    <div>
      <h2 className='h2'>Login for Meta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Login</button>
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
