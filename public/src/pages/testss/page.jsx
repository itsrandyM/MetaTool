import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddToken from '../Transaction/Form3/addToken';
import { useTokenContext } from '../../../constants/TokenContext';
import TokenTable from '../Transaction/tokens'; // Import the token table component


const Form2 = ({ onNextForm })  => {
  const { tokens: initialTokens, setTokens } = useTokenContext();
  // const [recipients, setRecipients] = useState([]);
  const [recipients, setRecipients] = useState([
       { id: 1, name: '', organization: '', wallet: '', selectedTokens: [] },
  ]);
  const [recipientCount, setRecipientCount] = useState(1); 
  const [showOverlay, setShowOverlay] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const [showTokenTable, setShowTokenTable] = useState(false);
  
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const isNameValid = /^[a-zA-Z]+[a-zA-Z\s]*$/;
  const isWalletValid = /^[a-zA-Z0-9]{25,}$/;
  
  
  const addRecipient = () => {
         const newRecipientId = recipients.length + 1;
       setRecipients((prevRecipients) => [
           ...prevRecipients,
           { id: newRecipientId, name: '', organization: '', wallet: '', selectedTokens: [] },
         ]);     setRecipientCount(recipientCount + 1); 
       };


  const removeRecipient = (index) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
  };

  

  const handleNext = () => {
         if (recipients.some((recipient) => !recipient.name || !recipient.organization || recipient.selectedTokens.length === 0)) {
           toast.error('All fields are required for each recipient, and at least one token must be selected.', toastOptions);
           return;
         }
      
         if (recipients.every((recipient) => isNameValid.test(recipient.name) && isWalletValid.test(recipient.wallet))) {
           console.log('Form2 Data:', recipients);
           const formData = {
             recipients: recipients, 
             tokens: initialTokens.map((token) => ({
               name: token.name, 
               amount: token.amount, 
             })),
           };
           onNextForm(5, formData);
         } else {
           toast.error('Invalid Name or Wallet Address.', toastOptions);
         }
       };
    
       const handleRecipientChange = (id, field, value) => {
         // Update the corresponding recipient's field
         setRecipients((prevRecipients) =>
           prevRecipients.map((recipient) =>
             recipient.id === id ? { ...recipient, [field]: value } : recipient
           )
         );
       };
      

  const handleOverlaySubmit = (submittedTokens) => {
    setTokens(submittedTokens);
    setShowOverlay(false);
    setTokenCount(submittedTokens.length);
  };

  const handleTokenClick = () => {
    setShowTokenTable(!showTokenTable);
  };

  // Function to close the token table
  const handleCloseTokenTable = () => {
    setShowTokenTable(false);
  };

  // Function to remove a token from the table
  const handleRemoveToken = (index) => {
    const updatedTokens = [...initialTokens];
    updatedTokens.splice(index, 1);
    setTokens(updatedTokens);
    setTokenCount(updatedTokens.length);
  };

  // Function to add a token to the table
  const handleAddToken = (newToken) => {
    const updatedTokens = [...initialTokens, newToken];
    setTokens(updatedTokens);
    setTokenCount(updatedTokens.length);
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginTop: '10px', width: '400px' }}>
        {recipients.map((recipient, index) => (
          <div key={index} style={{ marginBottom: '20px', borderBottom: index === recipients.length - 1 ? 'none' : '1px solid #ccc' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px', color: 'black' }}>Recipient {index + 1}</h3> {/* Dynamically generate recipient title */}
            <div className="form-group">
            <label htmlFor={`name-${recipient.id}`} style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Name:</label>
               <input
                 type="text"
                 id={`name-${recipient.id}`}
                 name={`name-${recipient.id}`}
                 value={recipient.name}
                 onChange={(e) => handleRecipientChange(recipient.id, 'name', e.target.value)}
                 style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
               />
            </div>
            <div className="form-group">
            <label htmlFor={`organization-${recipient.id}`} style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Organization:</label>
              <input
                type="text"
                id={`organization-${recipient.id}`}
                name={`organization-${recipient.id}`}
                value={recipient.organization}
                onChange={(e) => handleRecipientChange(recipient.id, 'organization', e.target.value)}
                style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
            </div>
            <div className="form-group">
            <label htmlFor={`wallet-${recipient.id}`} style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Wallet Address:</label>
             <input
                 type="text"
                 id={`wallet-${recipient.id}`}
                 name={`wallet-${recipient.id}`}
                 value={recipient.wallet}
                 onChange={(e) => handleRecipientChange(recipient.id, 'wallet', e.target.value)}
                 style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
            </div>
            
 <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
          {/* Token Info */}
          <div className="token-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px', backgroundColor: '#f0f0f0', width: '8rem', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '2px' }}>
            <div className="token-count" onClick={handleTokenClick} style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', borderRadius: '10px', marginRight: '10px', marginLeft: '2px' }}>
              {tokenCount}
            </div>
            <button className="addicon1" type="button" onClick={() => setShowOverlay(true)} style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transform: 'translateY(12%)' }}>
              Add Token
            </button>
          </div> </div>

            {index > 0 && ( // Render remove button only after the first recipient
              <button type="button" onClick={() => removeRecipient(index)} style={{ marginTop: '5px', backgroundColor: 'grey', border: 'none', cursor: 'pointer', padding: '5px', borderRadius: '3px' }}>
                <i className="fas fa-trash-alt" style={{ color: 'white', fontSize: '18px' }}><FontAwesomeIcon icon={faTrash} style={{color: "#ff0000",}} /></i>
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addRecipient} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Recipient
        </button>
      {showTokenTable && <TokenTable tokens={initialTokens} onClose={handleCloseTokenTable} onRemoveToken={handleRemoveToken} onAddToken={handleAddToken} />}
        <button onClick={handleNext} style={{ backgroundColor: '#6B8065', padding: '12px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', transform: 'translateY(-2%)', marginLeft: '-35px' }}>
          Continue
        </button>
      </div>
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
