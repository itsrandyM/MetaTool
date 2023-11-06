import React, { useState } from 'react';
import './style.css'; // Import the CSS file for styling
import SignUpForm from './signUp/SignUp'; // Import the SignUpForm component
import LoginForm from './logIn/logIn'; // Import the LoginForm component

function AuthenticationPage() {
  const [isSignUp, setIsSignUp] = useState(true); // Use state to toggle between sign-up and login forms

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
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
  );
}

export default AuthenticationPage;
