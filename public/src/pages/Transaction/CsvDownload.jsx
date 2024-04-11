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

  function goToHomepage() {
    navigate('/home'); // Change '/' to the path of your homepage if it's different
  }

  function processDataForCsv(verifiedData) {
    // Your processDataForCsv function implementation
    // This function remains unchanged
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
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
          <div>
            <button
              onClick={downloadCsv}
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
              Download CSV file
            </button>
            <button
              onClick={goToHomepage}
              className="homepage-button"
              style={{
                backgroundColor: '#6B8065',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginLeft: '10px',
                transition: 'background-color 0.3s ease, transform 0.1s ease', // Added transform transition
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Added boxShadow for the pop effect
                marginTop: '20px', // Added margin top to separate buttons
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} // Increase scale on hover
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'} // Reset scale when not hovered
              onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'} // Decrease scale when clicked
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'} // Reset scale when click released
            >
              Go to Homepage
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvDetails;
