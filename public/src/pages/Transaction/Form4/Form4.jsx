import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../../../constants/index.js';
import { useAppContext } from '../../../components/Context/AppProvider.jsx';
import { useTokenContext } from '../../../../constants/TokenContext';
import SuccessPage from '../Success/Success.jsx';
import './Form4.css';

const Form4 = ({formData}) => {
  console.log('Received formData:', formData);
  

  const { updateTransactions } = useAppContext();
  const [successData, setSuccessData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setTokens } = useTokenContext();
  

  const token = localStorage.getItem('token');

  
  

  const handleSendData = () => {
    console.log('Sending data to the server...');
    console.log('FormData to be sent:', formData); // Log formData before sending

    const serverUrl = `${SERVER_URL}/api/addRecipientTransaction`;

    const recipientsData = formData.form3Data.recipients.map((recipient, index) => ({
      name: recipient.name,
      org: recipient.organization,
      wallet: recipient.wallet,
      comment: recipient.comment,
      // Add other properties as needed
    }));

   
    const requestData = {
      transactionName:formData.form2Data.name,
      transactionDescription:formData.form2Data.description,
      recipients: recipientsData,
      tokenName: formData.form3Data.tokens.map((token) => ({
        name: token.name,
        amount: token.amount,
      })),
      amount: formData.form5Data.amount,
      classificationName: formData.form5Data.classification,
      descriptionName: formData.form5Data.description,
      exchangeRates:formData.form4Data.exchangeRate,
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
        setTokens([{ name: '', amount: 0 }])
      })
      .catch((error) => {
        console.error('Error sending data to the server:', error);
        setIsSuccess(false);
      });
  };

  return (
    <div className="form_container">
      <form className="summarized">
        {/* <h2 className="sum_h">Recipient Details</h2> */}
        {/* <div className="rec_d">
          <p className="data">Name: {formData.form3Data.name}</p>
        </div> */}
        <br />
        <div className="rec_d2">
          <h2 className="sum_h">Transaction Details</h2>
          {/* {formData.form3Data.tokens.map((token, index) => (
            <p key={index} className="data">
             Token: {token.name}
           </p>
         ))} */}
          <p className="data2">Classification: {formData.form5Data.classification}</p>
          <p className="data3">Description: {formData.form5Data.description}</p>
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
