import React from 'react';


const Form4 = () => {
  return (
    <div className="form">
    <h2>Exchange Rate Details</h2>
    <form>
      <div className="form-group">
        <label htmlFor="Exchange rate source">Exchange Rate Source:</label>
        <input type="text" id="name" name="name" className="fixed-width"  />
      </div>
      <div className="form-group">
        <label htmlFor="Exchange Rate Target">Exchange Rate Target:</label>
        <input type="Exchange Rate Target" id="Exchange Rate Target" name="Exchange Rate Target" className="fixed-width"/>
      </div>
      <div className="form-group">
        <label htmlFor="Exchange Rate Value">Exchange Rate Value:</label>
        <input type="tel" id="Exchange Rate Value" name="Exchange Rate Value" className="fixed-width"/>
      </div>
      <div className="form-group">
        <label htmlFor="Amount">Amount:</label>
        <input type="tel" id="Amount" name="Amount" className="fixed-width"/>
      </div>
      <div className="form-group">
        <label htmlFor="Exchange Rate Date">Exchange Rate Date:</label>
        <input type="tel" id="Exchange Rate Date" name="Exchange Rate Date" className="fixed-width"/>
      </div>
    </form>
  </div>
  );
};

export default Form4;
