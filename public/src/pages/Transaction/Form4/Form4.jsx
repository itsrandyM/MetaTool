import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../../../constants/index.js';
import { useAppContext } from '../../../components/Context/AppProvider.jsx';
import SuccessPage from '../Success/Success.jsx';
import './Form4.css';

const Form4 = ({ form1Data = {}, form2Data = {}, form3Data = {} }) => {
  console.log('Received form1Data:', form1Data);
  console.log('Received form2Data:', form2Data);
  console.log('Received form3Data:', form3Data);

  const { updateTransactions } = useAppContext();
  const [formData, setFormData] = useState({
    recipientDetails: { name: '', email: '', wallet: '' },
    transactionDetails: { token: '', classification: '', description: '' },
  });
  const [successData, setSuccessData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    setFormData({
      recipientDetails: { ...form2Data },
      transactionDetails: { ...form3Data },
    });
  }, [form2Data, form3Data]);

  const handleSendData = () => {
    console.log('Sending data to the server...');
    console.log('FormData to be sent:', formData); // Log formData before sending

    const serverUrl = `${SERVER_URL}/api/addRecipientTransaction`;
    const requestData = {
      recipientDetails: formData.recipientDetails,
      transactionDetails: formData.transactionDetails,
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
          <p className="data">Name: {form2Data.recipientDetails?.name || ''}</p>
          <p className="data">Email: {form2Data.recipientDetails?.email || ''}</p>
          <p className="data">Wallet: {form2Data.recipientDetails?.wallet || ''}</p>
        </div>
        <br />
        <div className="rec_d2">
          <h2 className="sum_h2">Transaction Details</h2>
          <p className="data">Token: {form3Data.transactionDetails?.token || ''}</p>
          <p className="data2">Classification: {form3Data.transactionDetails?.classification || ''}</p>
          <p className="data3">Description: {form3Data.transactionDetails?.description || ''}</p>
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
