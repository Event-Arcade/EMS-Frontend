import React from 'react';
import './buttonContainer.css';

interface ButtonContainerProps {
  
  onNextClick: () => void;
}

function ButtonContainer({ onNextClick }: ButtonContainerProps) {
  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    onNextClick();
  };

  return (
    <div className='main-button-container'>
      <button className='custom-next-button' onClick={handleButtonClick}>
        Next
      </button>
    </div>
  );
}

export default ButtonContainer;
