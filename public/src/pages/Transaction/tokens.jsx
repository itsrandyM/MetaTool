import React, { useState } from 'react';

const TokenTable = ({ recipients, selectedRecipientId, onClose, onRemoveToken, onAddToken }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenAmount, setNewTokenAmount] = useState('');

  const handleAddToken = (recipientId) => {
    const newToken = { name: newTokenName, amount: newTokenAmount };
    onAddToken(recipientId, newToken);
    setShowOverlay(false);
    setNewTokenName('');
    setNewTokenAmount('');
  };
  
  return (
    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: '9999' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '10px', width: '80%', height: 'auto', maxHeight: '80%', overflowY: 'auto', maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>X</button>
        </div>
        <h3 style={{color: 'black'}}>Token List</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {/* <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Recipient</th> */}
              <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Name</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Amount</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Action</th> {/* New column for removing tokens */}
            </tr>
          </thead>
          <tbody>
          {recipients.find(recipient => recipient.id === selectedRecipientId)?.selectedTokens.map((token, tokenIndex) => (
      <tr key={`${recipients.id}-${tokenIndex}`} style={{ borderBottom: '1px solid #ccc' }}>
      {/* <td style={{ padding: '10px' }}>{recipient.name}</td> */}
      <td style={{ padding: '10px' }}>{token.name}</td>
      <td style={{ padding: '10px' }}>{token.amount}</td>
      <td style={{ padding: '10px' }}><button onClick={() => onRemoveToken(selectedRecipientId, tokenIndex)}>-</button></td> {/* Button to remove token */}
    </tr>

))}

        
          </tbody>
        </table>
        {/* Add Token Button */}
        <button onClick={() => setShowOverlay(true)} style={{ backgroundColor: '#6B8065', padding: '12px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', marginTop: '20px', width: '100%' }}>Add Token</button>
      </div>
      {/* Add Token Overlay */}
      {showOverlay && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: '9999' }}>
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#F2EEE3', padding: '20px', borderRadius: '10px', width: '400px', color: 'black', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
    <h3 style={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Add Token</h3>
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <label htmlFor="newTokenName" style={{ marginBottom: '5px', display: 'block', fontWeight: 'bold', textAlign: 'left' }}>Token Name:</label>
        <input
          type="text"
          id="newTokenName"
          value={newTokenName}
          onChange={(e) => setNewTokenName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: 'none',
            borderBottom: '2px solid black',
            boxSizing: 'border-box',
            background: 'transparent',
            outline: 'none',
            transition: 'border-bottom-color 0.3s, box-shadow 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.borderBottomColor = '#6B8065';
            e.target.style.boxShadow = '0 0 10px 3px #6B8065';
          }}
          onBlur={(e) => {
            e.target.style.borderBottom = '2px solid black';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <label htmlFor="newTokenAmount" style={{ marginBottom: '5px', display: 'block', fontWeight: 'bold', textAlign: 'left' }}>Token Amount:</label>
        <input
          type="text"
          id="newTokenAmount"
          value={newTokenAmount}
          onChange={(e) => setNewTokenAmount(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: 'none',
            borderBottom: '2px solid black',
            boxSizing: 'border-box',
            background: 'transparent',
            outline: 'none',
            transition: 'border-bottom-color 0.3s, box-shadow 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.borderBottomColor = '#6B8065';
            e.target.style.boxShadow = '0 0 10px 3px #6B8065';
          }}
          onBlur={(e) => {
            e.target.style.borderBottom = '2px solid black';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button
          onClick={() => handleAddToken(selectedRecipientId)}
          style={{
            backgroundColor: '#6B8065',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '45%',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          Add
        </button>
        <button
          onClick={() => setShowOverlay(false)}
          style={{
            backgroundColor: '#ccc',
            color: 'black',
            border: 'none',
            padding: '12px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '45%',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>

      )}
    </div>
  );
};

export default TokenTable;

// import React, { useState } from 'react';

// const TokenTable = ({ recipients, onClose, onRemoveToken, onAddToken }) => {
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [newTokenName, setNewTokenName] = useState('');
//   const [newTokenAmount, setNewTokenAmount] = useState('');
//   const [currentRecipientId, setCurrentRecipientId] = useState(null);

//   const handleAddToken = () => {
//     if (currentRecipientId !== null) {
//       const newToken = { name: newTokenName, amount: newTokenAmount };
//       onAddToken(currentRecipientId, newToken);
//       setShowOverlay(false);
//       setNewTokenName('');
//       setNewTokenAmount('');
//       setCurrentRecipientId(null);
//     }
//   };

//   const handleShowOverlay = (recipientId) => {
//     setShowOverlay(true);
//     setCurrentRecipientId(recipientId);
//   };

//   return (
//     <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: '9999' }}>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//         {recipients.map((recipient) => (
//           <div key={recipient.id} style={{ margin: '20px', color: 'black' }}>
//             <h3>Token List for {recipient.name}</h3>
//             <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//               <thead>
//                 <tr>
//                   <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Name</th>
//                   <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Amount</th>
//                   <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recipient.selectedTokens.map((token, tokenIndex) => (
//                   <tr key={`${recipient.id}-${tokenIndex}`} style={{ borderBottom: '1px solid #ccc' }}>
//                     <td style={{ padding: '10px' }}>{token.name}</td>
//                     <td style={{ padding: '10px' }}>{token.amount}</td>
//                     <td style={{ padding: '10px' }}>
//                       <button onClick={() => onRemoveToken(recipient.id, tokenIndex)}>-</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button onClick={() => handleShowOverlay(recipient.id)} style={{ marginTop: '10px', backgroundColor: '#6B8065', padding: '12px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', width: '100%' }}>Add Token</button>
//           </div>
//         ))}
//       </div>

//       {showOverlay && (
//         <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '10px', width: '80%', height: 'auto', maxHeight: '80%', overflowY: 'auto', maxWidth: '400px' }}>
//           <h3>Add Token</h3>
//           <div className="form-group" style={{ textAlign: 'left' }}>
//             <label htmlFor="newTokenName">Token Name:</label>
//             <input type="text" id="newTokenName" value={newTokenName} onChange={(e) => setNewTokenName(e.target.value)} />
//           </div>
//           <div className="form-group" style={{ textAlign: 'left' }}>
//             <label htmlFor="newTokenAmount">Token Amount:</label>
//             <input type="text" id="newTokenAmount" value={newTokenAmount} onChange={(e) => setNewTokenAmount(e.target.value)} />
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//             <button onClick={handleAddToken} style={{ backgroundColor: '#6B8065', padding: '12px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', width: '45%' }}>Add</button>
//             <button onClick={() => setShowOverlay(false)} style={{ backgroundColor: '#ccc', padding: '12px', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', width: '45%' }}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TokenTable;
