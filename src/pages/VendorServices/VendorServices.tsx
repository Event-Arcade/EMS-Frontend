import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer/Footer";
import EditableImage from "./EditableImage";
import { useLocation } from "react-router-dom";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import ReviewSection from "./ReviewSection";
import PhotosVideosSection from "./GallerySection";
import UpcomingEventsSection from "./UpcomingEventsSection";
import './vendorServices.css'

export interface Service {
  name: string;
  images: string[];
  price?: number[];
  stars?: number;
}

type Sections = {
  [key: string]: JSX.Element;
};

const VendorServices: React.FC = () => {
  const location = useLocation();
  const {
    businessName,
    description,
    price,
    location: loc,
    eventType,
    service,
  } = location.state as {
    businessName: string;
    description: string;
    price: string;
    location: string;
    eventType: string;
    service: string;
  };

  const [userData, setUserData] = useState({
    contact: {
      phoneNumber: "",
      email: "",
      whatsappNumber: "",
      address: "",
      serviceArea: "",
    },
    services: [
      {
        name: "HOTEL ARALIYA",
        images: ["src/assets/vendor/vendorhotel1.jpg"],
        price: [1000000],
        stars: 4.5,
      },
      {
        name: "ARALIYA Resturant",
        images: ["src/assets/vendor/vendorhotel2.jpg"],
        price: [1000000],
        stars: 3.5,
      },
      {
        name: "Rooms",
        images: ["src/assets/vendor/vendorroom.jpg"],
        price: [1000000],
        stars: 4.5,
      },
      {
        name: "Birthday Decorations",
        images: ["src/assets/vendor/Vendordec1.jpg"],
      },
      {
        name: "Birthday Decorations",
        images: ["src/assets/vendor/Vendordec2.jpg"],
      },

      {
        name: "Wedding Decorations",
        images: ["src/assets/vendor/Vendordec4.jpg"],
      },

      {
        name: "Wedding Decorations",
        images: ["src/assets/vendor/Vendordec5.jpg"],
      },

      {
        name: "Entertainment",
        images: ["src/assets/vendor/vendorenter2.jpg"],
      },

      {
        name: "Entertainment",
        images: ["src/assets/vendor/vendorenter3.jpg"],
      },

      {
        name: "Entertainment",
        images: ["src/assets/vendor/vendorenter4.jpg"],
      },

      {
        name: "Entertainment",
        images: ["src/assets/vendor/vendorenter5.jpg"],
      },
    ],
    reviews: [],
    photosVideos: [],
    upcomingEvents: [],
  });

  const [activeSection, setActiveSection] = useState("home");

  const sections: Sections = {
    home: (
      <><h1 style={{textAlign:"center",marginTop:'40px',fontWeight:600}}>Recently Add Services</h1>
        <div className="information-section">
          <h1>{businessName}</h1>
          <p>{description}</p>
          <p>Price: {price}</p>
          <p>Location: {loc}</p>
          <p>Event Type: {eventType}</p>
          <p>Service: {service}</p>
        </div>

      </>
    ),

    services: <ServicesSection services={userData.services} />,
    about: <AboutSection />,
    reviews: <ReviewSection />,
    photosVideos: <PhotosVideosSection />,
    upcomingEvents: <UpcomingEventsSection />,
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle video upload logic here
      console.log("Video file:", file);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle photo upload logic here
      console.log("Photo file:", file);
    }
  };

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
    }));

    // Set default active section to Home
    setActiveSection("home");
  }, [location.state]);

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header getSideBarVisibility={function (): void {
        throw new Error("Function not implemented.");
      } }      />
      <div className="user-page-container">
        <EditableImage imageUrl="src/assets/vendor/userpage.jpg" />
        <div className="nav-bar">
          {Object.keys(sections).map((section) => (
            <a
              key={section}
              onClick={() => handleNavigation(section)}
              className={activeSection === section ? "active" : ""}
              style={{ marginRight: "10px" }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
        <section id="content">{sections[activeSection]}</section>
      </div>
      <Footer />
    </>
  );
};

export default VendorServices;
