import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './style.css';

function Table() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulate fetching data from the server
    const fetchData = async () => {
      try {
        // Replace this with the actual data retrieval logic
        const response = await fetch('http://localhost:4000/api/addTransactions');
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs once on component mount

  return (
    <div>
      <div className='tittle'>
        <h6>Recent Transactions</h6>
        <div className='navigate'>
          <button className='tran' onClick={() => navigate('/form-display')}>
            <tittle className='title'> New Transaction</tittle>
            <Icon icon="icomoon-free:new-tab" className='icon1' />
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Transaction Name</th>
            <th>Recipient</th>
            <th>Token</th>
            <th>Classification</th>
            <th>Description</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              {/* Adjust these fields based on your actual transaction data */}
              <td>{transaction.transactionName}</td>
              <td>{transaction.recipientName}</td>
              <td>{transaction.token}</td>
              <td>{transaction.classification}</td>
              <td>{transaction.description}</td>
              <td>{transaction.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
