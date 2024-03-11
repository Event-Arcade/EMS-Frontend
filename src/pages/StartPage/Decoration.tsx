import React from 'react'
import './decoration.css'
import '../StartPage/ServiceForm/serviceForm.css';
import SelectBox from '../../components/SelectBox/SelectBox';
import ServiceForm from './ServiceForm/ServiceForm';

function Decoration() {
  const items = [
    {
      imgSrc: 'decoration1.png',
      title: 'Lassana Flora',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'decoration2.png',
      title: 'Udarta Mangala Poru',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'decoration3.png',
      title: 'Chamathka Flora',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'decoration4.png',
      title: 'Natural Care',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'decoration5.png',
      title: 'Heladiwa Furniture',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'decoration6.png',
      title: 'Magala Poruwa',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    
  ];

  const decoitems = [
    {label: "Poruwa", value: "poruwa"}, 
    {label: "Table", value: "table"},
    {label: "Chair", value: "chair"},
    {label: "Flower", value: "flower"},
    {label: "Light", value: "light"},
  ];

  const venuesize = [
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
        options={decoitems}
        defaultLabel="Items"
        style={{ width: '150px', margin: '40px 50px 10px 120px'}}
      />

<SelectBox
        options={venuesize}
        defaultLabel="Size of Venue"
        style={{ width: '150px', margin: '40px 50px 10px 0px'}}
      />
      <SelectBox
        options={budget}
        defaultLabel="Budget"
        style={{ width: '150px', margin: '40px 50px 10px 0px'}}
      />
      <SelectBox
        options={rating}
        defaultLabel="Rating"
        style={{ width: '150px', margin: '40px 50px 10px 0px'}}
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

export default Decoration