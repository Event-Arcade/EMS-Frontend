import React from 'react'
import './entertainment.css'
import '../StartPage/ServiceForm/serviceForm.css';
import SelectBox from '../../components/SelectBox/SelectBox';
import ServiceForm from './ServiceForm/ServiceForm';

function Entertainment() {
  const items = [
    {
      imgSrc: 'entertainment1.png',
      title: 'Sarasavi Kalayathnaya',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'entertainment2.png',
      title: 'Pipena Kakulu',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'entertainment3.png',
      title: 'Ajantha FireWorks',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'entertainment4.png',
      title: 'FlashBack Music Band',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'entertainment5.png',
      title: 'DJ Ara',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'entertainment6.png',
      title: 'Black & White 3 peice band',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    
  ];

  const entItem =[
    {label: "Music Band", value: "music band"}, 
    {label: "DJ", value: "dj"},
    {label: "Fire Works", value: "fire works"},
    {label: "Dancing Group", value: "dancing group"},
    {label: "Other", value: "other"},
  ];

  const noOfGuest = [
    {label: "Under 50", value: "under 50"}, 
    {label: "Under 100", value: "under 100"},
    {label: "Under 200", value: "under 200"},
    {label: "Over 200", value: "over 200"},
    
  ];

  const budget =[
    {label: "Rs 100,000", value: "100000"},
    {label: "Rs 200,000", value: "200000"},
    {label: "Rs 300,000", value: "300000"},
    {label: "Rs 400,000", value: "400000"},
    {label: "Rs 500,000<", value: "500000"},
  ];
    const rating=[
    {label: "1", value: "1"},
    {label: "2", value: "2"},
    {label: "3", value: "3"},
    {label: "4", value: "4"},
    {label: "5", value: "5"},
      
    ];
  return (
    <div>
      <div className="select-box">
      <div className="select-box">
      <SelectBox
        options={entItem}
        defaultLabel="Item"
        style={{ width: '200px', margin: '40px 50px 10px 120px'}}
      />
      <SelectBox
        options={budget}
        defaultLabel="Budget"
        style={{ width: '200px', margin: '40px 50px 10px 0px'}}
      />
      <SelectBox
        options={rating}
        defaultLabel="Rating"
        style={{ width: '200px', margin: '40px 50px 10px 0px'}}
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

export default Entertainment