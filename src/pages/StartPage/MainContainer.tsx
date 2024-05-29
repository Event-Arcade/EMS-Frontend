import { useEffect, useState } from "react";
import "./mainContainer.css";
import Stepper from "../../components/Stepper/Stepper";
import LocationForm from "./LocationForm";
import ButtonContainer from "./ButtonContainer";
import ProductImg2 from "../../assets/img/product-2.jpg";
import ProductImg3 from "../../assets/img/product-3.jpg";
import ProductImg1 from "../../assets/img/product-1.jpg";
import step1 from "../../assets/stepper/step1.png";
import step2 from "../../assets/stepper/step2.png";
import step3 from "../../assets/stepper/step3.png";
import step4 from "../../assets/stepper/step4.png";
import step5 from "../../assets/stepper/step5.png";
import { useAppSelector } from "../../store/hooks";
import ServicesList from "./ServicesList";

function MainContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [imageSrc, setImageSrc] = useState<string>(step1);
  const [topic, setTopic] = useState<string>("Tell us Your Event Details");
  const { categories } = useAppSelector((state) => state.category);

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
    if (currentStep === 0) {
      setTopic("Tell us Your Event Details");
    } else {
      setTopic(`Select Your ${categories[currentStep - 1]?.name} Service`);
    }
  };

  useEffect(() => {
    updateImageSrc();
    updateTopic();
  }, [currentStep]);

  const handleNextClick = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, categories.length));
    updateImageSrc();
    updateTopic();
  };

  function showStep(step: number) {
    if(step === 0){
      return <LocationForm onNextClick={handleNextClick} />;
    }else if(step > 0 && step <= categories.length){
      // @ts-ignore
      return <ServicesList currentStep={currentStep} onNextClick={handleNextClick} categoryId={categories[step - 1].id} />;
    }
  }

  return (
    <div className="main-container" id="main-container">
      <Stepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        imageSrc={imageSrc}
        topic={topic}
      />
      {showStep(currentStep)}
      

    </div>
  );
}

export default MainContainer;
