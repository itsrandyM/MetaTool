import React from 'react'
// import Navbar from '../../components/Navbar/Navbar'
import './style.css'
import Table from '../../components/Table/table';

const Wallets = () => {
  return (
    <div className='wallets'>
        <Navbar/>
        <div>
          <Table/>
        </div>
      </div>
  )
}

export default Wallets