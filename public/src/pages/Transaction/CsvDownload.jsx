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

const CsvDetails = () => {
  const navigate = useNavigate();
  const [csvfileDetails, setCsvfileDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  async function downloadCsv() {
    try {
      const response = await fetch(`${SERVER_URL}/api/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log(data)
  
      if (data.success) {
        const csvData = processDataForCsv(data.verifiedData); 
        const csvString = Papa.unparse(csvData); 
  
        const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
        const csvUrl = URL.createObjectURL(csvBlob);
  
        const link = document.createElement('a');
        link.href = csvUrl;
        link.download = 'Transcation.csv';
        link.click();
  
        URL.revokeObjectURL(csvUrl); 
      } else {
        console.error('Could not receive data from databse. Please try again', error)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  }



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


  function processDataForCsv(verifiedData) {
    // Get current date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  
    // Define CSV headers (column names) including the current date and Recipient
    const headers = ['Date', 'Recipient', 'Classification', 'Base Currency', 'Quote Currency', 'Rate',  'Wallet', 'Currency Name', 'Currency Amount', 'USD Rate', 'USD Amount'];
  
    let rows = [];
    verifiedData.forEach(item => {
      const recipients = item.recipients || [];
  
      recipients.forEach(recipient => {
        const exchangeRate = item.exchangeRates && item.exchangeRates[0] ? item.exchangeRates[0] : {};
  
        const rowData = [
          currentDate,
          recipient.name || '',
          item.classification || '',
          exchangeRate.base_currency || '',
          exchangeRate.quote_currency || '',
          exchangeRate.rate || '',
          recipient.wallet || '',
          item.Currency ? item.Currency.localCurrencyName || '' : '',
          item.Currency ? item.Currency.localCurrencyAmount || '' : '',
          item.Currency ? item.Currency.localCurrencyUsdRate || '' : '',
          item.Currency ? item.Currency.localCurrencyUsdAmount || '' : ''
        ];
  
        rows.push(rowData);
      });
    });
  
    const csvData = [headers, ...rows];
    return csvData;
  }
    // const headers = ['Recipient Address']
    // const csvRows = [];
    // const recipientData = verifiedData.RecipientData; // Access RecipientData
  
    // // Extract data excluding recipients array
    // const baseData = {
    //   ...verifiedData, // Spread operator for all verifiedData properties
    //   RecipientData: { // Exclude recipients and keep other RecipientData fields
    //     exchangeRates: recipientData.exchangeRates,
    //     classification: recipientData.classification,
    //     // ... other fields from RecipientData (excluding recipients)
    //   },
    // };
  
    // // Loop through each recipient
    // recipientData.recipients.forEach(recipient => {
    //   const rowData = {
    //     ...baseData, // Include base data for all recipients
    //     // Add recipient specific details here (e.g., recipient.name, recipient.address)
    //   };
    //   csvRows.push(rowData);
    // });
  
    // return csvRows;
  }

  const renderProperty = (property) => {
    if (typeof property === 'object') {
      return JSON.stringify(property);
    }
    return property;
  };

  return (
    <div style={{ textAlign: 'center' }}>
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
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Csv Details</h2>
        {loading ? (
          <Lottie options={defaultOptions} width={50} height={50} />
        ) : csvfileDetails.length === 0 ? (
          <p>No CSV details found.</p>
        ) : (
          <>
            <button
              onClick={downloadCsv}
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
              Download CSV file
            </button>
          </>
        )}
      </div>
    </div>
  );
;

export default CsvDetails;
