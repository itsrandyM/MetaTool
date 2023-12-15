import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Form2.css';

const Form2 = ({ onNextForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const isNameValid = /^[a-zA-Z]{1,10}$/;;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isWalletValid = /^addr1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]+$/.test(wallet);



  const handleNext = () => {
    
    if (!name || !email || !wallet) {
      toast.error('All fields are required.', toastOptions);
      return;
    }
    // Validate fields before moving to the next form
    if (isNameValid && isEmailValid && isWalletValid) {
      const formData = {
        name,
        email,
        wallet
      }
      console.log('Form2 Data:',formData )
       onNextForm(3,formData);
    } else {
      if (!isNameValid) {
        toast.error('Invalid Name.', toastOptions);
      }
      if (!isEmailValid) {
        toast.error('Invalid email address.', toastOptions);
      }
      if (!isWalletValid) {
        toast.error('Invalid wallet address.', toastOptions);
      }
    }
  };

  //onUpdateData()

  return (
    <div className="form2_container">
      <div className="form2">
        <h2>Recipient Details</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="fixed-width"
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="fixed-width "
            />
          </div>
          <div className="form-group">
            <label htmlFor="wallet">Wallet Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="fixed-width "
            />
          </div>
        </form>
        <button onClick={handleNext} className="authentic">
          Continue
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Form2;
