import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AddToken = ({ isOpen, onClose, onSubmit }) => {
  const [tokens, setTokens] = useState([{ name: '', amount: '' }]);
  const [tokenOptions, setTokenOptions] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(''); // New state for selected option
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     setError(null); // Clear any previous errors

  //     try {
  //       const token = localStorage.getItem('token');
  //       const response = await axios.get('http://localhost:4000/api/getCryptos',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //       console.log(response.data)
  //       setTokenOptions(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching crypto data:', error);
  //       setError(error.message || 'Failed to fetch data'); // Set a generic error message
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [])

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
  }, [])

  // const tokenOptions = ["DJED", "Etherium", "USDT", "Bitcoin", "ADA"]; // Add your token options here

  // Filter options based on search term
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = tokenOptions.filter(option => option.toLowerCase().includes(searchTerm));
    setFilteredOptions(filtered);
  };

  // Handle selecting an option from the dropdown
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Handle updating token name based on search or selection
  const handleTokenChange = (e) => {
    const updatedTokens = [...tokens];
    const index = e.target.dataset.index; // Get the index of the token being edited
    updatedTokens[index].name = e.target.value || selectedOption; // Use either search term or selected option
    setSelectedOption(''); // Clear selected option after use
    setTokens(updatedTokens);
  };

  // useEffect to update filtered options when selectedOption changes
  useEffect(() => {
    if (selectedOption) {
      const filtered = tokenOptions.filter(option => option === selectedOption);
      setFilteredOptions(filtered);
    } else {
      handleSearch({ target: { value: searchTerm } }); // Re-filter based on searchTerm
    }
  }, [selectedOption, searchTerm]);

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
    <div className={`overlay ${isOpen ? 'open' : ''}`} style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="overlay-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
        <h2>Add Tokens</h2>
        {tokens.map((token, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={token.name}
              onChange={handleTokenChange} // Use combined handler
              placeholder="Search Token"
              style={{ width: 'calc(100% - 80px)', marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              data-index={index} // Pass index for updating the correct token
              list="tokenOptions" // Connect to the option list
            />
            <datalist id="tokenOptions">
              {filteredOptions.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>{option}</option>
              ))}
            </datalist>
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
