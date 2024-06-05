import { useState } from "react";
import ShopServiceCard from "../shopServiceCard/ShopServiceCard";
import ShopService from "../../interfaces/ShopService";

export default function ServiceList({ services }: { services: ShopService[] }) {
  // Number of shops per row and rows per section
  const servicesPerRow = 3;
  const rowsPerSection = 2;
  const servicesPerSection = servicesPerRow * rowsPerSection;

  // State to track the current section
  const [currentSection, setCurrentSection] = useState(0);

  // Calculate the total number of sections
  const totalSections = Math.ceil(services.length / servicesPerSection);

  // Function to handle going to the previous section
  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  // Function to handle going to the next section
  const handleNextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  // Calculate the shops to display in the current section
  const startIndex = currentSection * servicesPerSection;
  const endIndex = Math.min(startIndex + servicesPerSection, services.length);
  const servicesToDisplay = services.slice(startIndex, endIndex);

  if (services.length === 0) {
    return <div className="shop-list">No services found</div>;
  }

  return (
    <div className="shop-list">
      {/* Render the current section of shops */}
      <div className="shop-section">
        {servicesToDisplay.map((service, index) => (
          <div className="col-md-4" key={index}>
            <ShopServiceCard shopService={service} />
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="section-navigation">
        <button onClick={handlePreviousSection} disabled={currentSection === 0}>
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
}
