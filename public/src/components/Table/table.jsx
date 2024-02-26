import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAppContext } from '../Context/AppProvider';
import './table.css';
import { SERVER_URL } from '../../../constants';

function Table() {
  const navigate = useNavigate();
  const { transactions, updateTransactions } = useAppContext();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${SERVER_URL}/api/getRecipientTransactions`, {
          method: 'GET', // Specify the HTTP method
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }),
        });

        if (response.ok) {
          const transactionD = await response.json();
          console.log('Transactions from API:', transactionD);
          const transactions = transactionD.transactions;
          updateTransactions(transactions);
          setDataLoaded(true);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (index) => {
    const selected = transactions[index];
    setSelectedTransaction(selected);
    console.log('Download action for index:', index);
    navigate(`/download/${index}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {dataLoaded && (
        <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '1px' }}>
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
            {transactions?.map((transaction, index) => (
              <tr key={index} onClick={() => handleRowClick(index)} className="clickable-row">
                {/* Adjust these fields based on your actual transaction data */}
                <td>{transaction.transactionName}</td>
                <td>{transaction.recipientName}</td>
                <td>{transaction.token}</td>
                <td>{transaction.classification}</td>
                <td>{transaction.description}</td>
                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
