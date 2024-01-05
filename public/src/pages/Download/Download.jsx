// TransactionDetailsPage.js
import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../../../constants';
import axios from 'axios';
import './Download.css';
import Navbar from '../../components/Navbar/Navbar';
import Foot from '../Transaction/Foot/foot';



const TransactionDetailsPage = () => {
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jsonPreview, setJsonPreview] = useState('');

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
        `${SERVER_URL}/api/generateJson`,
        {},
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
  };

  const handleDownload = () => {
    const jsonData = JSON.stringify(transactionDetails, null, 2);
    setJsonPreview(jsonData);

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'transaction_details.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    window.location.href = '/';

  };

  const renderProperty = (property) => {
    if (typeof property === 'object') {
      return JSON.stringify(property);
    }
    return property;
  };

  return (
    <div>
      <Navbar/>
    <div className="Download_container">
      <h2>Transaction Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : transactionDetails.length === 0 ? (
        <p>No transaction details found.</p>
      ) : (
        <>
          <div className="fixed">
            {/* Display your transaction details as you were doing */}
            {transactionDetails.map((transaction, index) => (
              <div key={index} className="transaction-item">
                <p className='item1'>Transaction Name: {transaction.transactionName}</p>
                <p className='item2'>Recipient Name: {renderProperty(transaction.recipient.name)}</p>
                <p className='item'>Description: {renderProperty(transaction.description)}</p>
                <p className='item'>Token: {renderProperty(transaction.token)}</p>
                <p className='item'>Classification: {renderProperty(transaction.classification)}</p>
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
    <Foot/>
    </div>
  );
};

export default TransactionDetailsPage;
