// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './exchange.css';


// const Form5 = ({ onNextForm, tokens }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [exchangeRates, setExchangeRates] = useState({});

//   useEffect(() => {
//     // Initialize exchange rates for each token
//     const initialRates = {};
//     tokens.forEach(token => {
//       initialRates[token] = [];
//     });
//     setExchangeRates(initialRates);
//   }, [tokens]);

//   const handleNextForm = () => {
//     // Proceed to the next form
//     if (currentIndex === tokens.length - 1) {
//       if (Object.values(exchangeRates).every(rates => rates.length > 0)) {
//         const formData = {
//           exchangeRates: exchangeRates
//         };
//         onNextForm(4, formData);
//       } else {
//         toast.error('Please enter exchange rates for all tokens.', {
//           position: "bottom-right",
//           autoClose: 8000,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "light",
//         });
//       }
//     } else {
//       setCurrentIndex(prevIndex => prevIndex + 1);
//     }
//   };

//   const handlePrevForm = () => {
//     // Move to the previous form
//     if (currentIndex > 0) {
//       setCurrentIndex(prevIndex => prevIndex - 1);
//     }
//   };

//   const handleRateChange = (token, index, field, value) => {
//     const updatedRates = { ...exchangeRates };
//     updatedRates[token][index][field] = value;
//     setExchangeRates(updatedRates);
//   };

//   return (
//     <>
//       <h2>EXCHANGE RATES</h2>
//       <div className="form5_container">
//         <h2>{tokens[currentIndex].name}</h2>
//         {/* {exchangeRates[tokens[currentIndex].name] && exchangeRates[tokens[currentIndex].name].map((rate, index) => (
//           <div key={index}>
//             <p>Quote Currency: {rate.quote_currency}</p>
//             <p>Rate: {rate.rate}</p>
//             <p>Time: {rate.time}</p>
      
//           </div>
//         ))} */}
//         <div className="quote-currency-card">
//           <h3>Quote Currency</h3>
//           <input
//           className='input1'
//           type="text"
//           placeholder="Edit quote currency"
//           value={rate.quote_currency}
//           onChange={(e) => handleRateChange(tokens[currentIndex].name, index, 'quote_currency', e.target.value)}
        
//           />
//         </div>
//         <div className="rate-card">
//           <h3>Rate</h3>
//           <input
//           className='input2'
//           type="number"
//           placeholder="Edit rate"
//           value={rate.rate}
//           onChange={(e) => handleRateChange(tokens[currentIndex].name, index, 'rate', e.target.value)}
//         />
//         </div>
//         <div className="time-card">
//           <h3>Time</h3>
//           <input
//             type="text"
//             placeholder="Edit time"
//             value={rate.time}
//             onChange={(e) => handleRateChange(tokens[currentIndex].name, index, 'time', e.target.value)}
//           />
//         </div>
//         <div>
//           <button onClick={handlePrevForm} disabled={currentIndex === 0}>
//             Previous
//           </button>
//           <button onClick={handleNextForm} className="authentic">
//             {currentIndex === tokens.length - 1 ? 'Continue' : 'Next'}
//           </button>
//         </div>
//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default Form5;
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './exchange.css';
import { useTokenContext } from '../../../../constants/TokenContext';

const Form5 = ({ onNextForm}) => {
  const { tokens } = useTokenContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const initialRates = {};
    tokens.forEach(token => {
      initialRates[token.name] = [{  base_currency: token.name, quote_currency: 'USD', rate: '', time: '' }];
    });
    setExchangeRates(initialRates);
  }, [tokens]);

  const handleNextForm = () => {
    // Proceed to the next form
    if (currentIndex === tokens.length - 1) {
      if (Object.values(exchangeRates).every(rates => rates.length > 0)) {
        const formData = {
          exchangeRates: exchangeRates
        };
        onNextForm(4, formData);
      } else {
        toast.error('Please enter exchange rates for all tokens.', {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevForm = () => {
    // Move to the previous form
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleRateChange = (token, index, field, value) => {
    const updatedRates = { ...exchangeRates };
    updatedRates[token][index][field] = value;
    setExchangeRates(updatedRates);
  };

  return (
    <>
      <h2>EXCHANGE RATES</h2>
      <div className="form5_container">
        <h2>{tokens[currentIndex].name}</h2>
        
        {exchangeRates[tokens[currentIndex].name] && exchangeRates[tokens[currentIndex].name].map((rate, index) => (
          <div key={index}>
            <div className="quote-currency-card">
              <h3>Quote Currency</h3>
              <input
                type="text"
                value={rate.quote_currency}
                onChange={(e) => handleRateChange(tokens[currentIndex].name, index, 'quote_currency', e.target.value)}
              />
            </div>
            <div className="rate-card">
              <h3>Rate</h3>
              <input
                type="text"
                value={rate.rate}
                onChange={(e) => handleRateChange(tokens[currentIndex].name, index, 'rate', e.target.value)}
              />
            </div>
            <div className="time-card">
              <h3>Time</h3>
              <input
                type="text"
                value={rate.time}
                onChange={(e) => handleRateChange(tokens[currentIndex].name, index, 'time', e.target.value)}
              />
            </div>
          </div>
        ))}
  
        <div>
          <button onClick={handlePrevForm} disabled={currentIndex === 0}>
            Previous
          </button>
          <button onClick={handleNextForm} className="authentic">
            {currentIndex === tokens.length - 1 ? 'Continue' : 'Next'}
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
  
};

export default Form5;
