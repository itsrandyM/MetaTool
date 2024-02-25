import React, { useState } from 'react';

const AddToken = ({ isOpen, onClose, onSubmit }) => {
  const [tokens, setTokens] = useState([{ name: '', amount: '' }]);

  const handleAddToken = () => {
    if (tokens.length < 5) {
      setTokens([...tokens, { name: '', amount: '' }]);
    }
  };

  const handleRemoveToken = (index) => {
    const updatedTokens = [...tokens];
    updatedTokens.splice(index, 1);
    setTokens(updatedTokens);
  };

  const handleSubmit = () => {
    onSubmit(tokens);
    onClose();
  };

  return (
    <div className={`overlay ${isOpen ? 'open' : ''}`}>
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Add Tokens</h2>
        {tokens.map((token, index) => (
          <div key={index}>
            <input
              type="text"
              value={token.name}
              onChange={(e) =>
                setTokens((prevTokens) =>
                  prevTokens.map((prevToken, i) =>
                    i === index ? { ...prevToken, name: e.target.value } : prevToken
                  )
                )
              }
              placeholder="Token Name"
            />
            <input
              type="number"
              value={token.amount}
              onChange={(e) =>
                setTokens((prevTokens) =>
                  prevTokens.map((prevToken, i) =>
                    i === index ? { ...prevToken, amount: e.target.value } : prevToken
                  )
                )
              }
              placeholder="Amount"
            />
            <button onClick={() => handleRemoveToken(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddToken}>Add Token</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddToken;
