import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/table';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import Carousel from '../../components/carousel/carousel';
import './style.css'

const WelcomePage = () => {
  const [userName, setUserName] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);

  // Simulate data retrieval from a server
  useEffect(() => {
    // You would replace these with actual API calls
    setUserName('Raymond');
    setAccountBalance(1000);
  }, []);

  return (
    <div className='home-page'>
      <Navbar/>
      <div className='content'>
      <h2>Welcome to Meta Tool</h2>
      <p>{userName}</p>
      <h3>Account Balance:</h3>
      <p>${accountBalance}</p>
      </div>
      <div>
        <Carousel/>
      </div>
      <div>
      <Table/>
      </div>
     <Footer/>
    </div>
  );
}

export default WelcomePage;
