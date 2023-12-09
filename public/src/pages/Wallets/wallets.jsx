import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import './style.css'
import SuccessPage from '../Transaction/Success/Success'

const Wallets = () => {
  return (
    <div className='wallets'>
        <Navbar/>
        <div>
    <SuccessPage/>
        </div>
      </div>
  )
}

export default Wallets