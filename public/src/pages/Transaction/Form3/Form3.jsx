// Form3.jsx

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import { useTokenContext } from '../../../../constants/TokenContext';
import './Form3.css';
import AddTokenPage from './addToken';

const Form3 = ({ onNextForm }) => {
  const { tokens, setTokens } = useTokenContext();
  const [classification, setClassification] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [showAddTokenForm, setShowAddTokenForm] = useState(false);
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddTokenForm && event.target.closest('.popup-container') === null) {
        setShowAddTokenForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddTokenForm]);

  const handleAddToken = () => {
    setShowAddTokenForm(true);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (tokens.length > 0 && classification && description && amount) {
      const formData = {
        tokens,
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
        <form onSubmit={handleNext}>
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
          {tokens.map((token, index) => (
            <div key={index} className="form-group1">
              <label htmlFor={`token-${index}`} className="form-label2">
                Token {index + 1}:
              </label>
              <input
                type="text"
                id={`token-${index}`}
                name={`token-${index}`}
                value={token.name}
                onChange={(e) =>
                  setTokens((prevTokens) =>
                    prevTokens.map((prevToken, i) =>
                      i === index ? { ...prevToken, name: e.target.value } : prevToken
                    )
                  )
                }
                className="form-input1"
              />
            </div>
          ))}
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
              <button className="addicon1" onClick={handleAddToken} type="button">
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
          <button type="submit" className="authentic">
            Continue
          </button>
        </form>
      </div>
      {showAddTokenForm && (
        <AddTokenPage
          tokens={tokens}
          setTokens={setTokens}
          amount={amount}
          setAmount={setAmount}
          onClose={() => setShowAddTokenForm(false)}
        />
      )}
    </div>
  );
};

export default Form3;
