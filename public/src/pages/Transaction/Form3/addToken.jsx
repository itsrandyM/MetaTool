// AddTokenPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addToken.css';

const AddTokenPage = ({ onDone, updateToken }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddToken = () => {
    // Check if both token and amount are provided before updating
    if (token && amount) {
      updateToken({ name: token, amount: parseInt(amount) });
      setToken(''); // Clear the input fields after updating
      setAmount('');
    }
  };

  const handleDone = () => {
    onDone(); // Callback to navigate back to Form3
  };

  return (
    <div className="add-token-container">
      <div className="add-token-content">
        <h2 className="add-token-header">Add Token</h2>
        <form>
          {/* Token Input */}
          <div className="form-group">
            <label htmlFor="token" className="form-label">
              Token:
            </label>
            <input
              type="text"
              id="token"
              name="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Amount Input and Add Token Button */}
          <div className="form-group">
            <div className="amount-input-group">
              <input
                type="text"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="form-input amount-input"
              />
              <button className="addicon" onClick={handleAddToken}>
                Add Token
              </button>
            </div>
          </div>

          {/* Done Button */}
          <button className="done-button" onClick={handleDone}>
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTokenPage;
