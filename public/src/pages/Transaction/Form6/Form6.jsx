// Form6.jsx
import React, { useState } from 'react';
import "./style.css"

const Form6 = ({ onNextForm }) => {
  const [txnHash, setTxnHash] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNextForm(6, { txnHash });
  };

  return (
    <div className="overlay">
      <form onSubmit={handleSubmit}>
        <h2>Please enter txn hash</h2>
        <input
          type="text"
          placeholder="enter hash"
          value={txnHash}
          onChange={(e) => setTxnHash(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form6;
