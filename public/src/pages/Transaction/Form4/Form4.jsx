import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../../../constants/index.js';
import { useAppContext } from '../../../components/Context/AppProvider.jsx';
import SuccessPage from '../Success/Success.jsx';
import './Form4.css';

const Form4 = ({formData}) => {
  console.log('Received formData:', formData);
  

  const { updateTransactions } = useAppContext();
  const [successData, setSuccessData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  

  const token = localStorage.getItem('token');

  
  

  const handleSendData = () => {
    console.log('Sending data to the server...');
    console.log('FormData to be sent:', formData); // Log formData before sending

    const serverUrl = `${SERVER_URL}/api/addRecipientTransaction`;
    const requestData = {
      transactionName:formData.form2Data.name,
      transactionDescription:formData.form2Data.description,
      name: formData.form3Data.name,
      email: formData.form3Data.email,
      walletAddress: formData.form3Data.wallet,
      tokenName: formData.form4Data.token,
      classificationName: formData.form4Data.classification,
      descriptionName: formData.form4Data.description,
      };

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(serverUrl, requestData, axiosConfig)
      .then((response) => {
        console.log('Server response:', response.data);
        updateTransactions(response.data.recipientData);
        setIsSuccess(true);
      })
      .catch((error) => {
        console.error('Error sending data to the server:', error);
        setIsSuccess(false);
      });
  };

  return (
    <div className="form_container">
      <form className="summarized">
        <h2 className="sum_h">Recipient Details</h2>
        <div className="rec_d">
          <p className="data">Name: {formData.form3Data.name}</p>
          <p className="data">Email: {formData.form3Data.email}</p>
          <p className="data">Wallet: {formData.form3Data.wallet}</p>
        </div>
        <br />
        <div className="rec_d2">
          <h2 className="sum_h2">Transaction Details</h2>
          <p className="data">Token: {formData.form4Data.token}</p>
          <p className="data2">Classification: {formData.form4Data.classification}</p>
          <p className="data3">Description: {formData.form4Data.description}</p>
        </div>
      </form>
      <button onClick={handleSendData} className="authentic">
        Save and submit
      </button>
      {isSuccess && <SuccessPage successData={successData} />}
    </div>
  );
};

export default Form4;
