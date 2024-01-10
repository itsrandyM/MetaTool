import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Foot from './Foot/foot';
import Form1 from './Form1/Form1';
import Form5 from './exchange/exchange'
import Form2 from './Form2/Form2';
import Form3 from './Form3/Form3';
import Form4 from './Form4/Form4'; // Assuming you have the new form component

const FormDisplay = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formData, setFormData] = useState({
    form1data : {},
    form2data : {},
    form3data : {},
    form5data : {}
  })
  //const [form1Data, setForm1Data] = useState({});
  //const [form2Data, setForm2Data] = useState({});
  //const [form3Data, setForm3Data] = useState({});

  /*const handleForm1Submit = (data) => {
    console.log('FORM1:',data)
    setForm1Data(data);
    // Move to the next form
    handleNextForm(1,data);
  };
  const handleForm2Submit = (data) => {
    console.log('form2Data', data)
    setForm2Data(data);
    // Move to the next form
    handleNextForm(2,data);
  };

  const handleForm3Submit = (data) => {
 console.log(data)
    setForm3Data(data);
    // Move to the next form
    handleNextForm(3,data);
  }; */

  const handleNextForm = (nextForm, data) => {
    console.log('Received form${nextForm} data:',data)
    setFormData((prevData) => ({
      ...prevData,
      [`form${nextForm}Data`]:data,
    }))
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
      </div>
      {/* <Foot /> */}
    </div>
  );
};

export default FormDisplay;