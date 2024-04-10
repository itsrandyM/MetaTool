import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const AddToken = ({ isOpen, onClose, onSubmit }) => {
  const [tokens, setTokens] = useState([{ name: '', amount: '' }]);
  const [tokenOptions, setTokenOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Clear any previous errors
    
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/getCryptos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log(response.data); // Check the structure of the data
    
        // Assuming the data is an object with a 'data' field containing an array of objects
        if (Array.isArray(response.data.data)) {
          setTokenOptions(response.data.data.map(token => ({ value: token.Name, label: token.Name })));
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setError(error.message || 'Failed to fetch data'); // Set a generic error message
      } finally {
setIsLoading(false);
      }
    };
    
    

    fetchData();
  }, []);

  const handleAddToken = () => {
    if (tokens.length < 5 && selectedOption) {
      setTokens([...tokens, { name: selectedOption.value, amount: '' }]);
      setSelectedOption(null); // Reset selected option
    }
  };

  const handleRemoveToken = (index) => {
    const updatedTokens = [...tokens];
    updatedTokens.splice(index, 1);
    setTokens(updatedTokens);
  };

  const handleSubmit = () => {
    const selectedTokenWithAmount = tokens.map(token => {
      return {
        name: token.name,
        amount: token.amount
      };
    });
  
    onSubmit(selectedTokenWithAmount);
    onClose();
  };
  

  return (
    <div className={`overlay ${isOpen ? 'open' : ''}`} style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="overlay-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
        <h2>Add Tokens</h2>
        <Select
          options={tokenOptions}
          value={selectedOption}
          onChange={setSelectedOption}
          placeholder="Select or search token..."
        />
        <button onClick={handleAddToken} style={{ marginBottom: '10px', padding: '8px 12px', borderRadius: '4px', backgroundColor: '#4caf50', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Token</button>
        {tokens.map((token, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
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
        <button onClick={handleSubmit} style={{ padding: '8px 12px', borderRadius: '4px', backgroundColor: '#2196f3', color: '#fff', border: 'none', cursor: 'pointer' }}>Submit</button>
      </div>
    </div>
  );
};

export default AddToken;
