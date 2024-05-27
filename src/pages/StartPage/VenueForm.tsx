import {useState} from "react";
import "./venueForm.css";
import "../StartPage/ServiceForm/serviceForm.css";
import SelectBox from "../../components/SelectBox/SelectBox"
import ServiceForm from "./ServiceForm/ServiceForm";

function VenueForm() {
  const items = [
    {
      imgSrc: "venue1.png",
      title: "Hotel Ralidiya | Galle",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.",
      price: "$203.5",
      buttonText: "Visit",
    },
    {
      imgSrc: "venue2.png",
      title: "Hotel Ishan | Mawanella",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.",
      price: "$203.5",
      buttonText: "Visit",
    },
    {
      imgSrc: "venue3.png",
      title: "Aryan | Kegalle",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.",
      price: "$203.5",
      buttonText: "Visit",
    },
    {
      imgSrc: "venue4.png",
      title: "Hotel Ayesha | Aranayaka",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.",
      price: "$203.5",
      buttonText: "Visit",
    },
    {
      imgSrc: "venue5.png",
      title: "Golden Rich | Kegalle",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.",
      price: "$203.5",
      buttonText: "Visit",
    },
    {
      imgSrc: "venue6.png",
      title: "Bluemount | Colombo",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.",
      price: "$203.5",
      buttonText: "Visit",
    },
  ];

  const [selectedNoOfGuest, setselectedNoOfGuest] = useState("");
  const [selectedVenuetype, setselectedVenuetype] = useState("");
  const [selectedBudget, setselectedBudget] = useState("");
  const [selectedRating, setselectedRating] = useState("");


  const noOfGuest = [
    { label: "Under 50", value: "under 50" },
    { label: "Under 100", value: "under 100" },
    { label: "Under 200", value: "under 200" },
    { label: "Over 200", value: "over 200" },
  ];

  const budget = [
    { label: "Rs 100,000", value: "100000" },
    { label: "Rs 200,000", value: "200000" },
    { label: "Rs 300,000", value: "300000" },
    { label: "Rs 400,000", value: "400000" },
    { label: "Rs 500,000<", value: "500000" },
  ];
  const rating = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];
  const venuetype = [
    { label: "Out Door", value: "out door" },
    { label: "In Door", value: "in door" },

    
  ];

  return (
    <div>
      <div className="select-box">
        <div className="select-box">
          <SelectBox
            options={noOfGuest}
            defaultLabel="No of Guest"
            value={selectedNoOfGuest}
            onChange={(value) => setselectedNoOfGuest(value)}
            style={{ width: "150px", margin: "40px 50px 10px 120px" }}

            
          />
          <SelectBox
            options={venuetype}
            defaultLabel="Venue Type"
            value={selectedVenuetype}
            onChange={(value) => setselectedVenuetype(value)}
            style={{ width: "150px", margin: "40px 50px 10px 0px" }}
          />
          <SelectBox
            options={budget}
            defaultLabel="Budget"
            value={selectedBudget}
            onChange={(value) => setselectedBudget(value)}
            style={{ width: "150px", margin: "40px 50px 10px 0px" }}
          />
          <SelectBox
            options={rating}
            defaultLabel="Rating"
            value={selectedRating}
            onChange={(value) => setselectedRating(value)}
            style={{ width: "150px", margin: "40px 50px 10px 0px" }}
          />
          <button className="custom-search-button">Search</button>
        </div>
      </div>
      <div className="Service-form-container">
        <div className="Service-form-list">
          {items.map((item, index) => (
            <ServiceForm key={index} {...item} />
          ))}
        </div>
        <ul className="Service-form-listPage"></ul>
      </div>
    </div>
  );
}

export default VenueForm;
