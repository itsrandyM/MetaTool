import React, { useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Foot from './Foot/foot';
import Form1 from './Form1/Form1';
import Form2 from './Form2/Form2';
import Form3 from './Form3/Form3';
import Form4 from './Form4/Form4';

const FormDisplay = () => {
  const [currentForm, setCurrentForm] = useState(1);

  const handleNextForm = (nextForm) => {
    setCurrentForm(nextForm);
  };

  const renderForm = (formNumber) => {
    switch (formNumber) {
      case 1:
        return <Form1 onNextForm={handleNextForm} />;
      case 2:
        return <Form2 onNextForm={handleNextForm} />;
      case 3:
        return <Form3 onNextForm={handleNextForm} />;
      case 4:
        return <Form4 />;
      default:
        return <Form1 onNextForm={handleNextForm} />;
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="form-carousel">
      {renderForm(currentForm)}
    </div>
    <Foot/>
    </div>

  );
};

export default FormDisplay;
