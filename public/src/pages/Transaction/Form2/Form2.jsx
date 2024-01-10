import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserPlus } from 'react-icons/fa'; // Import the FaUserPlus icon
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

    // Validate fields before moving to the next form
    if (recipients.every((recipient) => isNameValid.test(recipient.name))) {
      console.log('Form2 Data:', recipients);
      onNextForm(3, recipients);
      // Clear the form fields for the next recipient
      clearCurrentForm();
    } else {
      if (!isNameValid.test(recipients[0].name)) {
        toast.error('Invalid Name.', toastOptions);
      }
      // Additional validation error handling...
    }
  };

  const handleRecipientChange = (index, field, value) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index][field] = value;
    setRecipients(updatedRecipients);
  };

  const addRecipient = () => {
    const currentRecipient = recipients[recipients.length - 1];

    // Validate the current recipient before storing the data and clearing the form fields
    if (currentRecipient.name && currentRecipient.organization && isNameValid.test(currentRecipient.name)) {
      // Store the current recipient data in the state
      setRecipients((prevRecipients) => [...prevRecipients]);
      // Clear the form fields for the next recipient
      clearFormFields();
    } else {
      toast.error('Fill in the current recipient details correctly before adding a new one.', toastOptions);
    }
  };

  const clearFormFields = () => {
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
          Recipient <FaUserPlus style={{ marginLeft: '5px' }} onClick={addRecipient} /> {/* Add the FaUserPlus icon */}
        </h2>
        {recipients.map((recipient, index) => (
          <form key={index}>
            <div className="form-group">
              <label htmlFor={`name-${index}`}>Name:</label>
              <input
                type="text"
                id={`name-${index}`}
                name={`name-${index}`}
                value={recipient.name}
                onChange={(e) => handleRecipientChange(index, 'name', e.target.value)}
                className="fixed-width"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`organization-${index}`}>Organization:</label>
              <input
                type="text"
                id={`organization-${index}`}
                name={`organization-${index}`}
                value={recipient.organization}
                onChange={(e) => handleRecipientChange(index, 'organization', e.target.value)}
                className="fixed-width"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`comment-${index}`}>Comment:</label>
              <textarea
                id={`comment-${index}`}
                name={`comment-${index}`}
                rows="4"
                cols="50"
                value={recipient.comment}
                onChange={(e) => handleRecipientChange(index, 'comment', e.target.value)}
                className="fixed-width"
              />
            </div>
          </form>
        ))}

        <button onClick={handleNext} className="authentic">
          Continue
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form2;
