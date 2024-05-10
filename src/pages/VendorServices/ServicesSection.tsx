import React from 'react';
import './vendorServices.css';

import { Service } from './VendorServices'; 

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  
  const venueServices = services.slice(0, 3); 
  const decorationServices = services.slice(3, 7); 
  const entertainmentServices = services.slice(7, 11); 

  return (
    <div>
      <h4>Venue</h4>
      <div className="services-container">
        
        {venueServices.map((service, index) => (
          <div key={index} className="service-box">
            <img src={service.images[0]} alt={service.name} />
            <div className="service-details">
              <p>{service.name}</p>
              <p>Price : {service.price ? service.price[0] : 'N/A'}</p>
              <p>Stars : {service.stars}</p>
            </div>
          </div>
        ))}
      </div>
      <h4>Decorations</h4>
      <div className="services-container">
        
        {decorationServices.map((service, index) => (
          <div key={index} className="service-box">
            <img src={service.images[0]} alt={service.name} />
            <div className="service-details">
              <p>{service.name}</p>
             
            </div>
          </div>
        ))}
      </div>
      <h4>Entertainment</h4>
      <div className="services-container">
        
        {entertainmentServices.map((service, index) => (
          <div key={index} className="service-box">
            <img src={service.images[0]} alt={service.name} />
            <div className="service-details">
              <p>{service.name}</p>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;