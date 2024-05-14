import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ServiceCard from './ServiceCard';

interface Service {
  title: string;
  description: string;
  src: string;
}

const ServiceList: React.FC<{ services: Service[] }> = ({ services }) => {
  const servicesPerRow = 5;
  const rowsPerSection = 2;
  const servicesPerSection = servicesPerRow * rowsPerSection;

  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = Math.ceil(services.length / servicesPerSection);

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleNextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const startIndex = currentSection * servicesPerSection;
  const endIndex = Math.min(startIndex + servicesPerSection, services.length);
  const servicesToDisplay = services.slice(startIndex, endIndex);

  // Calculate the number of cards to add to fill the row
  const numCardsToAdd = servicesPerRow - (servicesToDisplay.length % servicesPerRow);

  // Add empty objects to fill the row if needed
  const filledServicesToDisplay = [...servicesToDisplay, ...Array(numCardsToAdd).fill({})];

  const chunkArray = (arr: Service[], size: number): Service[][] => {
    return arr.reduce((acc: Service[][], _, i: number) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const rows = chunkArray(filledServicesToDisplay, servicesPerRow);

  return (
    <div className="shop-list">
      {/* Render the current section of shops */}
      <div className="shop-section" style={{  justifyContent: "center", alignItems: "center" }}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row justify-content-center clearfix" style={{ marginBottom: "20px",background:"#E0E0E0" }}>
            {row.map((service, index) => (
              <div key={index} className="col-md-2">
                {service.title && <ServiceCard
                  title={service.title}
                  description={service.description}
                  src={service.src}
                />}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="section-navigation">
        <button onClick={handlePreviousSection}   disabled={currentSection === 0}>
          Previous
        </button>
        <span>
          {" "}
          {currentSection + 1} of {totalSections}
        </span>
        <button
          onClick={handleNextSection}
          disabled={currentSection === totalSections - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServiceList;
