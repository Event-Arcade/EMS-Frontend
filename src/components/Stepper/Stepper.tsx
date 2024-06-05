import "./stepper.css";
import "../TextStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useMemo } from "react";
import { setCurrentStep } from "../../features/package/PackageSlice";
import step1 from "./../../assets/stepper/step1.png";

function Stepper() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { currentStep } = useAppSelector((state) => state.package);

  const topic = useMemo(() => {
    if (currentStep === 0) {
      return "Tell us Your Event Details";
    } else {
      return `Select Your ${categories[currentStep - 1]?.name} Service`;
    }
  }, [currentStep, categories]);

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
            <li
              key={0}
              className={`step-wizard-item ${
                currentStep === 0 ? "current-item" : ""
              }`}
            >
              <span
                className={`progress-count ${currentStep >= 0 ? "filled" : ""}`}
              >
                {0}
              </span>
              <span className="progress-lable">Begin</span>
            </li>
            {categories.map((category, index) => (
              <li
                key={index + 1}
                className={`step-wizard-item ${
                  currentStep === index + 1 ? "current-item" : ""
                }`}
                onClick={() => {
                  dispatch(setCurrentStep(index + 1));
                }}
              >
                <span
                  className={`progress-count ${
                    currentStep >= index + 1 ? "filled" : ""
                  }`}
                >
                  {index + 1}
                </span>
                <span className="progress-lable">{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-section">
          {currentStep === 0 ? (
            <img src={step1} alt="" className="st-image" />
          ) : (
            <img
              src={categories[currentStep-1].imageUrl}
              alt=""
              className="st-image"
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default Stepper;
