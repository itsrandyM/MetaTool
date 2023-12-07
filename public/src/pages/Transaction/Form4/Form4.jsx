import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form4.css';

const Form4 = ({ form2Data = {}, form3Data = {} }) => {
  const [formData, setFormData] = useState({
    recipientDetails: { name: '', email: '', wallet: '' },
    transactionDetails: { token: '', classification: '', description: '' },
  });

  useEffect(() => {
    setFormData({
      recipientDetails: { ...form2Data },
      transactionDetails: { ...form3Data },
    });
  }, [form2Data, form3Data]);

  const handleSendData = () => {
    const serverUrl = 'http://localhost:4000/api/addRecipientTransaction';
    const requestData = {
      recipientDetails: form2Data,
      transactionDetails: form3Data,
    };

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxNzYwZmJjYTQ5YjI2OGIzMDkxZWEiLCJ1c2VybmFtZSI6IkRqVGFrZSIsImlzQWRtaW4iOnRydWUsInJvbGVzIjpbIkVtcGxveWVlIl0sImlhdCI6MTcwMTkzNzIyN30._3LNyFSBdM-mDK4T66qkB4sxXoyb6mFQbZL30YtVd3Y',
      },
    };

    axios
      .post(serverUrl, requestData, axiosConfig)
      .then((response) => {
        console.log('Server response:', response.data);
      })
      .catch((error) => {
        console.error('Error sending data to the server:', error);
      });
  };

  return (
    <div className="form_container">
      <form className="summarized">
        <h2 className="sum_h">Recipient Details</h2>
        <div className="rec_d">
        <p className="data">Name: {form2Data.recipientDetails?.name || ''}</p>
  <p className="data">Email: {form2Data.recipientDetails?.email || ''}</p>
  <p className="data">Wallet: {form2Data.recipientDetails?.wallet || ''}</p>
        </div>
        <br />
        <div className="rec_d2">
          <h2 className="sum_h2">Transaction Details</h2>
          <p className="data">Token: {form3Data.transactionDetails?.token || ''}</p>
          <p className="data">Classification: {form3Data.transactionDetails?.classification || ''}</p>
          <p className="data">Description: {form3Data.transactionDetails?.description || ''}</p>
        </div>
      </form>
      <button onClick={handleSendData} className="authentic">
        Save and submit
      </button>
    </div>
  );
};

export default Form4;
