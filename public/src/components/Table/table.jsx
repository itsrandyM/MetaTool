import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import './style.css'

function Table() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulate fetching data from the server
    const fetchData = async () => {
      try {
        // Replace this with the actual data retrieval logic
        const response = await fetch('/getTransactions');
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
      <a href=""><Icon icon="material-symbols-light:fiber-new-outline-rounded"  width='40px' height='40px'/></a>
      </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Admin User ID</th>
            <th>Recipient ID</th>
            <th>Token ID</th>
            <th>Classification ID</th>
            <th>Description ID</th>
            <th>Exchange Rate ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.adminUserID}</td>
              <td>{transaction.recipientID}</td>
              <td>{transaction.tokenID}</td>
              <td>{transaction.classificationID}</td>
              <td>{transaction.descriptionID}</td>
              <td>{transaction.exchangeRateID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
