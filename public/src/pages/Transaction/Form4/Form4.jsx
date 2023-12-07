import React from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './Form4.css';

const Form4 = ({ form2Data = {}, form3Data = {} }) => {
    const handleSendData = () => {
        // Log the form data before making the request
        console.log('Form2 Data:', form2Data);
        console.log('Form3 Data:', form3Data);
      
        const serverUrl = 'http://localhost:4000/api/addRecipientTransaction';
        const formData = {
          recipientDetails: form2Data,
          transactionDetails: form3Data,
        };
      
        const axiosConfig = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxNzYwZmJjYTQ5YjI2OGIzMDkxZWEiLCJ1c2VybmFtZSI6IkRqVGFrZSIsImlzQWRtaW4iOnRydWUsInJvbGVzIjpbIkVtcGxveWVlIl0sImlhdCI6MTcwMTkzNzIyN30._3LNyFSBdM-mDK4T66qkB4sxXoyb6mFQbZL30YtVd3Y',
          },
        };
      
        axios.post(serverUrl, formData, axiosConfig)
          .then(response => {
            console.log('Server response:', response.data);
          })
          .catch(error => {
            console.error('Error sending data to the server:', error);
          });
      };
      

  return (
    <div className="form_container">
      <form className="summarized">
        <h2 className="sum_h">Recipient Details</h2>
        <div className="rec_d">
          <p className="data">Name: {form2Data.name}</p>
          <p className="data">Email: {form2Data.email}</p>
          <p className="data">Wallet: {form2Data.wallet}</p>
        </div>
        <br />
        <div className="rec_d2">
          <h2 className="sum_h2">Transaction Details</h2>
          <p className="data">Token: {form3Data.token}</p>
          <p className="data">Classification: {form3Data.classification}</p>
          <p className="data">Description: {form3Data.description}</p>
        </div>
      </form>
      <button onClick={handleSendData} className="authentic">
        Save and submit
      </button>
    </div>
  );
};

export default Form4;
