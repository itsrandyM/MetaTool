import React from 'react';
import './Foot.css'; // Replace 'Footer.css' with your CSS file's path

function Foot() {
  return (
    <div className="foot">
      <div className='foot__content'>
        <div className='linkk_container'>
        <a href="" className='linnk'>User Agreement</a>
        &nbsp;&nbsp;
        <a href="" className='linnk'>FAQS</a>
        &nbsp;&nbsp;
        <a href="" className='linnk'>About Meta</a>
        </div>
      </div>
      <div>
      <p className='p1'>&copy; Meta Tool {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default Foot;
