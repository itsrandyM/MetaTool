import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../constants';
import axios from 'axios';
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

  };
  const convertToCSV = (data) => {
    // Convert transaction details to CSV format
    const header = 'Recipient address, Amount';
    const rows = data.map((transaction) => {
      const recipient = transaction.recipients['0'];

      const amount = transaction.token['0'].tokenName['0'].amount; // Potential source of error
      return `${recipient.wallet},${amount}`;
    });
    return [header, ...rows].join('\n');
  };

  const handleContinue = () => {
    const jsonData = JSON.stringify(transactionDetails, null, 2);
    const formDataFromForm4 = JSON.parse(localStorage.getItem('formDataFromForm4'))
    const formData = {
      transactionDetails: transactionDetails,
      jsonData: jsonData
    };

    navigate('/form6', { state: { formData } }); // Ensure formData is wrapped inside an object
  };



  const renderProperty = (property) => {
    if (typeof property === 'object') {
      return JSON.stringify(property);
    }
    return property;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh', // Set the height to full viewport height
      width: '100%', // Set the width to full viewport width

    }}>
      <div
        className="Download_container"
        style={{
          padding: '20px',
          color: 'black',
          borderRadius: '10px',
          backgroundColor: '#f2eee3',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          width: '35%', // Set the width to 80% of the viewport width
          maxWidth: '800px', // Reduced width
          textAlign: 'center', // Center the buttons horizontally
          margin: '0 auto', // Center the container horizontally
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
                    <strong>Classification:</strong> {renderProperty(transaction.classification)}
                  </p>
                  <p className="item">
                    <strong>Description:</strong> {renderProperty(transaction.description)}
                  </p>
                  <p className="item1">
                    <strong>Transaction Name:</strong> {transaction.transaction}
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
                backgroundColor: '#6B8065',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.1s ease', // Added transform transition
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Added boxShadow for the pop effect
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} // Increase scale on hover
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'} // Reset scale when not hovered
              onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'} // Decrease scale when clicked
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'} // Reset scale when click released
            >
              Download
            </button>
            <button
              onClick={handleContinue}
              className="download-button"
              style={{
                backgroundColor: '#6B8065',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                marginLeft: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.1s ease', // Added transform transition
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Added boxShadow for the pop effect
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} // Increase scale on hover
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'} // Reset scale when not hovered
              onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'} // Decrease scale when clicked
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'} // Reset scale when click released
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
