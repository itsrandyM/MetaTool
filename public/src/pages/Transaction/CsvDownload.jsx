import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../constants';
import Papa from 'papaparse';
import animationData from '../../../public/load.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

const CsvDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    downloadCsv();
  }, []);

  async function downloadCsv() {
    try {
      const response = await fetch(`${SERVER_URL}/api/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
  
      if (data.success) {
        const csvData = processDataForCsv(data.verifiedData);
        const csvString = Papa.unparse(csvData);
  
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = 'transaction_details.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
  
        setLoading(false);
      } else {
        console.error('Could not receive data from database. Please try again', error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'An error occurred while downloading CSV.');
      setLoading(false);
    }
  }
  

  function processDataForCsv(verifiedData) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const headers = [
        'Date',
        'From wallet',
        'To whom',
        'Local currency',
        'Local amount',
        'Local-USD',
        'USD to be sent',
        'Stablecoin',
        'Stablecoin-USD',
        'USD-Stablecoin',
        'NCA',
        'NCA-USD',
        'USD-NCA',
        'Stablecoin sent',
        'NCA sent',
        'Tx fee',
        'Tx fee/tx',
        'Tx fee/tx(USD)',
        'Classification',
        'Tx ID',
    ];

    let rows = [];

    verifiedData.forEach(item => {
        const hash = item.Hash ? item.Hash.TXHash || '' : '';
        const wallet = item.Hash ? item.Hash.Wallet || '' : '';
        const recipientName =   item.RecipientData?.recipients?.[0]?.name || ''// Check if RecipientData and name exist
        const txFee = item.Fees ? item.Fees.TxFee || '' : '';
        const txFeePerRecipient = item.Fees ? item.Fees.TxPerRecipient || '' : '';
        const CurrencyName = item.Currency ? item.Currency.localCurrencyName || '' : ''
        const CurrencyAmount = item.Currency ? item.Currency.localCurrencyAmount || '' : '';
        const currencyUsd = item.Currency ? item.Currency.localCurrencyUsdRate || '' : ''
        const totalUSD = item.Currency ? item.Currency.localCurrencyUsdAmount || '' : ""
        const exchangeRate = item.RecipientData && item.RecipientData.exchangeRates.find(rate => rate.quote_currency === 'USD' && rate.stablecoin === true);
        const isNCA = exchangeRate && exchangeRate.NCA;
        const nca = isNCA ? exchangeRate.base_currency || '' : '';
        const NcaUsd = isNCA ? exchangeRate.rate || '' : '';
        const UsdNca = isNCA ? (1 / parseFloat(exchangeRate.rate)).toFixed(4) : '';
        const classification = item.RecipientData ? item.RecipientData.classification.classificationName || '' : '';
        const isStablecoin = exchangeRate && exchangeRate.stablecoin;
        const stablecoin = isStablecoin ? exchangeRate.base_currency || '' : ''
        const stablecoinUSD = isStablecoin ? exchangeRate.rate || '' : '';
        const UsdStablecoin = isStablecoin ? (1 / parseFloat(exchangeRate.rate)).toFixed(4) : '';
        const TotalSC = stablecoinUSD * totalUSD
        const TotalNCA = NcaUsd * totalUSD
        const txFeePerRecipientUsd = txFeePerRecipient * NcaUsd

        const rowData = [
            currentDate,
            wallet,
            recipientName,
            CurrencyName,
            CurrencyAmount,
            currencyUsd,
            totalUSD,
            stablecoin,
            stablecoinUSD,
            UsdStablecoin,
            nca,
            NcaUsd,
            UsdNca,
            TotalSC,
            TotalNCA,
            txFee,
            txFeePerRecipient,
            txFeePerRecipientUsd,
            classification,
            hash,
        ];

        rows.push(rowData);
    });

    return [headers, ...rows];
}

  
  
  
  

  
  
  const renderProperty = property => {
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
          color: 'black',
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
};

export default CsvDetails;

// import React, { useState, useEffect } from 'react';
// import Lottie from 'react-lottie';
// import { useNavigate } from 'react-router-dom';
// import { SERVER_URL } from '../../../constants';
// // import axios from 'axios';
// import animationData from '../../../public/load.json';
// import Papa from 'papaparse';

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
// };

// const CsvDetails = () => {
//   const navigate = useNavigate();
//   const [csvfileDetails, setCsvfileDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null)


// useEffect(() => {
// downloadCsv()
// },[])

//   async function downloadCsv() {
//     try {
//       const response = await fetch(`${SERVER_URL}/api/details`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }
//       const data = await response.json();
//       console.log(data)
  
//       if (data.success) {
//         const csvData = processDataForCsv(data.verifiedData); 
//         const csvString = Papa.unparse(csvData); 
  
//         const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
//         const csvUrl = URL.createObjectURL(csvBlob);
  
//         const link = document.createElement('a');
//         link.href = csvUrl;
//         link.download = 'Transcation.csv';
//         link.click();
  
//         URL.revokeObjectURL(csvUrl); 
//         setLoading(false)
//       } else {
//         console.error('Could not receive data from databse. Please try again', error)
//       }
//     } catch (error) {
      
//       console.error('Error fetching data:', error);
//       setError(error.message || 'An error occurred while downloading CSV.');
//       setLoading(false);      
//     }
//   }



//   // const convertToCSV = (data) => {
//   //   // Convert transaction details to CSV format
//   //   const header = 'Recipient address, Amount';
//   //   const rows = data.map((transaction) => {
//   //     const recipient = transaction.recipients['0'];
//   //     const amount = transaction.token['0'].tokenName['0'].amount;
//   //     return `${recipient.wallet},${amount}`;
//   //   });
//   //   return [header, ...rows].join('\n');
//   // };


//   function processDataForCsv(verifiedData) {
//     // Get current date
//     const currentDate = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit'
//     });
  
//     // Define CSV headers (column names) including the current date and Recipient
//     const headers = ['Date', 'From wallet', 'To whom', 'Local currency', 'Local amount', 'Local-USD', 'USD to be sent', 'Stablecoin','Stablecoin-USD','USD-Stablecoin','NCA','NCA-USD','USD-NCA','Stablecoin sent','NCA sent','Classification', 'Tx ID'];
  
//     let rows = [];
//     verifiedData.forEach(item => {
//       const recipients = item.recipients || [];
//       const exchangeRates = item.exchangeRates || [];
  
//       recipients.forEach(recipient => {
//         exchangeRates.forEach(exchangeRate => {
//           const isStablecoin = exchangeRate.stablecoin === "true";
//           const isNCA = exchangeRate.NCA === "true";        
//         const hash = item.Hash ? item.Hash.TXHash || '' : '';
//         const wallet = item.Hash ? item.Hash.Wallet || '' : '';
//         // const currencyName = item.Currency ? item.Currency.localCurrencyName || '' : '';
//         // const currencyAmount = item.Currency ? item.Currency.localCurrencyAmount || '' : '';
//         // const usdRate = item.Currency ? item.Currency.localCurrencyUsdRate || '' : '';
//         // const usdAmount = item.Currency ? item.Currency.localCurrencyUsdAmount || '' : '';
//         const stablecoinUSDValue = isStablecoin ? parseFloat(exchangeRate.amount) : null;
//         const ncaUSDValue = isNCA ? parseFloat(exchangeRate.amount) : null;

  
//         const rowData = [
//           currentDate,
//           wallet,
//           recipient.name || '',
//           item.Currency ? item.Currency.localCurrencyName || '' : '',
//           item.Currency ? item.Currency.localCurrencyAmount || '' : '',
//           item.Currency ? item.Currency.localCurrencyUsdRate || '' : '',
//           item.Currency ? item.Currency.localCurrencyUsdAmount || '' : '',
//           isStablecoin ? exchangeRate.base_currency || '' : '',
//           isStablecoin ? exchangeRate.rate || '' : '',
//           isStablecoin ? (1 / parseFloat(exchangeRate.rate)).toFixed(4) : '',
//           isNCA ? exchangeRate.base_currency || '' : '',
//           isNCA ? exchangeRate.rate || '' : '',
//           isNCA ? (1 / parseFloat(exchangeRate.rate)).toFixed(4) : '',
//           isStablecoin && stablecoinUSDValue !== null ? (parseFloat(exchangeRate.rate) * stablecoinUSDValue).toFixed(4) : '',
//           isNCA && ncaUSDValue !== null ? (parseFloat(exchangeRate.rate) * ncaUSDValue).toFixed(4) : '',          
//           item.classification || '',
//           hash
//         ];
  
//         rows.push(rowData );
//       });
//     });
  
//     const csvData = [headers, ...rows];
//     return csvData;
//   },}

//   const renderProperty = (property) => {
//     if (typeof property === 'object') {
//       return JSON.stringify(property);
//     }
//     return property;
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <div
//         className="Download_container"
//         style={{
//           padding: '20px',
//           color:'black',
//           borderRadius: '10px',
//           backgroundColor: '#f2eee3',
//           boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
//           margin: '40px auto',
//           maxWidth: '400px', // Reduced width
//         }}
//       >
//         <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Csv Details</h2>
//         {loading ? (
//           <Lottie options={defaultOptions} width={50} height={50} />
//         ) : csvfileDetails.length === 0 ? (
//           <p>No CSV details found.</p>
//         ) : (
//           <>
//             <button
//               onClick={downloadCsv}
//               className="download-button"
//               style={{
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '5px',
//                 margin: '10px',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.3s ease',
//               }}
//             >
//               Download CSV file
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
//             };

// export default CsvDetails;

// function processDataForCsv(verifiedData) {
//   const currentDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   });

//   const headers = [
//     'Date',
//     'From wallet',
//     'To whom',
//     'Local currency',
//     'Local amount',
//     'Local-USD',
//     'USD to be sent',
//     'Stablecoin',
//     'Stablecoin-USD',
//     'USD-Stablecoin',
//     'NCA',
//     'NCA-USD',
//     'USD-NCA',
//     'Stablecoin sent',
//     'NCA sent',
//     'Classification',
//     'Tx Fee',
//     'Tx ID',
//   ];

//   let rows = [];
//   const item = verifiedData[0]; // Assuming verifiedData contains one object

// if (!item) {
//   return [headers]; // Return only headers if no data
// }

//     const recipients = item.recipients || [];
//     const exchangeRates = item.exchangeRates || [];

//     recipients.forEach(recipient => {
//       exchangeRates.forEach(exchangeRate => {
//         const isStablecoin = exchangeRate.stablecoin === 'true';
//         const isNCA = exchangeRate.NCA === 'true';
//         const hash = item.Hash ? item.Hash.TXHash || '' : '';
//         const wallet = item.Hash ? item.Hash.Wallet || '' : '';
//         const stablecoinUSDValue = isStablecoin ? parseFloat(exchangeRate.rate) : null;
//         const ncaUSDValue = isNCA ? parseFloat(exchangeRate.rate) : null;

//         const rowData = [
//           currentDate,
//           wallet,
//           recipient.name || '',
//           item.Currency ? item.Currency.localCurrencyName || '' : '',
//           item.Currency ? item.Currency.localCurrencyAmount || '' : '',
//           item.Currency ? item.Currency.localCurrencyUsdRate || '' : '',
//           item.Currency ? item.Currency.localCurrencyUsdAmount || '' : '',
//           isStablecoin ? exchangeRate.base_currency || '' : '',
//           isStablecoin ? exchangeRate.rate || '' : '',
//           isStablecoin ? (1 / parseFloat(exchangeRate.rate)).toFixed(4) : '',
//           isNCA ? exchangeRate.base_currency || '' : '',
//           isNCA ? exchangeRate.rate || '' : '',
//           isNCA ? (1 / parseFloat(exchangeRate.rate)).toFixed(4) : '',
//           isStablecoin && stablecoinUSDValue !== null ? (parseFloat(exchangeRate.rate) * stablecoinUSDValue).toFixed(4) : '',
//           isNCA && ncaUSDValue !== null ? (parseFloat(exchangeRate.rate) * ncaUSDValue).toFixed(4) : '',
//           item.classification.classificationName || '',
//           item.Fees.TxFee,
//           hash,
//           // item.Fees ? item.Fees.TxFee || '',

//         ];

//         rows.push(rowData);
//       });
//     });
//   ;

//   const csvData = [headers, ...rows];
//   return csvData;
// }
// 