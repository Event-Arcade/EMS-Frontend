import React from 'react'
import './venueForm.css'
import '../StartPage/ServiceForm/serviceForm.css';
import SelectBox from '../../components/SelectBox/SelectBox';
import ServiceForm from './ServiceForm/ServiceForm';

function VenueForm() {

  const items = [
    {
      imgSrc: 'venue1.png',
      title: 'Hotel Ralidiya | Galle',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'venue2.png',
      title: 'Hotel Ishan | Mawanella',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'venue3.png',
      title: 'Aryan | Kegalle',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'venue4.png',
      title: 'Hotel Ayesha | Aranayaka',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'venue5.png',
      title: 'Golden Rich | Kegalle',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'venue6.png',
      title: 'Bluemount | Colombo',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    
  ];

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
    <div className="Service-form-container">
      <div className="Service-form-list">
        {items.map((item, index) => (
          <ServiceForm key={index} {...item} />
        ))}
 
      </div>
      <ul className="Service-form-listPage"></ul>
    </div>
    </div>
  )
}

export default VenueForm