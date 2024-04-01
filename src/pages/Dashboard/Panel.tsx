import React, { useState, useEffect } from "react";
import RecentSales from "./RecentSales";
import Calender from "../../components/Calender/Calender";
import ShopCard from "./ShopCard";
import Shop1 from '../../assets/SlidingPic1.jpg';
import Shop2 from '../../assets/SlidingPic2.jpg';
import Shop3 from '../../assets/SlidingPic3.jpg';

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

  return (
    <section className="dashboard section" style={{paddingTop:50}}>
      <div className="row">
        <div className="col-lg-9">My Shops
          <div className="row">
            <ShopCard title="Hotel Araliya" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop1} />
            <ShopCard title="Lassna Flora" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop2}/>
            <ShopCard title="DJ Mash" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop3}/>
            
            <div className="col-12">Your Plans
              <RecentSales />
            </div>
          </div>
        </div>
        <div className="col-lg-3 bg-white ">
          <Calender />
        </div>
      </div>
    </section>
  );
}

export default Panel;
