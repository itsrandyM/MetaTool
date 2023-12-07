import React, { useState } from 'react';
import './Form1.css';

const Form1 = ({ onNextForm }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNext = () => {
    if (name && description) {
      onNextForm(2);
    } else {
      alert('Please fill in all fields.');
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
    </div>

  );
};

export default Form1;
