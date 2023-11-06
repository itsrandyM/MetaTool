import React from 'react';
import './FormCarousel.css'; // Import the CSS file

const Form1 = () => {
  return (
    <div className="form">
      <h2>New Transaction</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" className="fixed-width" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            className="fixed-width"
          />
        </div>
      </form>
    </div>
  );
};

export default Form1;
