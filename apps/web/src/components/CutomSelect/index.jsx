/* eslint-disable react/prop-types */
// CustomSelect.js
import { useState } from 'react';
import './CustomSelect.css';

const CustomSelect = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom-select" onClick={toggleSelect}>
      <div className={`select-selected ${isOpen ? 'select-arrow-active' : ''}`}>
        {selectedOption.label}
      </div>
      <div className={`select-items ${isOpen ? '' : 'select-hide'}`}>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={option === selectedOption ? 'same-as-selected' : ''}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
