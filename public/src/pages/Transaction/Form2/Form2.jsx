import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Form2.css';

// ... (other imports)

const Form2 = ({ onNextForm }) => {
  const [recipients, setRecipients] = useState([
    { name: '', email: '', wallet: '', comment: '' },
  ]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const isNameValid = /^[a-zA-Z]{1,10}$/;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipients[0].email);
  const isWalletValid = /^addr1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]+$/.test(
    recipients[0].wallet
  );

  const handleNext = () => {
    if (
      recipients.some(
        (recipient) => !recipient.name || !recipient.email || !recipient.wallet
      )
    ) {
      toast.error('All fields are required for each recipient.', toastOptions);
      return;
    }

    // Validate fields before moving to the next form
    if (
      recipients.every(
        (recipient) =>
          isNameValid &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient.email) &&
          /^addr1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]+$/.test(recipient.wallet)
      )
    ) {
      console.log('Form2 Data:', recipients);
      onNextForm(3, recipients);
    } else {
      if (!isNameValid) {
        toast.error('Invalid Name.', toastOptions);
      }
      if (!isEmailValid) {
        toast.error('Invalid email address.', toastOptions);
      }
      if (!isWalletValid) {
        toast.error('Invalid wallet address.', toastOptions);
      }
    }
  };

  const handleRecipientChange = (index, field, value) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index][field] = value;
    setRecipients(updatedRecipients);
  };

  const addRecipient = () => {
    setRecipients([...recipients, { name: '', email: '', wallet: '', comment: '' }]);
  };

  return (
    <div className="form2_container">
      <div className="form2">
        <h2>Recipient Details</h2>
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
              <label htmlFor={`email-${index}`}>Email:</label>
              <input
                type="email"
                id={`email-${index}`}
                name={`email-${index}`}
                value={recipient.email}
                onChange={(e) => handleRecipientChange(index, 'email', e.target.value)}
                className="fixed-width"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`wallet-${index}`}>Wallet Address:</label>
              <input
                type="text"
                id={`wallet-${index}`}
                name={`wallet-${index}`}
                value={recipient.wallet}
                onChange={(e) => handleRecipientChange(index, 'wallet', e.target.value)}
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
        <button onClick={addRecipient} className="authentic">
          Add Recipient
        </button>
        <button onClick={handleNext} className="authentic">
          Continue
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form2;
