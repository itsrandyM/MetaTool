import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form2 = ({ onNextForm }) => {
  const [recipients, setRecipients] = useState([
    { name: '', organization: '', wallet: '', comment: '' },
  ]);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const isNameValid = /^[a-zA-Z]+[a-zA-Z\s]*$/;

  const handleNext = () => {
    if (recipients.some((recipient) => !recipient.name || !recipient.organization)) {
      toast.error('All fields are required for each recipient.', toastOptions);
      return;
    }

    if (recipients.every((recipient) => isNameValid.test(recipient.name))) {
      console.log('Form2 Data:', recipients);
      onNextForm(3, recipients);
      // Clear the form fields for the next recipient
      clearFormFields();
    } else {
      if (!isNameValid.test(recipients[0].name)) {
        toast.error('Invalid Name.', toastOptions);
      }
      // Additional validation error handling...
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
      { name: '', organization: '', wallet: '', comment: '' },
    ]);
  };

  return (
    <div style={{ backgroundColor: '#F2EEE3', padding: '10px', borderRadius: '10px', color: 'black', margin: 'auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', textAlign: 'center', width: '300px', marginTop: '4%' }}>
      <div style={{ marginLeft: '35px' }}>
        <h2 style={{ marginLeft: '-10px', marginTop: '10px' }}>Recipient </h2>
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
          <label htmlFor="comment" style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Comment:</label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            cols="50"
            value={recipients[recipients.length - 1].comment}
            onChange={(e) => handleRecipientChange('comment', e.target.value)}
            style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <button onClick={handleNext} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
          Continue
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form2;
