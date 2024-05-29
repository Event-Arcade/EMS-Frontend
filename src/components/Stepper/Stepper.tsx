import React, { useState } from "react";
import "./stepper.css";
import "../TextStyle.css";
import ProductImg2 from "../../assets/img/product-2.jpg";
import ProductImg3 from "../../assets/img/product-3.jpg";
import ProductImg1 from "../../assets/img/product-1.jpg";
import Searchbar from "../header/searchBar/Searchbar";
import { useAppSelector } from "../../store/hooks";

interface StepperProps {
  currentStep: number;
  setCurrentStep: (arg0: number) => void;
  imageSrc: string;
  topic: string;
}

function Stepper({
  currentStep,
  setCurrentStep,
  imageSrc,
  topic,
}: StepperProps) {
  const { categories } = useAppSelector((state) => state.category);

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
              onClick={() => {
                setCurrentStep(0);
              }}
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
                  setCurrentStep(index + 1);
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
          <img src={imageSrc} alt="" className="st-image" />
        </div>
      </section>
    </div>
  );
}

export default Stepper;
