
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddToken from './Form3/addToken'; // Import the overlay component
import { useTokenContext } from '../../../constants/TokenContext';

const Form2 = ({ onNextForm }) => {
  const { tokens: initialTokens, setTokens } = useTokenContext();
  const [recipients, setRecipients] = useState([
    { name: '', organization: '', wallet: '' },
  ]);
  const [showOverlay, setShowOverlay] = useState(false);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const isNameValid = /^[a-zA-Z]+[a-zA-Z\s]*$/
  const isWalletValid = /^[a-zA-Z0-9]{25,}$/
  
  const handleNext = () => {
    if (recipients.some((recipient) => !recipient.name || !recipient.organization)) {
      toast.error('All fields are required for each recipient.', toastOptions);
      return;
    }
  
    if (recipients.every((recipient) => isNameValid.test(recipient.name) && isWalletValid.test(recipient.wallet))) {
      console.log('Form2 Data:', recipients);
      const formData = {
        recipients: recipients, // Existing recipient data
        tokens: initialTokens.map((token) => ({
          name: token.name, // Token name
          amount: token.amount, // Token amount
        })),
      };
      onNextForm(5, formData);
      clearFormFields();
    } else {
      if (!isNameValid.test(recipients[0].name)) {
        toast.error('Invalid Name.', toastOptions);
      } else if (!isWalletValid.test(recipients[0].wallet)) { // Added check for invalid wallet
        toast.error('Invalid Wallet Address.', toastOptions);
      }
      // ... additional validation error handling, if needed
    }
  };

  const handleRecipientChange = (field, value) => {
    // Update the last recipient's corresponding field
    setRecipients((prevRecipients) => [
      ...prevRecipients.slice(0, prevRecipients.length - 1),
      { ...prevRecipients[prevRecipients.length - 1], [field]: value },
    ]);
  };

  const clearFormFields = () => {
    // Clear the form fields for the last recipient
    setRecipients((prevRecipients) => [
      ...prevRecipients.slice(0, prevRecipients.length - 1),
      { name: '', organization: '', wallet: '' },
    ]);
  };

  const handleOverlaySubmit = (submittedTokens) => {
    setTokens(submittedTokens); // Update tokens state with the submitted tokens
    setShowOverlay(false); // Close the overlay after submission
  };

  return (
    <div style={{ backgroundColor: '#F2EEE3', padding: '10px', borderRadius: '10px', color: 'black', margin: 'auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', textAlign: 'center', width: '300px', marginTop: '4%' }}>
      <div style={{ marginLeft: '35px' }}>
        <h2 style={{marginLeft: '-35px',  marginTop: '10px' }}>Recipient </h2>
        <div className="form-group" style={{ textAlign: 'left', }}>
          <label htmlFor="name" style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipients[recipients.length - 1].name}
            onChange={(e) => handleRecipientChange('name', e.target.value)}
            style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <div className="form-group" style={{ textAlign: 'left' }}>
          <label htmlFor="wallet" style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Wallet Address:</label>
          <input
            type="text"
            id="wallet"
            name="wallet"
            value={recipients[recipients.length - 1].wallet}
            onChange={(e) => handleRecipientChange('wallet', e.target.value)}
            style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <div className="form-group" style={{ textAlign: 'left' }}>
          <label htmlFor="organization" style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Organization:</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={recipients[recipients.length - 1].organization}
            onChange={(e) => handleRecipientChange('organization', e.target.value)}
            style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
       <div className="form-group" style={{ textAlign: 'left' }}>
          <label htmlFor="token" className="form-label">Token:</label>
          <div className="token-input-group">
            <input
               
              type="text"
              id="token"
              name="token"
              value={initialTokens.map(token => token.name).join(', ')} // Display initial tokens inline
              readOnly
            style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
            // Apply styles for token input
            />
            <button className="addicon1" type="button" onClick={() => setShowOverlay(true)} style={{margin: '2px'}} >
              Add Token
            </button>
          </div>
        </div>
        <button onClick={handleNext} style={{ backgroundColor: '#6B8065',padding:'12px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', transform: 'translateY(-25%)', marginLeft: '-35px' }}>
          Continue
        </button>
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

export default Form2;
