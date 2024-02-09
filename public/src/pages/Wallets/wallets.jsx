import React from 'react'
 import Navbar from '../../components/Navbar/Navbar'
import './style.css'
import Table from '../../components/Table/table';
import Form6 from '../Transaction/Form6/Form6';

const Wallets = () => {
  return (
    <div className='wallets'>
        <Navbar/>
        <Form6/>
      </div>
  )
}

export default Wallets