import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../../constants/index.js';
import { useAppContext } from '../../components/Context/AppProvider.jsx';
import { useTokenContext } from '../../../constants/TokenContext';
import SuccessPage from './Success/Success.jsx';

const Form4 = ({ formData }) => {
  const { updateTransactions } = useAppContext();
  const [successData, setSuccessData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setTokens } = useTokenContext();
  const token = localStorage.getItem('token');

  const handleSendData = () => {
    const serverUrl = `${SERVER_URL}/api/addRecipientTransaction`;

    // const exchangeData = formData.form5Data.exchangeRates.flatMap(rates => rates.map(rate => ({
    //   base_currency: rate.base_currency,
    //   quote_currency: rate.quote_currency,
    //   rate: rate.rate,
    //   time: rate.time,
    // })));

    const exchangeData = formData.form4Data.exchangeRates 
  ? Object.values(formData.form4Data.exchangeRates).flatMap(rates => rates.map(rate => ({
      base_currency: rate.base_currency,
      quote_currency: rate.quote_currency,
      rate: rate.rate,
      time: rate.time,
    })))
  : [];

    const recipientsData = formData.form3Data.recipients.map((recipient, index) => ({
      name: recipient.name,
      org: recipient.organization,
      wallet: recipient.wallet,
      comment: recipient.comment,
    }));
    

   
    const requestData = {
      transactionName: formData.form2Data.name,
      transactionDescription: formData.form2Data.description,
      recipients: recipientsData,
      tokenName: formData.form3Data.tokens.map((token) => ({
        name: token.name,
        amount: token.amount,
      })),
      amount: formData.form5Data.amount,
      classificationName: formData.form5Data.classification,
      descriptionName: formData.form5Data.description,
      // exchangeRates:formData.form4Data.exchangeRates,
      exchangeRates: exchangeData,
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
        updateTransactions(response.data.recipientData);
        setIsSuccess(true);
        setTokens([{ name: '', amount: 0 }]);
      })
      .catch((error) => {
        console.error('Error sending data to the server:', error);
        setIsSuccess(false);
      });
  };

  return (
    <div style={{ backgroundColor: '#f2eee3', padding: '20px', borderRadius: '10px', color: 'black', margin: '5% auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', textAlign: 'center', maxWidth: '500px' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Transaction Details</h2>
      <hr style={{ width: '50%', margin: 'auto', marginBottom: '20px' }} />
      <form className="summarized" style={{ textAlign: 'left' }}>
        <div style={{ marginBottom: '15px' }}>
          <p style={{ marginBottom: '5px' }}>Classification: {formData.form5Data.classification}</p>
          <p style={{ marginBottom: '5px' }}>Description: {formData.form5Data.description}</p>
        </div>
      </form>
      <button onClick={handleSendData} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
        Save and submit
      </button>
      {isSuccess && <SuccessPage successData={successData} />}
    </div>
  );
};

export default Form4;
