import React, { useState } from 'react';

const CSVDetailsModal = ({ onClose, onSubmit }) => {
  const [currencyName, setCurrencyName] = useState('');
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
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
    const formData = {
      currencyName: currencyName,
      amount: amount,
      rate: rate
    };
    onSubmit(formData); // Pass CSV details to the onSubmit function
    onClose(); // Close the overlay
  };

  return (
    <div className="overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#f2eee3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="payment-form" style={{ backgroundColor: '#F2EEE3', padding: '20px', borderRadius: '10px', color: 'black', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', textAlign: 'center', width: '80%', maxWidth: '400px' }}>
        <h2>Local Currency</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <label htmlFor="currencyName" style={{ marginBottom: '5px', display: 'block', textAlign: 'left' }}>Currency Name:</label>
            <input
              type="text"
              id="currencyName"
              value={currencyName}
              onChange={handleCurrencyNameChange}
              style={{ width: '90%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <label htmlFor="amount" style={{ marginBottom: '5px', display: 'block', textAlign: 'left' }}>Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              style={{ width: '90%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <label htmlFor="Rate" style={{ marginBottom: '5px', display: 'block', textAlign: 'left' }}>Rate/USD:</label>
            <input
              type="number"
              id="Rate"
              value={rate}
              onChange={handleRateChange}
              style={{ width: '90%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: '#6B8065', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CSVDetailsModal;
