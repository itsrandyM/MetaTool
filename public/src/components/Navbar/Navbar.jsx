import React from 'react'
import './nav.css'
import { Icon } from '@iconify/react';

const Navbar = () => {
  return (
    <div className='nav'>
      <div>
        <img src="../public/img/logoside.png"
         alt="logo"
         width='160px'
        />
      </div>
      <div className='nav1'>
      <a href="">Home</a>
      <a href="">Wallets</a>
      <a href="">Settings</a>
      </div>
    </div>
  )
}

export default Navbar