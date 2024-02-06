import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../../../constants';
import axios from 'axios';
import './Download.css';
import Navbar from '../../components/Navbar/Navbar';
import Foot from '../Transaction/Foot/foot';
import animationData from '../../../public/load.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

const TransactionDetailsPage = () => {
  const navigate = useNavigate();
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

  const handleDownloadJSON = () => {
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

    navigate('/home');
  };

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(transactionDetails);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'transaction_details.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    navigate('/home');
  };

  const convertToCSV = (data) => {
    // Convert transaction details to CSV format
    const header = "Recipient address, Amount";
    const rows = data.map((transaction) => {
           const recipient = transaction.recipients["0"]
           const amount = transaction.token['0'].tokenName["0"].amount
           return `${recipient.wallet},${amount}`;
    
    });
    return [header, ...rows].join('\n');
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
          <Lottie options={defaultOptions} width={50} height={50}/>
        ) : transactionDetails.length === 0 ? (
          <p>No transaction details found.</p>
        ) : (
          <>
            <div className="fixed">
              {transactionDetails.map((transaction, index) => (
                <div key={index} className="transaction-item">
                  <p className='item'>Classification: {renderProperty(transaction.classification.classificationName)}</p>
                  <p className='item'>Description: {renderProperty(transaction.description.descriptionName)}</p>
                  <p className='item1'>Transaction Name: {transaction.transactionName}</p>
                  <p className='item'>Token: {renderProperty(transaction.token)}</p>
                  <hr />
                </div>
              ))}
            </div>
            <button onClick={handleDownloadJSON} className="download-button">
              Download JSON
            </button>
            <button onClick={handleDownloadCSV} className="download-button">
              Download CSV
            </button>
          </>
        )}
      </div>
      <Foot/>
    </div>
  );
};

export default TransactionDetailsPage;
