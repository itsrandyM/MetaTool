import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Foot from './Foot/foot';
import Form1 from './Form1/Form1';
import Form2 from './Form2/Form2';
import Form3 from './Form3/Form3';
import Form4 from './Form4/Form4'; // Assuming you have the new form component

const FormDisplay = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [form2Data, setForm2Data] = useState({});
  const [form3Data, setForm3Data] = useState({});

  const handleForm2Submit = (data) => {
    setForm2Data(data);
    // Move to the next form
    handleNextForm(2,data);
  };

  const handleForm3Submit = (data) => {
    setForm3Data(data);
    // Move to the next form
    handleNextForm(3,data);
  };

  const handleNextForm = (nextForm, formData) => {
    console.log(formData)
    setCurrentForm(nextForm);
  };

  return (
    <div>
      <Navbar />
      <div className="form-carousel">
        {currentForm === 1 && <Form1 onNextForm={handleForm2Submit} />}
        {currentForm === 2 && <Form2 onNextForm={handleForm3Submit} />}
        {currentForm === 3 && <Form3 onNextForm={handleNextForm} />}
        {currentForm === 4 && <Form4 form2Data={form2Data} form3Data={form3Data} />}
      </div>
      <Foot />
    </div>
  );
};

export default FormDisplay;