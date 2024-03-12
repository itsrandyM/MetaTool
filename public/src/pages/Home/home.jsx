import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/table';
import Navbar from '../../components/Navbar/Navbar';

const WelcomePage = () => {

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '0 20px' }}>
        <h2 style={{ color: 'black', fontSize: '20px', textAlign: 'center' }}>Welcome to Meta Tool</h2>
        <div style={{ maxWidth: '100%', overflowX: 'auto', marginTop: '20px', width: '100%' }}>
          <Table />
        </div>
      </div>
    </>


  );
}

export default WelcomePage;