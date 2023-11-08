import React, { useState } from 'react';
import './style.css'; 
import SignUpForm from './signUp/SignUp'; 
import LoginForm from './logIn/logIn';
import Nav from './Navbar/nav';
import Foot from '../Transaction/Foot/foot';

function AuthenticationPage() {
  const [isSignUp, setIsSignUp] = useState(false); // Use state to toggle between sign-up and login forms

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      <Nav/>
    <section className="auth-background">
      <div className="auth-container">
        <div className="switch-container">
          <label className="switch">
            <input type="checkbox" checked={isSignUp} onChange={toggleForm} />
            <span className="slider round"></span>
          </label>
        </div>
        {isSignUp ? <SignUpForm /> : <LoginForm />}
      </div>
    </section>
    <Foot/>
    </div>

  );
}

export default AuthenticationPage;
