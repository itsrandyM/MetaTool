import React, { useState } from 'react';
import './exchange.css';

const ExchangeRateForm = () => {
  const [exchangeRate, setExchangeRate] = useState('');

  const handleChange = (e) => {
    setExchangeRate(e.target.value);
  };

  return (
    <div className="form2_container">
      <h2>Exchange Rate Details</h2>
      <textarea
        className="big-textbox"
        placeholder="Enter exchange rate"
        value={exchangeRate}
        onChange={handleChange}
      />
    </div>
  );
};

export default ExchangeRateForm;
