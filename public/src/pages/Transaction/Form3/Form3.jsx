import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddToken from './addToken'; // Import the overlay component
import { useTokenContext } from '../../../../constants/TokenContext';
import './Form3.css';

const Form3 = ({ onNextForm }) => {
  const { tokens: initialTokens, setTokens } = useTokenContext();
  const [classification, setClassification] = useState('');
  const [description, setDescription] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (initialTokens.length > 0 && classification && description) {
      const formData = {
        tokens: initialTokens,
        classification,
        description,
      };
      onNextForm(5, formData);
    } else {
      toast.error('Please fill in all fields.', toastOptions);
    }
  };

  const handleOverlaySubmit = (submittedTokens) => {
    setTokens(submittedTokens); // Update tokens state with the submitted tokens
    setShowOverlay(false); // Close the overlay after submission
  };

  return (
    <div className="form3_container">
      <div className="form3">
        <h2>Transaction Details</h2>
        <form onSubmit={handleNext}>
          <div className="form-group">
            <label htmlFor="classification">Classification:</label>
            <input
              type="tel"
              id="classification"
              name="classification"
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
              className="form-input1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="token" className="form-label">Token:</label>
            <div className="token-input-group">
              <input
                type="text"
                id="token"
                name="token"
                value={initialTokens.map(token => token.name).join(', ')} // Display initial tokens inline
                readOnly
                className="form-input1 token-input" // Apply styles for token input
              />
              <button className="addicon1" type="button" onClick={() => setShowOverlay(true)}>
                Add Token
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description" style={{ marginLeft: '-24px'}}>Description:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input1"
            />
          </div>
          <button type="submit" className="authentic">
            Continue
          </button>
        </form>
      </div>
      {/* AddToken for adding tokens */}
      {showOverlay && (
        <AddToken
          initialTokens={initialTokens}
          onSubmit={handleOverlaySubmit}
          onClose={() => setShowOverlay(false)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Form3;
