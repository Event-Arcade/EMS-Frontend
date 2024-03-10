import React from "react";
import "./locationForm.css";
import '../../components/ButtonStyle.css';
import '../StartPage/ServiceForm/serviceForm.css';
import Hotel1 from '../../../assets/SlidingPic3.jpg';
import ServiceForm from "./ServiceForm/ServiceForm";
import SelectBox from "../../components/SelectBox/SelectBox";
import 'react-datepicker/dist/react-datepicker.css';
import { Rating, Stack } from "@mui/material";

function LocationForm() {

  
  const functiontype = [
    {label: "Wedding", value: "edding"}, 
    {label: "Birthday", value: "birthday"},
    {label: "Corporate", value: "corporate"},
    {label: "Social", value: "social"},
    {label: "Others", value: "others"},
  ];

  const location =[
    {label: "Kegalle", value: "kegalle"},
    {label: "Colombo", value: "colombo"},
    {label: "Kandy", value: "kandy"},
    {label: "Galle", value: "galle"},
    {label: "Others", value: "others"},
  ];

  return (
    <div>
      <div className="select-box">
      <SelectBox
        options={functiontype}
        defaultLabel="Function Type"
        style={{ width: '200px', margin: '20px 50px 10px 100px'}}
      />
      <SelectBox
        options={location}
        defaultLabel="Location"
        style={{ width: '200px', margin: '20px 50px 10px 0px'}}
      />
      <button className="custom-search-button">Search</button>
      </div>
  
    </div>
  );
}

export default LocationForm;
