import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form1 = ({ onNextForm }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [classification, setClassification] = useState('');
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleNext = () => {
    const nameRegex = /^[a-zA-Z]{1,10}$/;

    if (!name.match(nameRegex)) {
      toast.error('Invalid Name.', toastOptions);
      return;
    }
    if (!classification) {
      toast.error('Please provide a classification.', toastOptions);
      return;
    }
    if (name && description && classification) {
      const formData = {
        name,
        description,
        classification,
      };

      console.log('Form1 Data:', formData)
      onNextForm(2,formData);
    } else {
      toast.error('Please fill in all fields.', toastOptions);
    }
  };

  return (
    <div style={{ backgroundColor: '#F2EEE3', padding: '10px', borderRadius: '10px', color: 'black', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', textAlign: 'center', maxWidth: '300px' }}>
      <div className="form1">
        <h2>New Transaction</h2>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <label htmlFor="name" style={{ marginBottom: '5px', display: 'block', textAlign: 'left', marginLeft: '28px' }}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '80%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <label htmlFor="classification" style={{ marginBottom: '5px', display: 'block', textAlign: 'left', marginLeft: '28px' }}>Classification:</label>
            <input
              type="text"
              id="classification"
              name="classification"
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
              style={{ width: '80%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <label htmlFor="description" style={{ marginBottom: '5px', display: 'block', textAlign: 'left', marginLeft: '28px',  }}>Description:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '80%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
        </form>
        <button onClick={handleNext} style={{ backgroundColor: '#6B8065', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', transform: 'translateY(-30%)' }}>Start Transaction</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form1;