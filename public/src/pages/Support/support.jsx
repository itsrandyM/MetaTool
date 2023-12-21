import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './style.css'
import ExchangeRateForm from '../Transaction/exchange/exchange'


const Support = () => {
  return (
    <div className='main'>
    <Navbar/>
    <ExchangeRateForm/>
    <div className='main__content'>
    </div>
    </div>

  )
}

export default Support