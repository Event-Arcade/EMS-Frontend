import React, { useState } from 'react';
import './mainContainer.css';
import Stepper from '../../components/Stepper/Stepper';
import LocationForm from './LocationForm';
import VenueForm from './VenueForm';
import CateringForm from './CateringForm';
import Entertainment from './Entertainment';
import Decoration from './Decoration';
import ButtonContainer from './ButtonContainer';
import ProductImg2 from '../../assets/img/product-2.jpg';
import ProductImg3 from '../../assets/img/product-3.jpg';
import ProductImg1 from '../../assets/img/product-1.jpg';
import step1 from '../../assets/stepper/step1.png'
import step2 from '../../assets/stepper/step2.png'
import step3 from '../../assets/stepper/step3.png'
import step4 from '../../assets/stepper/step4.png'
import step5 from '../../assets/stepper/step5.png'
import SelectBox from '../../components/SelectBox/SelectBox';

function MainContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageSrc, setImageSrc] = useState<string>(step1);
  const[topic, setTopic] = useState<string>('Select Your Location');

  const updateImageSrc = () => {
    switch (currentStep) {
      case 1:
        setImageSrc(step2);
        break;
      case 2:
        setImageSrc(step3);
        break;
      case 3:
        setImageSrc(step4);
        break;
      case 4:
        setImageSrc(step5);
        break;
      // case 5:
      //   setImageSrc(step5);
      //   break;
    }
  };
  const updateTopic = () => {
    switch (currentStep) {
      case 1:
        setTopic('Select Your Venue');
        break;
      case 2:
        setTopic('Select Your Catering Service');
        break;
      case 3:
        setTopic('Select Your Decoration Service');
        break;
      case 4:
        setTopic('Select Your Entertainment Service');
        break;
    }
  }

  const handleNextClick = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
    updateImageSrc();
    updateTopic();
  };

  function showStep(step: number) {
    switch (step) {
      case 1:
        return <LocationForm />;
      case 2:
        return <VenueForm />;
      case 3:
        return <CateringForm />;
      case 4:
        return <Decoration/>;
      case 5:
        return <Entertainment />;
      default:
        return null;
    }
  }

  return (
    <div className='main-container' id='main-container'>
      <Stepper currentStep={currentStep} onNextClick={handleNextClick} imageSrc={imageSrc} topic={topic}/>
      {showStep(currentStep)}
      
      <ButtonContainer onNextClick={handleNextClick} />
    </div>
  );
}

export default MainContainer;
