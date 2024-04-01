import  {useState} from 'react'
import './cateringForm.css'
import '../StartPage/ServiceForm/serviceForm.css';
import SelectBox from '../../components/SelectBox/SelectBox';
import ServiceForm from './ServiceForm/ServiceForm';

function CateringForm() {
  const items = [
    {
      imgSrc: 'catering1.png',
      title: 'Mathara Bath Kade',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'catering2.png',
      title: 'P & S PVT LTD',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'catering3.png',
      title: 'Hotel Ishan',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'catering4.png',
      title: 'Ceyloan Cafe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'catering5.png',
      title: 'Helabojun',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    {
      imgSrc: 'catering6.png',
      title: 'Yapa Store',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus.',
      price: '$203.5',
      buttonText: 'Visit',
    },
    
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

    const [selectedNoOfGuest, setselectedNoOfGuest] = useState("");
    const [selectedBudget, setselectedBudget] = useState("");
    const [selectedRating, setselectedRating] = useState("");
    
  return (
    <div>
      <div className="select-box">
      <div className="select-box">
      <SelectBox
        options={noOfGuest}
        defaultLabel="No of Guest"
        value={selectedNoOfGuest}
        onChange={(value) => setselectedNoOfGuest(value)}
        style={{ width: '200px', margin: '40px 50px 10px 120px'}}
      />
      <SelectBox
        options={budget}
        defaultLabel="Budget"
        value={selectedBudget}
        onChange={(value) => setselectedBudget(value)}
        style={{ width: '200px', margin: '40px 50px 10px 0px'}}
      />
      <SelectBox
        options={rating}
        defaultLabel="Rating"
        value={selectedRating}
        onChange={(value) => setselectedRating(value)}
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

export default CateringForm