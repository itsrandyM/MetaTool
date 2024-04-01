import React, { useState } from 'react';

const PaymentForm = () => {
  const [currencyName, setCurrencyName] = useState('');
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [tokensToAdd, setTokensToAdd] = useState(0);
  const localUSD = 0.006;

  const handleCurrencyNameChange = (e) => {
    setCurrencyName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Currency Name:', currencyName);
    console.log('Amount:', amount);
    console.log('Local USD:', localUSD);
    console.log('Rate in USD:', rate);
    setCurrencyName('');
    setAmount(0);
    setRate(0);
  };

  return (
    <div style={{ backgroundColor: '#F2EEE3', padding: '10px', alignItems: 'center', borderRadius: '10px', color: 'black', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', textAlign: 'center', maxWidth: '300px' }}>
      <h2>Local Currency</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', marginBottom: '10px' }}>
          <label htmlFor="currencyName" style={{ marginBottom: '5px', display: 'block', textAlign: 'left', marginLeft: '28px' }}>Currency Name:</label>
          <input
            type="text"
            id="currencyName"
            value={currencyName}
            onChange={handleCurrencyNameChange}
            style={{ width: '80%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <div style={{ width: '100%', marginBottom: '10px' }}>
          <label htmlFor="amount" style={{ marginBottom: '5px', display: 'block', textAlign: 'left', marginLeft: '28px' }}>Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            style={{ width: '80%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <div style={{ width: '100%', marginBottom: '10px' }}>
          <label htmlFor="Rate" style={{ marginBottom: '5px', display: 'block', textAlign: 'left', marginLeft: '28px' }}>Rate/USD:</label>
          <input
            type="number"
            id="Rate"
            value={rate}
            onChange={handleRateChange}
            style={{ width: '80%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#6B8065', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', transform: 'translateY(-30%)' }}>Submit</button>
      </form>
    </div>
  );
};

export default PaymentForm;
