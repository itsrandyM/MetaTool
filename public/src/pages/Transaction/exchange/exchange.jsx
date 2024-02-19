import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './exchange.css';

const Form5 = ({ onNextForm }) => {
  const [baseCurrencies, setBaseCurrencies] = useState(['Cardano', 'Ethereum']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [newExchangeRate, setNewExchangeRate] = useState({
    base_currency: baseCurrencies[0],
    quote_currency: 'USD',
    rate: '',
    time: ''
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    // Initialize exchange rates for each base currency
    const initialRates = {};
    baseCurrencies.forEach(currency => {
      initialRates[currency] = [];
    });
    setExchangeRates(initialRates);
  }, [baseCurrencies]);

  const handleNextForm = () => {
    // Proceed to the next form
    if (currentIndex === baseCurrencies.length - 1) {
      if (Object.values(exchangeRates).some(rates => rates.length > 0)) {
        const formData = {
          exchangeRates: exchangeRates
        };
        onNextForm(4, formData);
      } else {
        toast.error('Please enter at least one exchange rate.', toastOptions);
      }
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
      // Update the base currency in the newExchangeRate object
      setNewExchangeRate(prevState => ({
        ...prevState,
        base_currency: baseCurrencies[currentIndex + 1]
      }));
    }
  };

  const handlePrevForm = () => {
    // Move to the previous form
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
      // Update the base currency in the newExchangeRate object
      setNewExchangeRate(prevState => ({
        ...prevState,
        base_currency: baseCurrencies[currentIndex - 1]
      }));
    }
  };

  return (
    <>
      <h2>
        EXECHANGE RATES
      </h2>
      <div className="form5_container">
        <h2>{baseCurrencies[currentIndex]}</h2>
        {exchangeRates[baseCurrencies[currentIndex]] && exchangeRates[baseCurrencies[currentIndex]].map((rate, index) => (
          <div key={index}>
            <p>Quote Currency: {rate.quote_currency}</p>
            <p>Rate: {rate.rate}</p>
            <p>Time: {rate.time}</p>
          </div>
        ))}
        <div className="quote-currency-card">
          <h3>Quote Currency</h3>
          <input
          className='input1'
            type="text"
            value={newExchangeRate.quote_currency}
            onChange={(e) => setNewExchangeRate(prevState => ({
              ...prevState,
              quote_currency: e.target.value
            }))}
            placeholder="Enter quote currency"
          />
        </div>
        <div className="rate-card">
          <h3>Rate</h3>
          <input
          className='input2'
            type="text"
            value={newExchangeRate.rate}
            onChange={(e) => setNewExchangeRate(prevState => ({
              ...prevState,
              rate: e.target.value
            }))}
            placeholder="Enter rate"
          />
        </div>
        <div className="time-card">
          <h3>Time</h3>
          <input
            type="text"
            className='input3'
            value={newExchangeRate.time}
            onChange={(e) => setNewExchangeRate(prevState => ({
              ...prevState,
              time: e.target.value
            }))}
            placeholder="Enter time"
          />
        </div>
        <div>
          <button onClick={handlePrevForm} disabled={currentIndex === 0}>
            Previous
          </button>
          <button onClick={handleNextForm} className="authentic">
            {currentIndex === baseCurrencies.length - 1 ? 'Continue' : 'Next'}
          </button>
        </div>
        <ToastContainer />
      </div>
    </>

  );
};

export default Form5;
