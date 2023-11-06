import React from 'react';

const Form3 = () => {
  return (
    <div className="form">
    <h2>Token</h2>
    <form>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" className="fixed-width" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Classification:</label>
        <input type="email" id="email" name="email" className="fixed-width" />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Description:</label>
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

export default Form3;
