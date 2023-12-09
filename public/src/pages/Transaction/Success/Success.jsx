import React from 'react';
import './Success.css';

const SuccessPage = () => {
  const handleDoneClick = () => {
    window.location.href = 'home';
  };

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-icon">&#10004;</div>
        <h2>Success!</h2>
        <p className='succes'>Your submission was successful.</p>
        <button className="done-button" onClick={handleDoneClick}>
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
