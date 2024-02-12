import React from 'react';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
    <div className='logo'>
    <a href="home">
    <img src="/logoside.png" alt="Your Image"  width='190px' height='50px'/>
    </a>
    </div>
    <Icon icon="mingcute:user-4-line" className='icon' width='38px' height='38px' />
    </div>
  );
}

export default Navbar;
