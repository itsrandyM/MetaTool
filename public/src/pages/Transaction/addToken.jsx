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
    <div className={`overlay ${isOpen ? 'open' : ''}`} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="overlay-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%'}}>
        <h2>Add Tokens</h2>
        {tokens.map((token, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
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
              style={{ width: 'calc(100% - 80px)', marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
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
              style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button onClick={() => handleRemoveToken(index)} style={{ marginLeft: '10px', padding: '8px 12px', borderRadius: '4px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddToken} style={{ marginBottom: '10px', padding: '8px 12px', borderRadius: '4px', backgroundColor: '#4caf50', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Token</button>
        <button onClick={handleSubmit} style={{ padding: '8px 12px', borderRadius: '4px', backgroundColor: '#2196f3', color: '#fff', border: 'none', cursor: 'pointer' }}>Submit</button>
      </div>
    </div>
  );
};

export default AddToken;
