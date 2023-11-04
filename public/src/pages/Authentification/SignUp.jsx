import React, { useState } from 'react';
import './style.css'

function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
    // You can call the signUp function here and pass the formData as an argument
    signUp(formData);
  };

  return (
    <div>
      <h2 className='h2'>Sign Up for Meta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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

        <button type="submit">Sign Up</button>
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
