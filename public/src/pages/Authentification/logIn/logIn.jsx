import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

function LoginForm() {
  const navigate = useNavigate();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{

      const response = await fetch('/Login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      })
      const data = await response.json()
      if(response.ok){
        console.log('Successful login', data)

        login(formData);
        if(formData.username && formData.email && formData.password) {
        navigate('home')
        }else{
          console.log('Please fill the fields');
        }
      }else{
        console.log('Failed to Login', data.message);
     }
  }catch(error){
console.error('Error during login:', error)
    }
   
    
    
  };

  return (
    <div>
      <h2 className='h2'>Login for Meta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h5 htmlFor="username">User Name:</h5>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <h5 htmlFor="email">Email Address:</h5>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <h5 htmlFor="password">Password:</h5>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" onClick={handleSubmit} className='authentic'>Login</button>
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
