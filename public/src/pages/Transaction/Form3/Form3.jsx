import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Form3.css';

const Form3 = ({ onNextForm }) => {
  const [token, setToken] = useState('');
  const [classification, setClassification] = useState('');
  const [description, setDescription] = useState('');
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleNext = () => {
    // Validate fields before moving to the next form
    if (token && classification && description) {
      onNextForm(4,{ token, classification, description });
    } else {
      toast.error('Please fill in all fields.', toastOptions);
    }
  };


  return (
    <div className="form3_container">
      <div className="form3">
        <h2>Transaction Details</h2>
        <form>
          <div className="form-group">
            <label htmlFor="token">Token:</label>
            <input
              type="text"
              id="token"
              name="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="fixed-width "
            />
          </div>
          <div className="form-group">
            <label htmlFor="classification">Classification:</label>
            <input
              type="tel"
              id="classification"
              name="classification"
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
              className="fixed-width "
            />
          </div>
          <div className="form-group">
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
        <button onClick={handleNext} className="authentic">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Form3;
