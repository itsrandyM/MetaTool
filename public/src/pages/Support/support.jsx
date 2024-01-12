import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AddTokenPage from '../Transaction/Form3/addToken'
import './style.css'

const Support = () => {
  return (
    <div className='main'>
    <Navbar/>
    <div className='main__content'>
      <AddTokenPage/>
    </div>
    </div>

  )
}

export default Support