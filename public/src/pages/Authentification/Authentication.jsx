import React, { useState } from 'react';
import './style.css'; 
import LoginForm from './logIn/logIn';
import Foot from '../Transaction/Foot/foot';

function AuthenticationPage() {

  return (
    <div>
    <section className="auth-background">
      <div className="auth-container">
        <div className="switch-container">
        </div>
         <LoginForm />
      </div>
    </section>
    <Foot/>
    </div>

  );
}

export default AuthenticationPage;
