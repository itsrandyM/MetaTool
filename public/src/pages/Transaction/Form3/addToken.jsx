import React, { useState } from 'react';
import { useTokenContext } from '../../../../constants/TokenContext';
import './addToken.css';

const AddTokenPage = ({ onClose }) => {
  const { tokens, setTokens } = useTokenContext();
  const [newToken, setNewToken] = useState({ name: '', amount: '' });
  const [asset, setAsset] = useState('')

  const API_KEY = '04f14354-bca1-46f6-9529-3fba28ba4f01'
  
  const handleSearch = async () => {
    try {
      const response = await GET(`https://cardanoscan.io/api/v2/assets/search?q=${newToken.name}`, {
        headers: {
          apiKey: `${API_KEY}`,
        },
      });
      const data = await response.json();

      if (data.length === 0) {
        console.error('No assets found for that name.');
      } else if (data.length === 1) {
        setAsset(data[0].asset_id);
        console.log(data)
      } else {
        // Handle multiple matches, e.g., display a list for user selection
      }
    } catch (error) {
      console.error('Error fetching asset information.');
    }
  };

  const handleAddToken = () => {
    if (newToken.name.trim() && newToken.amount.trim()) {
      setTokens((prevTokens) => [...prevTokens, { ...newToken }]);
      setNewToken({ name: '', amount: '' });
      onClose();
    } else {
      console.error('Please fill in both token name and amount.');
    }
  };

  return (
    <div className="overlay">
      <div className="popup-container">
        <h2>Add Token</h2>
        <div className="form-group">
          <label htmlFor="token" className="form-label">
            Token:
          </label>
          <input
            type="text"
            id="token"
            name="token"
            value={newToken.name}
            onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <div className="amount-input-group">
            <input
              type="text"
              id="amount"
              name="amount"
              value={newToken.amount}
              onChange={(e) => setNewToken({ ...newToken, amount: e.target.value })}
              placeholder="0.00"
              className="form-input amount-input"
            />
            <button type="button" className="addicon" onClick={handleAddToken}>
              Add Token
            </button>
          </div>
        </div>
        <button type="button" className="done-button" onClick={handleAddToken}>
          Done
        </button>
        <button onClick={handleSearch}> get ID</button>
      </div>
    </div>
  );
};

export default AddTokenPage;
