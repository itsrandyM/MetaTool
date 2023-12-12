import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/table';
import Navbar from '../../components/Navbar/Navbar' 
import Footer from '../../components/Footer/footer';
import Carousel from '../../components/carousel/carousel';
import './style.css'
//import { SERVER_URL } from '../../../constants';

const WelcomePage = () => {
  const [userName, setUserName] = useState('');
  const [position, setPosition] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  // Simulate data retrieval from a server
  useEffect(() => {
    // You would replace these with actual API calls
    /* const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/users/${id}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user data')}

          const user = data.user 
    
    setUserName(user.username);
    setPosition(user.roles[0]);
    setAccountBalance(100000);} 
    catch(error){
      console.error('Error fetching data',error.message)
    } */
    
    const storedUserName = localStorage.getItem('userName');
    const storedPosition = localStorage.getItem('position')

    setUserName(storedUserName || 'User');
    setPosition(storedPosition || 'CEO');
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
