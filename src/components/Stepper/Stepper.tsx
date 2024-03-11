import React, { useState } from 'react';
import './stepper.css';
import '../TextStyle.css';
import ProductImg2 from '../../assets/img/product-2.jpg';
import ProductImg3 from '../../assets/img/product-3.jpg';
import ProductImg1 from '../../assets/img/product-1.jpg';
import Searchbar from '../../pages/Dashboard/Searchbar';

interface StepperProps {
  currentStep: number;
  onNextClick: () => void;
  imageSrc: string;
  topic: string;
}

function Stepper({ currentStep, onNextClick, imageSrc,topic }: StepperProps) {
  const handleNextClick = () => {
    onNextClick();
  };

  return (
    <div className="st-body">
      <section className="step-wizard">
        <div className="left-section">
          <div className="st-topic">
            {topic}
            <p>Within a Few Clicks, Make Your Selection</p>
          </div>
          <div className="st-search">
            {/* Your search components go here */}
          </div>
        </div>
        <div className="middle-section">
          <ul className="step-wizard-list">
            {[1, 2, 3, 4, 5].map((step) => (
              <li
                key={step}
                className={`step-wizard-item ${currentStep === step ? 'current-item' : ''}`}
              >
                <span className={`progress-count ${currentStep >= step ? 'filled' : ''}`}>{step}</span>
                <span className="progress-lable">Step {step}</span>
              </li>
            ))}
          </ul>
          {/* <button onClick={handleNextClick}>Next</button> */}
          <Searchbar />
        </div>
        <div className="right-section">
          <img src={imageSrc} alt="" className="st-image" />
        </div>
      </section>
    </div>
  );
}

export default Stepper;
