import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAppContext } from '../Context/AppProvider';
import './style.css';

function Table() {
  const navigate = useNavigate();
  const { transactions, updateTransactions } = useAppContext();
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:4000/api/getRecipientTransactions',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const transactionD = await response.json();
          console.log('Transactions from API:', transactionD)
            const transactions = transactionD.transactions
          updateTransactions(transactions);
          setDataLoaded(true)
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [updateTransactions]);

  console.log('Transactions:', transactions)

  return (
    <div>
      <div className='tittle'>
        <h6>Recent Transactions</h6>
        <div className='navigate'>
          <button className='tran' onClick={() => navigate('/form-display')}>
            <title className='title'> New Transaction</title>
            <Icon icon="icomoon-free:new-tab" className='icon1' />
          </button>
        </div>
      </div>
      {dataLoaded && (
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
          {transactions?.map((transaction, index) => (
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
      </table> )}
    </div>
  );
}

export default Table;
