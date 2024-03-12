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
          <button className="transactbtn" style={{ marginLeft: '10px', padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Transact</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
