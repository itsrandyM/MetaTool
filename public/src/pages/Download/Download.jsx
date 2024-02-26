import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../constants';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import animationData from '../../../public/load.json';

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
    const header = 'Recipient address, Amount';
    const rows = data.map((transaction) => {
      const recipient = transaction.recipients['0'];
      const amount = transaction.token['0'].tokenName['0'].amount;
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
    <div style={{ textAlign: 'center' }}>
      <Navbar />
      <div
        className="Download_container"
        style={{
          padding: '20px',
          color:'black',
          borderRadius: '10px',
          backgroundColor: '#f2eee3',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          margin: '40px auto',
          maxWidth: '400px', // Reduced width
        }}
      >
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Transaction Details</h2>
        {loading ? (
          <Lottie options={defaultOptions} width={50} height={50} />
        ) : transactionDetails.length === 0 ? (
          <p>No transaction details found.</p>
        ) : (
          <>
            <div className="fixed" style={{ textAlign: 'left' }}>
              {transactionDetails.map((transaction, index) => (
                <div key={index} className="transaction-item" style={{ marginBottom: '20px' }}>
                  <p className="item">
                    <strong>Classification:</strong> {renderProperty(transaction.classification.classificationName)}
                  </p>
                  <p className="item">
                    <strong>Description:</strong> {renderProperty(transaction.description.descriptionName)}
                  </p>
                  <p className="item1">
                    <strong>Transaction Name:</strong> {transaction.transactionName}
                  </p>
                  <p className="item" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    <strong>Token:</strong> {renderProperty(transaction.token)}
                  </p>
                  <hr style={{ margin: '10px 0', border: 'none', borderBottom: '1px solid #ccc' }} />
                </div>
              ))}
            </div>
            <button
              onClick={handleDownloadJSON}
              className="download-button"
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              Download JSON
            </button>
            <button
              onClick={handleDownloadCSV}
              className="download-button"
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                margin: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              Download CSV
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
