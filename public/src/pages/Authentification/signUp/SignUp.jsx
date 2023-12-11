import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'

function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    position:'',
    email: '',
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
    signUp(formData);
    // You can call the signUp function here and pass the formData as an argument
      // Check if all required fields are filled
  if (formData.userName && formDataposition && formData.email && formData.password) {
    // All required fields have values, so you can proceed to the Welcome page
    localStorage.setItem('userName', formData.userName);
    localStorage.setItem('position', formData.position)
    navigate('home')
  } else {
    // Some required fields are missing, show an error message or prevent submission
    console.log('Please fill out all required fields.');
  }
    
  };
 
  return (
    <div>
      <h2 className='H2'>Sign Up for Meta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h5 htmlFor="userName" className='head'>User Name:</h5>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <h5 htmlFor="Position" className='head'>Position:</h5>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <h5 htmlFor="email" className='head'>Email:</h5>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <h5 htmlFor="password" className='head'>Password:</h5>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={() => navigate(Welcome)} className='authentic'>Sign Up</button>
      </form>
    </div>
  );
}

// Define the signUp function separately
function signUp(formData) {
  // You can implement the sign-up logic here, e.g., sending the data to a server
  console.log('Signing up with data:', formData);
}

export default SignUpForm;
