import React, { useState, useEffect } from 'react';
import './carousel.css'; // Import the CSS file

const images = [
    './public/img/Cardano.png',
    './public/img/Ethereum.png',
    './public/img/Usdc.jpg',
    './public/img/Bitcoin.jpg',
    './public/img/Gold.jpg'
]; 


function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds 
  
      return () => {
        clearTimeout(timer);
      };
    }, [currentIndex]);
    
    return (
    <div className='main-containerr'>
      <div className='click'>
      </div>
   
      <div className="carousel-container">
        <div className="carousel">
          {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
            <div
              key={index}
              className={`carousel-slide active`}
            >
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>

    );
  }

export default Carousel;
