import React from 'react';

function Footer() {
  return (
    <div className="footer">
      <div className='footer__content'>
        <div className='link_container'>
        <a href="" className='linnk'>User Agreement</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="" className='linnk'>FAQS</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="" className='linnk'>About Meta</a>
        </div>
      </div>
      <div>
      <p className='p1'>&copy; Meta Tool {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default Footer;
