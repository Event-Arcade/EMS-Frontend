import React, { useState } from "react";
import "./locationForm.css";
import "../../components/ButtonStyle.css";
import "../StartPage/ServiceForm/serviceForm.css";
import ServiceForm from "./ServiceForm/ServiceForm";
import SelectBox from "../../components/SelectBox/SelectBox";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Rating, Stack } from "@mui/material";

function LocationForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedFunctionType, setSelectedFunctionType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showForm, setShowForm] = useState(true);

  const functiontype = [
    { label: "Wedding", value: "wedding" },
    { label: "Birthday", value: "birthday" },
    { label: "Corporate", value: "corporate" },
    { label: "Social", value: "social" },
    { label: "Others", value: "others" },
  ];

  const location = [
    { label: "Kegalle", value: "kegalle" },
    { label: "Colombo", value: "colombo" },
    { label: "Kandy", value: "kandy" },
    { label: "Galle", value: "galle" },
    { label: "Others", value: "others" },
  ];

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Function Type:", selectedFunctionType);
    console.log("Location:", selectedLocation);
    console.log("Date:", startDate);
    // You can add more logic, such as sending the form data to an API or performing other actions.
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <div className="select-box">
            <SelectBox
              options={functiontype}
              defaultLabel="Function Type"
              value={selectedFunctionType}
              onChange={(value) => setSelectedFunctionType(value)}
              style={{ width: "200px", margin: "40px 50px 10px 100px" }}
            />
            <SelectBox
              options={location}
              defaultLabel="Location"
              value={selectedLocation}
              onChange={(value) => setSelectedLocation(value)}
              style={{ width: "200px", margin: "40px 50px 10px 0px" }}
            />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date ?? new Date())}
              className="custom-datepicker"
              popperPlacement="bottom"
            />
            <button type="submit" className="custom-search-button">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="selection-form">
          <h2>You Selected:</h2>
          <p>Function Type: {selectedFunctionType}</p>
          <p>Location: {selectedLocation}</p>
          <p>Date: {startDate.toDateString()}</p>
          <button className="edit-selection-btn" onClick={() => setShowForm(true)}>Edit Selection</button>
        </div>
      )}
    </div>
  );
}

export default LocationForm;
