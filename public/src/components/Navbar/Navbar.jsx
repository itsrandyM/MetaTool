import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className='logo'>
        <a href="home">
          <img src="/logoside.png" alt="Your Image" width='190px' height='50px'/>
        </a>
      </div>
      <div>
        <NavLink to="/form-display">
          <button className="transactbtn">Transact</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
