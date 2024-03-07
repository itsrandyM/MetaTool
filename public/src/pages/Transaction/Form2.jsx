// // import React, { useState } from 'react';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import AddToken from './Form3/addToken';
// // import { useTokenContext } from '../../../constants/TokenContext';
// // import TokenTable from './tokens'; // Import the token table component

// // const Form2 = ({ onNextForm }) => {
// //   const { tokens: initialTokens, setTokens } = useTokenContext();
// //   const [recipients, setRecipients] = useState([{ name: '', organization: '', wallet: '', selectedTokens: [], tokenCount:0 }]);
// //   const [recipientCount, setRecipientCount] = useState(1); 
// //   const [showOverlay, setShowOverlay] = useState(false);
// //   const [tokenCount, setTokenCount] = useState(0);
// //   const [showTokenTable, setShowTokenTable] = useState(false); // State to show/hide token table
  
 
// //   const toastOptions = {
// //     position: 'bottom-right',
// //     autoClose: 8000,
// //     pauseOnHover: true,
// //     draggable: true,
// //     theme: 'light',
// //   };

// //   const isNameValid = /^[a-zA-Z]+[a-zA-Z\s]*$/;
// //   const isWalletValid = /^[a-zA-Z0-9]{25,}$/;

// //   const addRecipient = () => {
// //     setRecipients([...recipients, { name: '', organization: '', wallet: '', selectedTokens: [], tokenCount:0  }]);
// //     setRecipientCount(recipientCount + 1); 
// //   };
  
// //   const removeRecipient = (index) => {
// //     const newRecipients = [...recipients];
// //     newRecipients.splice(index, 1);
// //     setRecipients(newRecipients);
// //   };

// //   const handleChange = (event, index) => {
// //     const { name, value } = event.target;
// //     const newRecipients = [...recipients];
// //     newRecipients[index][name] = value;
// //     setRecipients(newRecipients);
// //   };



// //   const handleNext = () => {
// //     if (recipients.some((recipient) => !recipient.name || !recipient.organization)) {
// //       toast.error('All fields are required for each recipient.', toastOptions);
// //       return;
// //     }

// //     if (recipients.every((recipient) => isNameValid.test(recipient.name) && isWalletValid.test(recipient.wallet))) {
// //       console.log('Form2 Data:', recipients);
// //       const formData = {
// //         recipients: recipients,
// //         tokens: initialTokens.map((token) => ({
// //           name: token.name,
// //           amount: token.amount,
// //         })),
// //       };
// //       onNextForm(5, formData);
// //       clearFormFields();
// //     } else {
// //       if (!isNameValid.test(recipients[0].name)) {
// //         toast.error('Invalid Name.', toastOptions);
// //       } else if (!isWalletValid.test(recipients[0].wallet)) {
// //         toast.error('Invalid Wallet Address.', toastOptions);
// //       }
// //     }
// //   };

// //   const handleRecipientChange = (field, value) => {
// //     setRecipients((prevRecipients) => [
// //       ...prevRecipients.slice(0, prevRecipients.length - 1),
// //       { ...prevRecipients[prevRecipients.length - 1], [field]: value },
// //     ]);
// //   };

// //   const clearFormFields = () => {
// //     setRecipients((prevRecipients) => [
// //       ...prevRecipients.slice(0, prevRecipients.length - 1),
// //       { name: '', organization: '', wallet: '' },
// //     ]);
// //   };

// //   const handleOverlaySubmit = (submittedTokens) => {
// //     setTokens(submittedTokens);
// //     setShowOverlay(false);
// //     setTokenCount(submittedTokens.length);
// //   };

// //   const handleTokenClick = () => {
// //     setShowTokenTable(!showTokenTable);
// //   };

// //   // Function to close the token table
// //   const handleCloseTokenTable = () => {
// //     setShowTokenTable(false);
// //   };

