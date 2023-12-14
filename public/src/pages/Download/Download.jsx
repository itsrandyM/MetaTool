import React, { useState, useEffect } from 'react';
//import { SERVER_URL } from '../../../constants';
import axios from 'axios';
import './Download.css'

const TransactionDetailsPage = () => {
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactionDetails();
        setTransactionDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    };

    fetchData();
  }, []);

 const fetchTransactionDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'http://localhost:4000/api/generateJson', // Pass any request data if needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch transaction details');
  }
}

  const handleDownload = () => {
    const jsonData = JSON.stringify(transactionDetails, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'transaction_details.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="transaction-details-container">
      <h2>Transaction Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : transactionDetails.length === 0 ? (
        <p>No transaction details found.</p>
      ) : (
        <>

      <div className="transaction-details">
        {transactionDetails.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <p>Transaction Name: {transaction.transactionName}</p>
            <p>Recipient Id: {transaction.recipientId}</p>
            <p>Description: {transaction.description}</p>
            <p>Token: {transaction.token}</p>
            <p>Classification: {transaction.classification}</p>
            <hr />
          </div>
        ))}
      </div> 
      <button onClick={handleDownload} className="download-button">
        Download JSON
      </button>
      </>
      )}
    </div>
  );
};

export default TransactionDetailsPage;