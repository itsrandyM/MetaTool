import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './exchange.css';

const Form5 = ({ onNextForm }) => {
  const [exchangeRate, setExchangeRate] = useState('');
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleNext = () => {
    // Validate fields before moving to the next form
    if (exchangeRate) {
      const formData = {
        exchangeRate,
      };
      onNextForm(4, formData);
    } else {
      toast.error('Please enter the exchange rate.', toastOptions);
    }
  };

  return (
    <div className="form5_container">
      <h2>Exchange Rate Details</h2>
      <textarea
        className="big-textbox"
        placeholder="Enter exchange rate"
        value={exchangeRate}
        onChange={(e) => setExchangeRate(e.target.value)}
      />
      <button onClick={handleNext} className="authentic">
        Continue
      </button>
      <ToastContainer />
    </div>
  );
};

export default Form5;