// //   // Function to remove a token from the table
// //   const handleRemoveToken = (index) => {
// //     const updatedTokens = [...initialTokens];
// //     updatedTokens.splice(index, 1);
// //     setTokens(updatedTokens);
// //     setTokenCount(updatedTokens.length);
// //   };

// //   // Function to add a token to the table
// //   const handleAddToken = (newToken) => {
// //     const updatedTokens = [...initialTokens, newToken];
// //     setTokens(updatedTokens);
// //     setTokenCount(updatedTokens.length);
// //   };

// //   return (
// //     <div style={{ backgroundColor: '#F2EEE3', padding: '10px', borderRadius: '10px', color: 'black', margin: 'auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', textAlign: 'center', width: '400px', marginTop: '4%' }}>
// //       <div style={{ marginLeft: '15%' }}>
// //         <h2 style={{ marginLeft: '-35px', marginTop: '10px' }}>Recipient </h2>
// //         <div className="form-group" style={{ textAlign: 'left', }}>
// //           <label htmlFor="name" style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Name:</label>
// //           <input
// //             type="text"
// //             id="name"
// //             name="name"
// //             value={recipients[recipients.length - 1].name}
// //             onChange={(e) => handleRecipientChange('name', e.target.value)}
// //             style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
// //           />
// //         </div>
// //         <div className="form-group" style={{ textAlign: 'left' }}>
// //           <label htmlFor="organization" style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Organization:</label>
// //           <input
// //             type="text"
// //             id="organization"
// //             name="organization"
// //             value={recipients[recipients.length - 1].organization}
// //             onChange={(e) => handleRecipientChange('organization', e.target.value)}
// //             style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
// //           />
// //         </div>
// //         <div className="form-group" style={{ textAlign: 'left' }}>
// //           <label htmlFor="wallet" style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Wallet Address:</label>
// //           <textarea
// //             id="wallet"
// //             name="wallet"
// //             value={recipients[recipients.length - 1].wallet}
// //             onChange={(e) => handleRecipientChange('wallet', e.target.value)}
// //             style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
// //           ></textarea>
// //         </div>
// //         <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
// //           {/* Token Info */}
// //           <div className="token-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px', backgroundColor: '#f0f0f0', width: '8rem', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '2px' }}>
// //             <div className="token-count" onClick={handleTokenClick} style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', borderRadius: '10px', marginRight: '10px', marginLeft: '2px' }}>
// //               {tokenCount}
// //             </div>
// //             <button className="addicon1" type="button" onClick={() => setShowOverlay(true)} style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transform: 'translateY(12%)' }}>
// //               Add Token
// //             </button>
// //           </div>

// //           {/* Add Recipient */}
// //           <div className="token-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px', backgroundColor: '#f0f0f0', width: '8rem', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '2px' }}>
// //             <button className="addicon1" type="button" onClick={() => setShowOverlay(true)} style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transform: 'translateY(12%)' }}>
// //               Add Recipient
// //             </button>
// //           </div>
// //         </div>



// //         {showTokenTable && <TokenTable tokens={initialTokens} onClose={handleCloseTokenTable} onRemoveToken={handleRemoveToken} onAddToken={handleAddToken} />}
// //         <button onClick={handleNext} style={{ backgroundColor: '#6B8065', padding: '12px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', transform: 'translateY(-2%)', marginLeft: '-35px' }}>
// //           Continue
// //         </button>
// //       </div>
// //       {showOverlay && (
// //         <AddToken
// //           initialTokens={initialTokens}
// //           onSubmit={handleOverlaySubmit}
// //           onClose={() => setShowOverlay(false)}
// //         />
// //       )}
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default Form2;


// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AddToken from '../Transaction/Form3/addToken';
// import { useTokenContext } from '../../../constants/TokenContext';
// import TokenTable from '../Transaction/tokens'; // Import the token table component


