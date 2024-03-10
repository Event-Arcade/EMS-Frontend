import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

interface ServiceFormProps {
  imgSrc: string;
  title: string;
  description: string;
  price: string;
 // rating: number;
  buttonText: string;

}

const ServiceForm: React.FC<ServiceFormProps> = ({
  imgSrc,
  title,
  description,
  price,
  //rating,
  buttonText,
}) => {
  return (
    <div className="Service-form-item">
      <div className="Service-form-img">
        <img src={imgSrc} alt={title} />
      </div>
      <div className="Service-form-content">
        <div className="Service-form-title">{title}</div>
        <div className="Service-form-des">{description}</div>
        {/* <div className="Service-form-price">{price}</div> */}
       
        <button className="Service-form-add">{buttonText}</button>
      </div>
    </div>
  );
};

export default ServiceForm;
