import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const AddToken = ({ isOpen, onClose, onSubmit }) => {
  const [tokens, setTokens] = useState([{ name: '', amount: '', NCA: false, stablecoin: false }]);
  const [tokenOptions, setTokenOptions] = useState([]);
  const [loading, setLoading] = useState(false); // Added state for loading indicator

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'bitcoin,ethereum,cardano,polkadot,ripple,litecoin,chainlink,stellar,filecoin,tron,tezos,eos,monero,neo,cosmos,vechain,aave,dogecoin,uniswap,theta,fantom,yearn-finance,maker,compound,algorand,ethereum-classic,bitshares,uma,hedera-hashgraph,zcash,elrond,nem,decred,sushiswap,terra-luna,the-graph,pancakeswap,cdai,axie-infinity,loopring,bittorrent-2,trust-wallet-token,huobi-token', // Add more tokens separated by commas if needed
            vs_currencies: 'usd',
          },
        });

        const options = Object.entries(response.data).map(([symbol, tokenData]) => ({
          value: symbol,
          label: `${symbol.toUpperCase()} (${tokenData.usd} USD)`, // Format label to include both symbol and USD value
          NCA: false, // Assuming this data is not available for these tokens
          stablecoin: false, // Assuming this data is not available for these tokens
        }));
        
        setTokenOptions(options);
      } catch (error) {
        console.error('Error fetching token data:', error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchTokens();
  }, []);

  const handleAddToken = () => {
    if (tokens.length < 5) {
      setTokens([...tokens, { name: '', amount: '', NCA: false, stablecoin: false }]);
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
    <div className="overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#f2eee3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="overlay-content" style={{ backgroundColor: '#f2eee3', color: 'black', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
        <h2>Add Tokens</h2>
        {tokens.map((token, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <Select
              options={tokenOptions}
              value={tokenOptions.find(option => option.value === token.name)}
              onChange={(selectedOption) => {
                const updatedTokens = [...tokens];
                updatedTokens[index].name = selectedOption.value;
                console.log('to:', updatedTokens)
                setTokens(updatedTokens);
              }}
              placeholder="Search or Select Token"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  width: '100%',
                  padding: '8px',
                  marginTop: '10px',
                  borderRadius: '4px',
                  border: '1px solid black',
                  backgroundColor: 'transparent',
                  transition: 'border-color 0.3s, box-shadow 0.3s', // Add transition for smooth color change and box shadow
                  outline: 'none', // Remove default focus outline
                  boxShadow: state.isFocused ? '0 0 10px 3px #6B8065' : 'none', // Add box shadow on focus
                }),
                placeholder: (provided, state) => ({
                  ...provided,
                  color: state.isFocused ? '#6B8065' : '#aaa', // Change placeholder color on focus
                }),
              }}
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
              style={{
                width: '72%',
                padding: '8px',
                marginTop: '10px',
                borderRadius: '4px',
                border: '1px solid black',
                backgroundColor: 'transparent',
                transition: 'border-color 0.3s, box-shadow 0.3s', // Add transition for smooth color change and box shadow
                outline: 'none', // Remove default focus outline
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#6B8065'; // Change border color on focus
                e.target.style.boxShadow = '0 0 10px 3px #6B8065'; // Add box shadow on focus
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ccc'; // Reset border color on blur
                e.target.style.boxShadow = 'none'; // Remove box shadow on blur
              }}
            />

            <button onClick={() => handleRemoveToken(index)} style={{ marginLeft: '10px', padding: '8px 12px', borderRadius: '4px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddToken} style={{ marginBottom: '10px', padding: '8px 12px', borderRadius: '4px', backgroundColor: '#4caf50', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Token</button>
        <button onClick={handleSubmit} style={{ padding: '8px 12px', borderRadius: '4px', backgroundColor: '#2196f3', color: '#fff', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>Submit</button>
      </div>
    </div>
  );
};

export default AddToken;
