import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import { useTokenContext } from '../../../constants/TokenContext';
import AddTokenPage from './Form3/addToken';
import { FaUserPlus } from 'react-icons/fa';
// import './Form2.css';


const Form2 = ({ onNextForm }) => {
  const { tokens, setTokens } = useTokenContext();
  const [recipients, setRecipients] = useState([
    { name: '', organization: '',wallet:'', comment: '' },
  ]);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };
  const [showAddTokenForm, setShowAddTokenForm] = useState(false);
  const navigate = useNavigate();
  

  const isNameValid =/^[a-zA-Z]+[a-zA-Z\s]*$/

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddTokenForm && event.target.closest('.popup-container') === null) {
        setShowAddTokenForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddTokenForm]);

  const handleAddToken = () => {
    setShowAddTokenForm(true);
  };

  const handleNext = () => {
    if (recipients.some((recipient) => !recipient.name || !recipient.organization)) {
      toast.error('All fields are required for each recipient.', toastOptions);
      return;
    }

    if (recipients.every((recipient) => isNameValid.test(recipient.name))) {
      console.log('Form2 Data:', recipients, tokens);
      const formData = {
        recipients: recipients, // Existing recipient data
        tokens: tokens.map((token) => ({
          name: token.name, // Token name
          amount: token.amount, // Token amount
        })),
      };
      onNextForm(3, formData);
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
    if (currentRecipient.name && currentRecipient.organization && currentRecipient.wallet && isNameValid.test(currentRecipient.name)) {
      // Add a new recipient with the same data structure
      setRecipients((prevRecipients) => [...prevRecipients, { name: '', organization: '', wallet:'', comment: '' }]);
    } else {
      toast.error('Fill in the current recipient details correctly before adding a new one.', toastOptions);
    }
  };

  const clearFormFields = () => {
    // Clear the form fields for the last recipient
    setRecipients((prevRecipients) => [
      ...prevRecipients.slice(0, prevRecipients.length - 1),
      { name: '', organization: '', wallet:'' ,comment: '' },
    ]);
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
           {tokens.map((token, index) => (
  <div key={index} className="form-group1">
    <label htmlFor={`token-${index}`} className="form-label2">
      Token {index + 1}:
    </label>
    <input
      type="text"
      id={`token-${index}`}
      name={`token-${index}`}
      value={token.name}
      onChange={(e) =>
        setTokens((prevTokens) =>
          prevTokens.map((prevToken, i) =>
            i === index ? { ...prevToken, name: e.target.value } : prevToken
          )
        )
      }
      className="form-input1"
    />
  </div>
))}

{tokens.map((token, index) => (
  <div  key={index} className="form-group">
    <div className="amount-input-group1">
      <input
        type='number'
        id={`token-${index}`}
        name={`token-${index}`}
        value={token.amount}
        onChange={(e) =>
          setTokens((prevTokens) =>
            prevTokens.map((prevToken, i) =>
              i === index ? { ...prevToken, amount: e.target.value } : prevToken
            )
          )
        }
        placeholder="0.00"
        className="form-input2 amount-input1"
      />
      <button className="addicon1" onClick={handleAddToken} type="button">
        Add Token
      </button>
    </div>
  </div>
))}

           <button onClick={handleNext} style={{ backgroundColor: '#6B8065', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', transform: 'translateY(-40%)', marginLeft: '-35px' }}>
             Continue
           </button>
         </div>
         <ToastContainer />
         {showAddTokenForm && (
  <AddTokenPage
    tokens={tokens}
    setTokens={setTokens}

    onClose={() => setShowAddTokenForm(false)}
  />
)}
       </div>
  );
};

export default Form2;

