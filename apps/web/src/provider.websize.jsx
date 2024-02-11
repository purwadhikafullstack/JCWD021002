/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

const WebSizeContext = React.createContext();

const WebSizeProvider = ({ children }) => {
  const [size, setSize] = useState(() => {
    const pageSize = localStorage.getItem('page size');
    return pageSize || '500px';
  });

  const [newSize, setNewSize] = useState('500px');

  const handleWebSize = () => {
    setNewSize((prevSize) => (prevSize === '500px' ? '100vw' : '500px'));
    localStorage.setItem('page size', newSize);
    setSize(newSize);
  };

  useEffect(() => {
    const pageSize = localStorage.getItem('page size');
    if (pageSize) {
      setSize(pageSize);
    } else {
      localStorage.setItem('page size', newSize);
    }
  }, [newSize]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setSize(newSize)
        localStorage.setItem('page size', newSize);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);


  return (
    <WebSizeContext.Provider value={{ size, handleWebSize }}>
      {children}
    </WebSizeContext.Provider>
  );
};

const useWebSize = () => {
  const context = React.useContext(WebSizeContext);
  if (!context) {
    throw new Error('useWebSize must be used within a WebSizeProvider');
  }
  return context;
};

export { WebSizeProvider, useWebSize };
