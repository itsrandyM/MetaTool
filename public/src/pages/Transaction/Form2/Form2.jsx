// Form2.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserPlus } from 'react-icons/fa';
import './Form2.css';

const Form2 = ({ onNextForm }) => {
  const [recipients, setRecipients] = useState([
    { name: '', organization: '', comment: '' },
  ]);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const isNameValid = /^[a-zA-Z]{1,10}$/;

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

  const addRecipient = () => {
    const currentRecipient = recipients[recipients.length - 1];

    // Validate the current recipient before adding a new one
    if (currentRecipient.name && currentRecipient.organization && isNameValid.test(currentRecipient.name)) {
      // Store the current recipient data in the state
      setRecipients((prevRecipients) => [...prevRecipients]);
      // Clear the form fields for the next recipient
      clearCurrentForm()
      // Add a new recipient with the same data structure
      setRecipients((prevRecipients) => [...prevRecipients, { name: '', organization: '', comment: '' }]);
    } else {
      toast.error('Fill in the current recipient details correctly before adding a new one.', toastOptions);
    }
  };

  const clearFormFields = () => {
    // Clear the form fields for the last recipient
  /*const clearFormFields = () => {
    setRecipients((prevRecipients) => [
      ...prevRecipients.slice(0, prevRecipients.length - 1),
      { name: '', organization: '', comment: '' },
    ]);
  };

  const clearCurrentForm = () => {
    setRecipients((prevRecipients) =>
      prevRecipients.map((recipient, index) =>
        index === prevRecipients.length - 1
          ? { ...recipient, name: '', organization: '', comment: '' }
          : recipient
      )
    );
  };

  return (
    <div className="form2_container">
      <div className="form2">
        <h2>
          Recipient <FaUserPlus style={{ marginLeft: '5px' }} onClick={addRecipient} />
        </h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipients[recipients.length - 1].name}
            onChange={(e) => handleRecipientChange('name', e.target.value)}
            className="fixed-width"
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization:</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={recipients[recipients.length - 1].organization}
            onChange={(e) => handleRecipientChange('organization', e.target.value)}
            className="fixed-width"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            cols="50"
            value={recipients[recipients.length - 1].comment}
            onChange={(e) => handleRecipientChange('comment', e.target.value)}
            className="fixed-width"
          />
        </div>
        <button onClick={handleNext} className="authentic">
          Continue
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form2;
