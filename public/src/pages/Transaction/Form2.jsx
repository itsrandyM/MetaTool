import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddToken from './Form3/addToken';
import { useTokenContext } from '../../../constants/TokenContext';
import TokenTable from './tokens'; // Import the token table component

const Form2 = ({ onNextForm }) => {
  const { tokens: initialTokens, setTokens } = useTokenContext();
  const [recipients, setRecipients] = useState([{ name: '', organization: '', wallet: '' }]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const [showTokenTable, setShowTokenTable] = useState(false); // State to show/hide token table

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const isNameValid = /^[a-zA-Z]+[a-zA-Z\s]*$/;
  const isWalletValid = /^[a-zA-Z0-9]{25,}$/;

  const handleNext = () => {
    if (recipients.some((recipient) => !recipient.name || !recipient.organization)) {
      toast.error('All fields are required for each recipient.', toastOptions);
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
      clearFormFields();
    } else {
      if (!isNameValid.test(recipients[0].name)) {
        toast.error('Invalid Name.', toastOptions);
      } else if (!isWalletValid.test(recipients[0].wallet)) {
        toast.error('Invalid Wallet Address.', toastOptions);
      }
    }
  };

  const handleRecipientChange = (field, value) => {
    setRecipients((prevRecipients) => [
      ...prevRecipients.slice(0, prevRecipients.length - 1),
      { ...prevRecipients[prevRecipients.length - 1], [field]: value },
    ]);
  };

  const clearFormFields = () => {
    setRecipients((prevRecipients) => [
      ...prevRecipients.slice(0, prevRecipients.length - 1),
      { name: '', organization: '', wallet: '' },
    ]);
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
    <div style={{ backgroundColor: '#F2EEE3', padding: '10px', borderRadius: '10px', color: 'black', margin: 'auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', textAlign: 'center', width: '400px', marginTop: '4%' }}>
      <div style={{ marginLeft: '15%' }}>
        <h2 style={{ marginLeft: '-35px', marginTop: '10px' }}>Recipient </h2>
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
          <textarea
            id="wallet"
            name="wallet"
            value={recipients[recipients.length - 1].wallet}
            onChange={(e) => handleRecipientChange('wallet', e.target.value)}
            style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          ></textarea>
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
          </div>

          {/* Add Recipient */}
          <div className="token-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px', backgroundColor: '#f0f0f0', width: '8rem', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '2px' }}>
            <button className="addicon1" type="button" onClick={() => setShowOverlay(true)} style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transform: 'translateY(12%)' }}>
              Add Recipient
            </button>
          </div>
        </div>



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
