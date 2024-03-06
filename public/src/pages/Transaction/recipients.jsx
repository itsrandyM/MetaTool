import React, { useState } from 'react';

const AddRecipientForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, organization });
    setName('');
    setOrganization('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="organization">Organization:</label>
        <input
          type="text"
          id="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Recipient</button>
    </form>
  );
};

export default AddRecipientForm;
