// FormDisplay.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Form1 from './Form1/Form1';
import Form5 from './exchange/exchange'
import Form2 from './Form2/Form2';
import Form3 from './Form3/Form3';
import Form4 from './Form4/Form4';
import Form6 from './Form6/Form6'; // Import Form6 component

const FormDisplay = () => {
  const [currentForm, setCurrentForm] = useState(1);  
  const [formData, setFormData] = useState({
    form1data: {},
    form2data: {},
    form3data: {
      token:[]
    },
    form5data: {}
  });

  const handleNextForm = (nextForm, data) => {
    console.log(`Received form${nextForm} data:`, data);
    setFormData((prevData) => ({
      ...prevData,
      [`form${nextForm}Data`]: data,
    }));
    setCurrentForm(nextForm);
  };

  return (
    <div>
      <Navbar />
      <div className="form-carousel">
        {currentForm === 1 && <Form1 onNextForm={handleNextForm} />}
        {currentForm === 2 && <Form2 onNextForm={handleNextForm} />}
        {currentForm === 3 && <Form3 onNextForm={handleNextForm} />}
        {currentForm === 5 && <Form5 onNextForm={handleNextForm} />}
        {currentForm === 4 && <Form4 formData={formData} />}
        {currentForm === 6 && <Form6 onNextForm={handleNextForm} />} {/* Render Form6 */}
      </div>
    </div>
  );
};

export default FormDisplay;
