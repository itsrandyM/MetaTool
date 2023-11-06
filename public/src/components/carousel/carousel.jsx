import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Import the CSS file

const images = [
    './public/img/Cardano.png',
    './public/img/Ethereum.png',
    './public/img/Usdc.jpg',
    './public/img/Bitcoin.jpg',
    './public/img/Gold.jpg'
]; // Replace these with your image URLs


function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds (adjust as needed)
  
      return () => {
        clearTimeout(timer);
      };
    }, [currentIndex]);
  
    return (
      <div className="carousel-container">
        <a href=""><button className='button'>see more</button></a>
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
    );
  }

export default Carousel;
