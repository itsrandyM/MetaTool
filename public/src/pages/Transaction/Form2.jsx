import React from 'react';
import { Icon } from '@iconify/react';

const Form2 = () => {
  return (
    <div className="form">
        <h2>Recipients Details</h2>
        {/* <div>
        <Icon icon="heroicons-outline:user-add" />
        </div> */}
    <form>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" className="fixed-width" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" className="fixed-width"/>
      </div>
      <div className="form-group">
        <label htmlFor="phone">Wallet Address:</label>
        <input type="tel" id="phone" name="phone" className="fixed-width"/>
      </div>
    </form>
  </div>
  );
};

export default Form2;
