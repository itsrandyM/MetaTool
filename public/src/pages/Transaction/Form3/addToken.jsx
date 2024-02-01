// AddTokenPage.jsx

import React, { useState } from 'react';
import './addToken.css';

const AddTokenPage = ({ tokens, setTokens, amount, setAmount, onClose }) => {
  const [tokenName, setTokenName] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  const handleAddToken = (e) => {
    e.preventDefault(); // Prevent form submission
    if (tokenName.trim() && tokenAmount.trim()) {
      const newToken = { name: tokenName, amount: parseFloat(tokenAmount) };
      setTokens([...tokens, newToken]);
      setAmount(parseFloat(amount) + parseFloat(tokenAmount));
      onClose();
    }
  };

  return (
    <div className="overlay">
      <div className="popup-container">
        <h2>Add Token</h2>
        <form onSubmit={handleAddToken}> {/* Add onSubmit handler to the form */}
          <div className="form-group">
            <label htmlFor="token" className="form-label">
              Token:
            </label>
            <input
              type="text"
              id="token"
              name="token"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <div className="amount-input-group">
              <input
                type="text"
                id="tokenAmount"
                name="tokenAmount"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                placeholder="0.00"
                className="form-input amount-input"
              />
              <button type="submit" className="addicon"> {/* Change button type to submit */}
                Add Token
              </button>
            </div>
          </div>
          <button type="button" className="done-button" onClick={onClose}> {/* Change button type to button */}
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTokenPage;
