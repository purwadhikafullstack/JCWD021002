/* eslint-disable react/prop-types */
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import './Flashlight.css';

const Flashlight = () => {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const torch = document.querySelector('.torch');
      if (torch) {
        torch.style.top = `${event.pageY}px`;
        torch.style.left = `${event.pageX}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Box>
    <div className='torch-container'>
      <div className="text">
        <h1>404</h1>
        <h2>Uh, Ohh</h2>
        <h3>Sorry we cant find what you are looking for 'cuz its so dark in here</h3>
      </div>
      <div className="torch"></div>
      </div>
    </Box>
  );
};

export default Flashlight;
