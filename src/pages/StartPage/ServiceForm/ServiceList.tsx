import React, { useState } from "react";
import ServiceForm from "./ServiceForm";

interface ServiceFormProps {
  imgSrc: string;
  title: string;
  description: string;
  price: string;
  buttonText: string;
}

interface ServiceListProps {
  services: ServiceFormProps[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 2 rows of 3 items each

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentServices = services.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="Service-form-container">
      <div className="Service-form-list">
        {currentServices.map((service, idx) => (
          <ServiceForm key={idx} {...service} />
        ))}
      </div>
      <ul className="Service-form-listPage">
        <li onClick={goToPreviousPage} className={currentPage === 1 ? "disabled" : ""}>
          Previous
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </li>
        ))}
        <li onClick={goToNextPage} className={currentPage === totalPages ? "disabled" : ""}>
          Next
        </li>
      </ul>
    </div>
  );
};

export default ServiceList;
