import React, { useState } from 'react';
import './Form4.css';

const Form4 = ({ onNextForm }) => {
  const [exchangeratesource, setExchangeRateSource] = useState('');
  const [exchangeratetarget, setExchangeRateTarget] = useState('');
  const [exchangeratevalue, setExchangeRateValue] = useState('');
  const [amount, setAmount] = useState('');
  const [exchangeratedate, setExchangeRateDate] = useState('');

  const handleNext = () => {
    onNextForm(4);
  };

  return (
    <div className='form4_container'>
    <div className="form4">
      <h2>Exchange Rate Details</h2>
      <form>
        <div className="form-group">
          <label htmlFor="exchangeratesource">Exchange Rate Source:</label>
          <input
            type="exchangeratesource"
            id="exchangeratesource"
            name="exchangeratesource"
            value={exchangeratesource}
            onChange={(e) => setExchangeRateSource(e.target.value)}
            className='fixed-width '
          />
        </div>
        <div className="form-group">
          <label htmlFor="exchangeratetarget">Exchange Rate Target:</label>
          <input
            type="exchangeratetarget"
            id="exchangeratetarget"
            name="exchangeratetarget"
            value={exchangeratetarget}
            onChange={(e) => setExchangeRateTarget(e.target.value)}
            className='fixed-width '
          />
        </div>
        <div className="form-group">
          <label htmlFor="exchangeratevalue">Exchange Rate Value:</label>
          <input
            type="tel"
            id="exchangeratevalue"
            name="exchangeratevalue"
            value={exchangeratevalue}
            onChange={(e) => setExchangeRateValue(e.target.value)}
            className='fixed-width '
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="amount"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='fixed-width '
          />
        </div>
        <div className="form-group">
          <label htmlFor="exchangeratedate">Exchange Rate Date:</label>
          <input
            type="exchangeratedate"
            id="exchangeratedate"
            name="exchangeratedate"
            value={exchangeratedate}
            onChange={(e) => setExchangeRateDate(e.target.value)}
            className='fixed-width '
          />
        </div>
      </form>
      <button onClick={handleNext} className='authentic'>Save & Submit</button>
    </div>
    </div>

  );
};

export default Form4;
