import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/table';
import Navbar from '../../components/Navbar/Navbar';
// import { SERVER_URL } from '../../../constants';

const WelcomePage = () => {
  const [userName, setUserName] = useState('');
  const [position, setPosition] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  
  useEffect(() => {
    // Simulate data retrieval from a server
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

    setUserName(storedUserName || "User");
    setPosition(storedPosition || "Employee");
    setAccountBalance(null);
  }, []);

  return (
    <>
    <Navbar/>
    <div style={{ display: 'block', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100vh' }}>
      <h2 style={{ color: 'black', fontSize: '20px', marginLeft: '42%' }}>Welcome to Meta Tool</h2>
      <div>
        <Table />
      </div>
    </div>    
    </>

  );
}

export default WelcomePage;