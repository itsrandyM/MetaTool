import React from 'react';
import './style.css'

function WelcomePage({ username, ammount }) {
  return (
    <div className='container'>
        <div className='containe_wel'>
        <h2>Welcome to Meta Tool</h2>
        <p><span>{username}Raymond</span></p>
        </div>
        <div className='container_account'>
            <h5>Accont Balance: <br />{ ammount } 0.00$</h5>
            <button>New Transaction</button>
        </div>
     
    </div>
    
  );
}

export default WelcomePage;
