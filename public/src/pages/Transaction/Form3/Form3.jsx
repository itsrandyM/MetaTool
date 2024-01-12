// Form3.jsx
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Form3.css';

const Form3 = ({ onNextForm }) => {
  const [classification, setClassification] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [tokens, setTokens] = useState([]); // Changed from string to array
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const navigate = useNavigate();

  const updateToken = (newToken) => {
    setTokens((prevTokens) => [...prevTokens, newToken]);
  };

  const handleAddToken = (e) => {
    e.preventDefault();
    // Navigate to 'addToken' form
    onNextForm('addToken', { updateToken });
  };

  const handleNext = () => {
    if (tokens.length > 0 && classification && description && amount) {
      const formData = {
        token: [{ name: tokens, amount: parseInt(amount) }],
        classification,
        description,
        amount,
      };
      onNextForm(5, formData);
    } else {
      toast.error('Please fill in all fields.', toastOptions);
    }
  };

  return (
    <div className="form3_container">
      <div className="form3">
        <h2>Transaction Details</h2>
        <form>
          {/* Your form inputs */}
          <div className="form-group">
            <label htmlFor="classification">Classification:</label>
            <input
              type="tel"
              id="classification"
              name="classification"
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
              className="fixed-width"
            />
          </div>
          <div className="form-group1">
            <label htmlFor="token" className="form-label2">
              Token:
            </label>
            <input
              type="text"
              id="token"
              name="token"
              onChange={(e) => setTokens(e.target.value)}
              className="form-input1"
            />
          </div>
          {/* Amount Input and Add Token Button */}
          <div className="form-group">
            <div className="amount-input-group1">
              <input
                type="text"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="form-input2 amount-input1"
              />
              <button className="addicon1" onClick={handleAddToken}>
                Add Token
              </button>
            </div>
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
          <button onClick={handleNext} className="authentic">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form3;
