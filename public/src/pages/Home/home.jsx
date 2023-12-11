import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/table';
import Navbar from '../../components/Navbar/Navbar' 
import Footer from '../../components/Footer/footer';
import Carousel from '../../components/carousel/carousel';
import './style.css'

const WelcomePage = () => {
  const [userName, setUserName] = useState('');
  const [position, setPosition] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  // Simulate data retrieval from a server
  useEffect(() => {
    // You would replace these with actual API calls
    
    const storedUserName = localStorage.getItem('userName');
    const storedPosition = localStorage.getItem('position')

    setUserName(storedUserName || 'Default username');
    setPosition(storedPosition || 'default position');
    setAccountBalance(100000);
  }, []);

  return (
    <div className='home-page'>
      <Navbar/>
      <div className='content'>
      <h2>Welcome to Meta Tool</h2>
      <p>{userName} : {position}</p>
      <h3>Account Balance:</h3>
      <h6 className='h6'>${accountBalance}</h6>
      </div>
      <div>
      <Table/>
      </div>
     <Footer/>
    </div>
  );
}

export default WelcomePage;
