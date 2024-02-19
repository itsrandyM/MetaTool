import React from 'react'
 import Navbar from '../../components/Navbar/Navbar'
import './style.css'
import Table from '../../components/Table/table';
import Form5 from '../Transaction/exchange/exchange';

const Wallets = () => {
  return (
    <div className='wallets'>
        <Navbar/>
        <Form5/>
      </div>
  )
}

export default Wallets