// const Form2 = ({ onNextForm })  => {
//   const { tokens: initialTokens, setTokens } = useTokenContext();
//   // const [recipients, setRecipients] = useState([]);
//   const [recipients, setRecipients] = useState([
//        { id: 1, name: '', organization: '', wallet: '', selectedTokens: [], tokenCount:0 },
//   ]);
//   const [recipientCount, setRecipientCount] = useState(1); 
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [tokenCount, setTokenCount] = useState(0);
//   const [showTokenTable, setShowTokenTable] = useState(false);
  
//   const toastOptions = {
//     position: 'bottom-right',
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: 'light',
//   };

//   const isNameValid = /^[a-zA-Z]+[a-zA-Z\s]*$/;
//   const isWalletValid = /^[a-zA-Z0-9]{25,}$/;
  
  
//   const addRecipient = () => {
//          const newRecipientId = recipients.length + 1;
//        setRecipients((prevRecipients) => [
//            ...prevRecipients,
//            { id: newRecipientId, name: '', organization: '', wallet: '', selectedTokens: [], tokenCount:0 },
//          ]);     setRecipientCount(recipientCount + 1); 
//        };


//   const removeRecipient = (index) => {
//     const newRecipients = [...recipients];
//     newRecipients.splice(index, 1);
//     setRecipients(newRecipients);
//   };

  

//   const handleNext = () => {
//          if (recipients.some((recipient) => !recipient.name || !recipient.organization )) {
//            toast.error('All fields are required for each recipient, and at least one token must be selected.', toastOptions);
//            return;
//          }
      
//          if (recipients.every((recipient) => isNameValid.test(recipient.name) && isWalletValid.test(recipient.wallet))) {
//            console.log('Form2 Data:', recipients);
//            const formData = {
//              recipients: recipients, 
//              tokens: initialTokens.map((token) => ({
//                name: token.name, 
//                amount: token.amount, 
//              })),
//            };
//            onNextForm(5, formData);
//          } else {
//            toast.error('Invalid Name or Wallet Address.', toastOptions);
//          }
//        };
    
//        const handleRecipientChange = (id, field, value) => {
//          // Update the corresponding recipient's field
//          setRecipients((prevRecipients) =>
//            prevRecipients.map((recipient) =>
//              recipient.id === id ? { ...recipient, [field]: value } : recipient
//            )
//          );
//        };
      

//   // const handleOverlaySubmit = (submittedTokens) => {
//   //   setTokens(submittedTokens);
//   //   setShowOverlay(false);
//   //   setTokenCount(submittedTokens.length);
//   // };

//   const handleOverlaySubmit = (submittedTokens) => {
//     setTokens(submittedTokens);
//     setShowOverlay(false);
//     setTokenCount(submittedTokens.length);
//     setRecipients((prevRecipients) =>
//       prevRecipients.map((recipient) => {
//         if (recipient.id === recipients[recipients.length - 1].id) {
//           return { ...recipient, selectedTokens: submittedTokens };
//         }
//         return recipient;
//       })
//     );
//   };

//   const handleTokenClick = (recipientIndex) => {
//     setShowTokenTable(prevState => {
//       return { ...prevState, [recipientIndex]: !prevState[recipientIndex] };
//     });
//   };

//   // Function to close the token table
//   const handleCloseTokenTable = (recipientIndex) => {
//     setShowTokenTable(prevState => {
//       return { ...prevState, [recipientIndex]: false };
//     });
//   };

//   // Function to remove a token from the table
//   const handleRemoveToken = (recipientIndex, tokenIndex) => {
//     setRecipients(prevRecipients => {
//       return prevRecipients.map((recipient, index) => {
//         if (index === recipientIndex) {
//           const updatedTokens = [...recipient.selectedTokens];
//           updatedTokens.splice(tokenIndex, 1);
//           return { ...recipient, selectedTokens: updatedTokens };
//         }
//         return recipient;
//       });
//     });
//   };

