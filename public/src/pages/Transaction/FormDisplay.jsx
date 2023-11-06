import React, { useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Foot from './Foot/foot'
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import './FormCarousel.css'
const FormDisplay = () => {
  const [activeForm, setActiveForm] = useState(1);

  const handleNextForm = () => {
    setActiveForm((prevForm) => (prevForm % 4) + 1);
  };

  const renderForm = () => {
    switch (activeForm) {
      case 1:
        return <Form1 />;
      case 2:
        return <Form2 />;
      case 3:
        return <Form3 />;
      case 4:
        return <Form4 />;
      default:
        return <Form1 />;
    }
  };

  return (
    <div>
        <Navbar/>
    <div className="form-carousel">
      {renderForm()}
    <button onClick={handleNextForm}>Next Form</button>
    </div>
    <div className='foot'>
    <Foot/> 
    </div>
    </div>
    
  );
};

export default FormDisplay;
