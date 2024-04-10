
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddToken from './addToken';
import { useTokenContext } from '../../../constants/TokenContext';
import { FaUserPlus, FaTrash } from 'react-icons/fa';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import TokenTable from '../Transaction/tokens';
import CSVDetailsModal from './csvForms/local';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Form2 = ({ onNextForm }) => {
  const { tokens: initialTokens, setTokens } = useTokenContext();
  const [recipients, setRecipients] = useState([
    { id: 1, name: '', organization: '', wallet: '', selectedTokens: [], tokenCount: 0 },
  ]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showTokenTable, setShowTokenTable] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState(0)
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [csvCurrencyName, setCsvCurrencyName] = useState('');
  const [csvAmount, setCsvAmount] = useState(0);
  const [csvRate, setCsvRate] = useState(0);
  


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
    const cryptoDat = JSON.parse(localStorage.getItem('cryptoData'))
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
        csvDetails: {
          currencyName: csvCurrencyName, 
          amount: csvAmount, 
          rate: csvRate, 
        }
      };
      onNextForm(5, formData);
    } else {
      toast.error('Invalid Name or Wallet Address.', toastOptions);
    }
  };

  const handleRecipientChange = (id, field, value) => {
    setRecipients((prevRecipients) =>
      prevRecipients.map((recipient) =>
        recipient.id === id ? { ...recipient, [field]: value } : recipient
      )
    );
  };


  const handleTokenChange = (id, selectedTokens) => {
    setRecipients(prevRecipients => {
      const updatedRecipients = prevRecipients.map(recipient => {
        if (recipient.id === id) {
          return { ...recipient, selectedTokens: selectedTokens, tokenCount: selectedTokens.length };
        }
        return recipient;
      });
      setTokens(getCombinedTokens(updatedRecipients)); // Update context with combined tokens
      // setSelectedRecipientId(id)
      // console.log('selected:',selectedRecipientId)
      return updatedRecipients;
    });
  };

  const getCombinedTokens = (recipients) => {
    let combinedTokens = [];
    recipients.forEach(recipient => {
      combinedTokens = combinedTokens.concat(recipient.selectedTokens);
    });
    // Remove duplicates if any
    combinedTokens = combinedTokens.filter((token, index) => combinedTokens.indexOf(token) === index);
    return combinedTokens;
  };


  const addRecipient = () => {
    const newRecipientId = recipients.length + 1;
    setRecipients((prevRecipients) => [
      ...prevRecipients,
      { id: newRecipientId, name: '', organization: '', wallet: '', selectedTokens: [], tokenCount: 0 },
    ]);
  };

  const removeRecipient = (id) => {
    setRecipients((prevRecipients) =>
      prevRecipients.filter((recipient) => recipient.id !== id)
    );
  };

  //  const handleOverlaySubmit = (submittedTokens) => {     setTokens(submittedTokens); // Update tokens state with the submitted tokens
  //   setShowOverlay(false); // Close the overlay after submission
  // };
  const handleTokenClick = (recipientId) => {
    setShowTokenTable(!showTokenTable);
    setSelectedRecipientId(recipientId);
    console.log('selected:', recipientId);
  };

  // Function to close the token table
  const handleCloseTokenTable = () => {
    setShowTokenTable(false);
  };

  // const updateTokenCount = (recipientId) => {
  //   setRecipients(prevRecipients => {
  //     return prevRecipients.map(recipient => {
  //       if (recipient.id === recipientId) {
  //         return { ...recipient, tokenCount: recipient.selectedTokens.length };
  //       }
  //       return recipient;
  //     });
  //   });
  // };

  const handleRemoveToken = (recipientId, tokenIndex) => {
    setRecipients(prevRecipients => {
      const updatedRecipients = prevRecipients.map(recipient => {
        if (recipient.id === recipientId) {
          const updatedTokens = [...recipient.selectedTokens];
          updatedTokens.splice(tokenIndex, 1);
          return { ...recipient, selectedTokens: updatedTokens, tokenCount: updatedTokens.length };
        }
        return recipient;
      });
      // updateTokenCount(recipientId)
      return updatedRecipients;
    });
  };

  const handleOverlaySubmit = (submittedTokens) => {
    setTokens(submittedTokens);
    setShowOverlay(false);
  };

  const handleAddToken = (recipientId, newToken) => {
    setRecipients(prevRecipients => {
      const updatedRecipients = prevRecipients.map(recipient => {
        if (recipient.id === recipientId) {
          const updatedTokens = [...recipient.selectedTokens, newToken];
          return { ...recipient, selectedTokens: updatedTokens, tokenCount: updatedTokens.length };
        }
        return recipient;
      });
      // updateTokenCount(recipientId)
      return updatedRecipients;
    });
  };
  console.log('s:', selectedRecipientId)

  const handleCSVSubmit = (formData) => {
    // Process formData as needed
    console.log('CSV Details:', formData);
  };
  return (
    <>
      {recipients.map((recipient, index) => (
        <div key={index} style={{ backgroundColor: '#F2EEE3', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginBottom: '20px', color: 'black', width: '400px' }}>
          <h2 style={{}}>Recipient {index + 1}</h2>
          <div className="form-group" style={{ textAlign: 'left', }}>
            <label htmlFor={`name-${recipient.id}`} style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Name:</label>
            <input
              type="text"
              id={`name-${recipient.id}`}
              name={`name-${recipient.id}`}
              value={recipient.name}
              onChange={(e) => handleRecipientChange(recipient.id, 'name', e.target.value)}
              style={{ width: 'calc(100% - 20px)', padding: '5px', marginBottom: '10px' }}
            />
          </div>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label htmlFor={`organization-${recipient.id}`} style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Organization:</label>
            <input
              type="text"
              id={`organization-${recipient.id}`}
              name={`organization-${recipient.id}`}
              value={recipient.organization}
              onChange={(e) => handleRecipientChange(recipient.id, 'organization', e.target.value)}
              style={{ width: 'calc(100% - 20px)', padding: '5px', marginBottom: '10px' }}
            />
          </div>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label htmlFor={`wallet-${recipient.id}`} style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Wallet Address:</label>
            <textarea
              id={`wallet-${recipient.id}`}
              name={`wallet-${recipient.id}`}
              value={recipient.wallet}
              onChange={(e) => handleRecipientChange(recipient.id, 'wallet', e.target.value)}
              style={{ width: 'calc(100% - 20px)', padding: '5px', marginBottom: '10px', resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="token-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px', backgroundColor: '#f0f0f0', width: '8rem', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '2px' }}>
              <div className="token-count" onClick={() => handleTokenClick(recipient.id)} style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', borderRadius: '10px', marginRight: '10px', marginLeft: '2px' }}>
                {recipient.tokenCount}
              </div>
              <button className="addicon1" type="button" onClick={() => setShowOverlay(true)} style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transform: 'translateY(12%)' }}>
                Add Token
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
              {recipients.length > 1 && (
                <button onClick={() => removeRecipient(recipient.id)} style={{ border: '1px black', padding: '20px', borderRadius: '20px' }}>
                  <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ff0000", height: '22px', width: '22px' }} />
                </button>
              )}
            </div>
          </div>
          <div>
              <button onClick={() => setShowCSVModal(true)} style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer'}}>CSV Details</button>
          </div>
        </div>
      ))}

      {showTokenTable && (
        <TokenTable
          recipients={recipients}
          selectedRecipientId={selectedRecipientId}
          onClose={handleCloseTokenTable}
          onRemoveToken={handleRemoveToken}
          onAddToken={handleAddToken}
        />
      )}

      {showOverlay && (
        <AddToken
          recipientId={recipients[recipients.length - 1].id} //Pass recipient ID
          initialTokens={initialTokens}
          onSubmit={(selectedTokens) => {
            handleTokenChange(recipients[recipients.length - 1].id, selectedTokens);// Pass recipient ID here
            setShowOverlay(false);
          }}
          onClose={() => setShowOverlay(false)}
        />
      )}
      {showCSVModal && <CSVDetailsModal onClose={() => setShowCSVModal(false)} onSubmit={(formData) => {
        setCsvCurrencyName(formData.currencyName);
        setCsvAmount(formData.amount);
        setCsvRate(formData.rate);
        setShowCSVModal(false);
      }} />}
      <ToastContainer />
      <div>
        <button type="button" onClick={addRecipient} style={{ width: '100%', border: '1px dotted black', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          ADD RECIPIENT
        </button>
        <div style={{ textAlign: 'left' }}>
          <button onClick={handleNext} style={{ border: 'none', backgroundColor: '#6B8065', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Form2;