//   const handleAddToken = (newToken, recipientIndex) => {
//     setRecipients(prevRecipients => {
//       return prevRecipients.map((recipient, index) => {
//         if (index === recipientIndex) {
//           const updatedTokens = [...recipient.selectedTokens, newToken];
//           return { ...recipient, selectedTokens: updatedTokens };
//         }
//         return recipient;
//       });
//     });
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center' }}> 
//       <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginTop: '10px', width: '400px' }}>
//         {recipients.map((recipient, index) => (
//           <div key={index} style={{  color: 'black', marginBottom: '20px', borderBottom: index === recipients.length - 1 ? 'none' : '1px solid #ccc' }}>
//             <h3 style={{ textAlign: 'center', marginBottom: '10px', color: 'black' }}>Recipient {index + 1}</h3> {/* Dynamically generate recipient title */}
//             <div className="form-group">
//             <label htmlFor={`name-${recipient.id}`} style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Name:</label>
//                <input
//                  type="text"
//                  id={`name-${recipient.id}`}
//                  name={`name-${recipient.id}`}
//                  value={recipient.name}
//                  onChange={(e) => handleRecipientChange(recipient.id, 'name', e.target.value)}
//                  style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
//                />
//             </div>
//             <div className="form-group">
//             <label htmlFor={`organization-${recipient.id}`} style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Organization:</label>
//               <input
//                 type="text"
//                 id={`organization-${recipient.id}`}
//                 name={`organization-${recipient.id}`}
//                 value={recipient.organization}
//                 onChange={(e) => handleRecipientChange(recipient.id, 'organization', e.target.value)}
//                 style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
//               />
//             </div>
//             <div className="form-group">
//             <label htmlFor={`wallet-${recipient.id}`} style={{ marginBottom: '5px', display: 'block', width: '80%', minWidth: '80px' }}>Wallet Address:</label>
//              <input
//                  type="text"
//                  id={`wallet-${recipient.id}`}
//                  name={`wallet-${recipient.id}`}
//                  value={recipient.wallet}
//                  onChange={(e) => handleRecipientChange(recipient.id, 'wallet', e.target.value)}
//                  style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
//               />
//             </div>
            
//  <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
//           {/* Token Info */}
//           <div className="token-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px', backgroundColor: '#f0f0f0', width: '8rem', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '2px' }}>
//             <div className="token-count" onClick={handleTokenClick} style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', borderRadius: '10px', marginRight: '10px', marginLeft: '2px' }}>
//               {tokenCount}
//             </div>
//             <button className="addicon1" type="button" onClick={() => setShowOverlay(true)} style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transform: 'translateY(12%)' }}>
//               Add Token
//             </button>
//           </div> </div>

//             {index > 0 && ( // Render remove button only after the first recipient
//               <button type="button" onClick={() => removeRecipient(index)} style={{ marginTop: '5px', backgroundColor: 'grey', border: 'none', cursor: 'pointer', padding: '5px', borderRadius: '3px' }}>
//                 <i className="fas fa-trash-alt" style={{ color: 'white', fontSize: '18px' }}><FontAwesomeIcon icon={faTrash} style={{color: "#ff0000",}} /></i>
//               </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={addRecipient} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           Add Recipient
//         </button>
//     {showTokenTable && <TokenTable tokens={recipients[recipients.length - 1].selectedTokens} onClose={handleCloseTokenTable} onRemoveToken={handleRemoveToken} onAddToken={handleAddToken} />}

//         <button onClick={handleNext} style={{ backgroundColor: '#6B8065', padding: '12px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', transform: 'translateY(-2%)', marginLeft: '-35px' }}>
//           Continue
//         </button>
//       </div>
//       {showOverlay && (
//         <AddToken
//           initialTokens={initialTokens}
//           onSubmit={(submittedTokens) => handleOverlaySubmit(submittedTokens, recipients[recipients.length - 1].id)}
//           onClose={() => setShowOverlay(false)}
//         />
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Form2;


import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddToken from './Form3/addToken';
import { useTokenContext } from '../../../constants/TokenContext';
import { FaUserPlus, FaTrash } from 'react-icons/fa';
import TokenTable from '../Transaction/tokens'; 

