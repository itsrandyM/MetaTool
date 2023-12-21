import React from 'react';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
    <div className='logo'>
    <a href="home">
    <img src="/img/logoside.png" alt="Your Image"  width='190px' height='50px'/>
    </a>
    </div>
    <div className='link'>
    <NavLink to='/home' className='a'>Home</NavLink>
    &nbsp; &nbsp;
    <NavLink to='/wallets' className='a'>Wallets</NavLink>
    &nbsp; &nbsp;  
    <NavLink to='/support' className='a'>Support</NavLink>
    &nbsp; &nbsp; 
  
    </div>
    <Icon icon="mingcute:user-4-line" className='icon' width='38px' height='38px' />
    </div>
  );
}

export default Navbar;
