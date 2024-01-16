/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const WebSizeContext = createContext();

const WebSizeProvider = ({ children }) => {
  const [size, setSize] = useState('500px');
  const handleWebSize = () => {
    setSize((prevSize) =>
      prevSize === '500px' ? '100vw' : '500px',
    );
  };

  return (
    <WebSizeContext.Provider value={{ size, handleWebSize }}>
      {children}
    </WebSizeContext.Provider>
  );
};

const useWebSize = () => {
  const context = useContext(WebSizeContext);
  if (!context) {
    throw new Error('useWebSize must be used within a WebSizeProvider');
  }

  return context;
};

export { WebSizeProvider, useWebSize };
