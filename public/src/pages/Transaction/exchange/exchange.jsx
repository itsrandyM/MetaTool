import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './exchange.css';

const Form5 = ({ onNextForm }) => {
  const [exchangeRate, setExchangeRate] = useState('');
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleNext = () => {
    // Validate fields before moving to the next form
    if (exchangeRate) {
      const pattern = /"([^"]+)":\s*"([^"]+)"/g;
      const extractedValues = {} 

      let match;
      while ((match = pattern.exec(exchangeRate)) !== null) {
        // match[1] contains the key, match[2] contains the value
        extractedValues[match[1]] = match[2];
      }

if(
  extractedValues.base_currency &&
      extractedValues.quote_currency &&
      extractedValues.rate &&
      extractedValues.time
)     {


      const formData = {
        exchangeRate: {
          base_currency: extractedValues.base_currency,
          quote_currency: extractedValues.quote_currency,
          rate: extractedValues.rate,
          time: extractedValues.time
        }
      };
      onNextForm(4, formData);
    } else {
      toast.error('Please enter the exchange rate.', toastOptions);
    }
  }};

  return (
    <div className="form5_container">
      <h2>Exchange Rate Details</h2>
      <textarea
        className="big-textbox"
        placeholder="Enter exchange rate"
        value={exchangeRate}
        onChange={(e) => setExchangeRate(e.target.value)}
      />
      <button onClick={handleNext} className="authentic">
        Continue
      </button>
      <ToastContainer />
    </div>
  );
};

export default Form5;
// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './exchange.css';

// const Form5 = ({ onNextForm }) => {
//   const [exchangeRates, setExchangeRates] = useState([]);
//   const [newExchangeRate, setNewExchangeRate] = useState('');
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "light",
//   };

//   const handleAddExchangeRate = () => {
//     // Validate the new exchange rate before adding
//     if (exchangeRates) {
//       const pattern = /"([^"]+)":\s*"([^"]+)"/g;
//       const extractedValues = {} 

//       let match;
//       while ((match = pattern.exec(newExchangeRate)) !== null) {
//         extractedValues[match[1]] = match[2];
//       }

//       if (
//         extractedValues.base_currency &&
//         extractedValues.quote_currency &&
//         extractedValues.rate &&
//         extractedValues.time
//       ) {
//         setExchangeRates([...exchangeRates, extractedValues]);
//         setNewExchangeRate('');
//       } else {
//         toast.error('Please enter a valid exchange rate.', toastOptions);
//       }
//     } else {
//       toast.error('Please enter the exchange rate.', toastOptions);
//     }
//   };

//   const handleNext = () => {
//     // Proceed to the next form with all the exchange rates

//     // Proceed to the next form with all the exchange rates
//     if (exchangeRates.length > 0) {
//       const formData = {
//         exchangeRates: exchangeRates
//       };
//       onNextForm(4, formData);
//     } else {
//       toast.error('Please enter at least one exchange rate.', toastOptions);
//     }
//   };

//   return (
//     <div className="form5_container">
//       <h2>Exchange Rate Details</h2>
//       <div>
//         {exchangeRates.map((rate, index) => (
//           <div key={index}>
//             <p>Base Currency: {rate.base_currency}</p>
//             <p>Quote Currency: {rate.quote_currency}</p>
//             <p>Rate: {rate.rate}</p>
//             <p>Time: {rate.time}</p>
//           </div>
//         ))}
//       </div>
//       <textarea
//         className="big-textbox"
//         placeholder="Enter exchange rate"
//         value={newExchangeRate}
//         onChange={(e) => setNewExchangeRate(e.target.value)}
//       />
//       <button onClick={handleAddExchangeRate} className="authentic">
//         Add Exchange Rate
//       </button>
//       <button onClick={handleNext} className="authentic">
//         Continue
//       </button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Form5;
