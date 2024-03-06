import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const AddRecipientForm = () => {
  const [recipients, setRecipients] = useState([]);
  const [recipientCount, setRecipientCount] = useState(1); 
  const addRecipient = () => {
    setRecipients([...recipients, { name: '', organization: '' }]);
    setRecipientCount(recipientCount + 1); 
  };

  const removeRecipient = (index) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newRecipients = [...recipients];
    newRecipients[index][name] = value;
    setRecipients(newRecipients);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginTop: '10px', width: '400px' }}>
        {recipients.map((recipient, index) => (
          <div key={index} style={{ marginBottom: '20px', borderBottom: index === recipients.length - 1 ? 'none' : '1px solid #ccc' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px', color: 'black' }}>Recipient {index + 1}</h3> {/* Dynamically generate recipient title */}
            <div className="form-group">
              <label htmlFor={`name-${index}`} style={{ marginBottom: '5px', display: 'block', color: 'black' }}>Name:</label>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={recipient.name}
                onChange={(e) => handleChange(e, index)}
                required
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '3px', width: '93%' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`organization-${index}`} style={{ marginBottom: '5px', display: 'block', color: 'black' }}>Organization:</label>
              <input
                type="text"
                id={`organization-${index}`}
                name="organization"
                value={recipient.organization}
                onChange={(e) => handleChange(e, index)}
                required
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '3px', width: '93%' }}
              />
            </div>
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
      </div>
    </div>
  );
};

export default AddRecipientForm;
