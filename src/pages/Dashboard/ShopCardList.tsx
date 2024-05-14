import React from "react";
import ShopCard from "./ShopCard";
import Shop1 from "../../assets/SlidingPic1.jpg";

const cardData = [
  {
    key: 1,
    title: "Hotel Araliya",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    src: "/assets/SlidingPic1.jpg",
  },
];

const ShopCardList: React.FC = () => {
  return (
    <div className="d-flex flex-wrap">
      {cardData.map((card) => (
        <ShopCard
          key={card.key}
          title={card.title}
          description={card.description}
          src={card.src}
        />
      ))}
    </div>
  );
};

export default ShopCardList;