const Form2 = ({ onNextForm }) => {
  const { tokens: initialTokens, setTokens } = useTokenContext();
  const [recipients, setRecipients] = useState([
    { id: 1, name: '', organization: '', wallet: '', selectedTokens: [], tokenCount: 0 },
  ]);
  const [showOverlay, setShowOverlay] = useState(false);
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
  
  const handleNext = () => {
    if (recipients.some((recipient) => !recipient.name || !recipient.organization || recipient.selectedTokens.length === 0)) {
      toast.error('All fields are required for each recipient, and at least one token must be selected.', toastOptions);
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
  

  const handleTokenChange = (id, selectedTokens) => {
    setRecipients(prevRecipients => {
      const updatedRecipients = prevRecipients.map(recipient => {
        if (recipient.id === id) {
          return { ...recipient, selectedTokens: selectedTokens, tokenCount: selectedTokens.length };
        }
        return recipient;
      });
      setTokens(getCombinedTokens(updatedRecipients)); // Update context with combined tokens
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
       { id: newRecipientId, name: '', organization: '', wallet: '', selectedTokens: [], tokenCount:0 },
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
  const handleTokenClick = () => {
    setShowTokenTable(!showTokenTable);
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
   return (
     <div style={{ backgroundColor: '#F2EEE3', padding: '10px', borderRadius: '10px', color: 'black', margin: 'auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', textAlign: 'center', width: '300px', marginTop: '4%' }}>
       <div style={{ marginLeft: '35px' }}>
         <h2 style={{marginLeft: '-35px',  marginTop: '10px' }}>Recipients </h2>
          <FaUserPlus style={{ marginLeft: '60%', width: '18px', height:'18px'}} onClick={addRecipient} />

         {recipients.map((recipient) => (
           <div key={recipient.id} style={{ marginBottom: '20px' }}>
             <div className="form-group" style={{ textAlign: 'left', }}>
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
             <div className="form-group" style={{ textAlign: 'left' }}>
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
             <div className="form-group" style={{ textAlign: 'left' }}>
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
            {/* <div className="form-group" style={{ textAlign: 'left' }}>
              <label htmlFor={`token-${recipient.id}`} className="form-label">Token:</label>
              <div className="token-input-group">
                <input
                  type="text"
                  id={`token-${recipient.id}`}
                  name={`token-${recipient.id}`}
                  value={recipient.selectedTokens.join(', ')}
                  readOnly
                  style={{ width: '80%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <button className="addicon1" type="button" onClick={() => setShowOverlay(true)} style={{margin: '5px'}} >
                  Add Token
                </button>
              </div>
            </div> */}
             <div className="token-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px', backgroundColor: '#f0f0f0', width: '8rem', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '2px' }}>
           <div className="token-count" onClick={handleTokenClick} style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', borderRadius: '10px', marginRight: '10px', marginLeft: '2px' }}>
             {recipient.tokenCount}
           </div>
           <button className="addicon1" type="button" onClick={() => setShowOverlay(true)} style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transform: 'translateY(12%)' }}>
             Add Token
           </button>
         </div>
            {recipients.length > 1 && (
              <button onClick={() => removeRecipient(recipient.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        
        <button onClick={handleNext} style={{ backgroundColor: '#6B8065', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', transform: 'translateY(-40%)', marginLeft: '-35px' }}>
          Continue
        </button>
      </div>
      {showTokenTable && (
  <TokenTable
    recipients={recipients}
    onClose={handleCloseTokenTable}
    onRemoveToken={handleRemoveToken}
    onAddToken={handleAddToken}
  />
)}
     
     {showOverlay && (
  <AddToken
    recipientId={recipients[recipients.length - 1].id} Pass recipient ID
    initialTokens={initialTokens}
    onSubmit={(selectedTokens) => {
      handleTokenChange(recipients[recipients.length - 1].id, selectedTokens);// Pass recipient ID here
      setShowOverlay(false);
    }}
    onClose={() => setShowOverlay(false)}
  />
)}
      <ToastContainer />
    </div>
  );
};

export default Form2;

