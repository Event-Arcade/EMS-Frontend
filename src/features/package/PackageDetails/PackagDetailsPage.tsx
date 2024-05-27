import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./packageDetailsPage.css";
import Header from "../../../components/header/Header";
import Footer from "../../../components/Footer/Footer";

interface PackageDetailsProps {
  functionType: string;
  location: string;
  functionDate: string;
  venueName: string;
  cateringProvider: string;
  decorationProvider: string;
  entertainmentServices: string;
  venueHeadcount: number;
  venueSize: string;
}
const packageDetails: PackageDetailsProps = {
  functionType: "Wedding",
  location: "Galle",
  functionDate: new Date(2024, 5, 15).toISOString(),
  venueName: "Grand Hall",
  cateringProvider: "Gourmet Delights",
  decorationProvider: "Elegant Designs",
  entertainmentServices: "Live Band",
  venueHeadcount: 150,
  venueSize: "Large",
};
// PackageDetailsPage component

const PackageDetailsPage: React.FC = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };
  return (
    <div className="package-details-page">
      <h2>Package Details</h2>

      {/* Function Type */}
      <div className="info-section">
        <h3>Function Type :</h3>
        <p>{packageDetails.functionType}</p>
      </div>

      {/* Location */}
      <div className="info-section">
        <h3>Location :</h3>
        <p>{packageDetails.location}</p>
      </div>

      {/* Function Heading Date */}
      <div className="info-section">
        <h3>Function Date :</h3>
        <p>{packageDetails.functionDate}</p>
      </div>

      {/* Venue Details */}
      <div className="venue-details">
        <h3>Venue Details</h3>
        <p>
          <strong>Name:</strong> {packageDetails.venueName}
        </p>
        <p>
          <strong>Headcount:</strong> {packageDetails.venueHeadcount}
        </p>
        <p>
          <strong>Size:</strong> {packageDetails.venueSize}
        </p>
      </div>

      {/* Catering Service Provider */}
      <div className="info-section">
        <h3>Catering Service Provider :</h3>
        <p>{packageDetails.cateringProvider}</p>
      </div>

      {/* Decoration Services Provider */}
      <div className="info-section">
        <h3>Decoration Services Provider :</h3>
        <p>{packageDetails.decorationProvider}</p>
      </div>

      {/* Entertainment Services */}
      <div className="info-section">
        <h3>Entertainment Services :</h3>
        <p>{packageDetails.entertainmentServices}</p>
      </div>
      <Footer/>
    </div>
  );
};

export default PackageDetailsPage;
