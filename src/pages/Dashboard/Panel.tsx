import React, { useState, useEffect } from "react";
import RecentSales from "./RecentSales";
import Calender from "../../components/Calender/Calender";
import ShopCard from "./ShopCard";
import Shop1 from "../../assets/SlidingPic1.jpg";
import Shop2 from "../../assets/SlidingPic2.jpg";
import Shop3 from "../../assets/SlidingPic3.jpg";
import DashboardBanner from "./DashboardBanner";
import "./panel.css";
// import './ShopList.css'; // Import your CSS file

const ServiceList = ({ services }: { services: any[] }) => {
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

  return (
    <div className="shop-list">
      {/* Render the current section of shops */}
      <div className="shop-section">
        {servicesToDisplay.map((service, index) => (
          <div className="col-md-4" key={index}>
            <ShopCard
              title={service.title}
              description={service.description}
              src={service.src}
            />
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
};

interface CardType {
  _id: number;
  name: string;
  icon: string;
  amount: number;
  percentage: number;
  active: boolean;
}

function Panel() {
  const [cards, setCards] = useState<CardType[]>([]);

  const fetchData = () => {
    fetch("http://localhost:4000/cards")
      .then((res) => res.json())
      .then((data: CardType[]) => {
        setCards(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const servicesData = [
    {
      title: "Hotel Araliya",
      description: "Luxurious hotel with great amenities.",
      src: Shop1,
    },
    {
      title: "Lassna Flora",
      description: "Beautiful floral arrangements for any occasion.",
      src: Shop2,
    },
    {
      title: "DJ Mash",
      description: "Professional DJ services for parties and events.",
      src: Shop3,
    },
    {
      title: "Hotel Araliya",
      description: "Luxurious hotel with great amenities.",
      src: Shop1,
    },
    {
      title: "Lassna Flora",
      description: "Beautiful floral arrangements for any occasion.",
      src: Shop2,
    },
    {
      title: "DJ Mash",
      description: "Professional DJ services for parties and events.",
      src: Shop3,
    },
    {
      title: "Hotel Araliya",
      description: "Luxurious hotel with great amenities.",
      src: Shop1,
    },
    {
      title: "Lassna Flora",
      description: "Beautiful floral arrangements for any occasion.",
      src: Shop2,
    },
    {
      title: "DJ Mash",
      description: "Professional DJ services for parties and events.",
      src: Shop3,
    },
    // Add more services as needed
  ];

  return (
    <section className="dashboard section" style={{ paddingTop: 0 }}>
      <DashboardBanner />
      <div className="row">
        <div className="col-lg-9">
          <h1
            style={{
              fontWeight: 600,
              display: "flex",
              marginTop: "60px",
              marginBottom: "40px",
              justifyContent: "center",
              color: "rgb(117, 117, 119)",
            }}
          >
            My Services
          </h1>
          <div className="row">
            {/* <ShopCard title="Hotel Araliya" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop1} />
            <ShopCard title="Lassna Flora" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop2}/>
            <ShopCard title="DJ Mash" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop3}/> */}

            <div className="col-12">
              <ServiceList services={servicesData} />
              <h1
                style={{
                  fontWeight: 600,
                  display: "flex",
                  marginTop: "60px",
                  marginBottom: "40px",
                  justifyContent: "center",
                  color: "rgb(117, 117, 119)",
                }}
              >
                My Plans
              </h1>
              <RecentSales />
            </div>
          </div>
        </div>
        <div
          className="col-lg-3"
          style={{ background: "rgb(248, 245, 192) ", paddingTop: "10px" }}
        >
          <h1
            style={{
              fontWeight: 600,
              display: "flex",
              marginTop: "60px",
              marginBottom: "60px",
              justifyContent: "center",
              color: "rgb(117, 117, 119)",
            }}
          >
            Calender
          </h1>
          <Calender />
        </div>
      </div>
    </section>
  );
}

export default Panel;
