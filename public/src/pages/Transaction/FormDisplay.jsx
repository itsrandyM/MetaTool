import React, { useState } from 'react';
import Form1 from './Form1';
import Form2 from './Form2';
import Form4 from './Form4';
import Form5 from './exchange';
import Form6 from './Form6/Form6';
import { FaPlusCircle } from 'react-icons/fa';

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
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="form-carousel" style={{}}>
          {currentForm === 1 && <Form1 onNextForm={handleNextForm} />}
          {currentForm === 2 && (
            <>
              <Form2 onNextForm={handleNextForm} />
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <FaPlusCircle style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => { /* Handle icon click here */ }} />
              </div>
            </>
          )}
          {currentForm === 4 && <Form4 formData={formData} />}
          {currentForm === 5 && <Form5 onNextForm={handleNextForm} />}
          {currentForm === 6 && <Form6 onNextForm={handleNextForm} />}
        </div>
      </div>    
    </>
  );
};

export default FormDisplay;
