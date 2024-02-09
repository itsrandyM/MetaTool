import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Form1.css';

const Form1 = ({ onNextForm }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleNext = () => {

    // if (!name || !description) {
    //   toast.error('All fields are required.', toastOptions);
    //   return;
    // }

    const nameRegex = /^[a-zA-Z]{1,10}$/;

    if (!name.match(nameRegex)) {
      toast.error('Invalid Name.', toastOptions);
      return;
    }
    if (name && description) {
      const formData = {
        name,
        description,
      };

      console.log('Form1 Data:', formData)
      onNextForm(2,formData);
    } else {
      toast.error('Please fill in all fields.', toastOptions);
      setError('Please fill the fields')
    }
  };

  return (
    <div className='form1_container'>
    <div className="form1">
      <h2>New Transaction</h2>
      <form>
        <div className="form-group1">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="fixed-width" 
          />
        </div>
        <div className="form-group1">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="fixed-width" 
          />
        </div>
      </form>
      <button onClick={handleNext} className='authentic'>Start Transaction</button>
    </div>
    <ToastContainer/>
    </div>

  );
};

export default Form1;
