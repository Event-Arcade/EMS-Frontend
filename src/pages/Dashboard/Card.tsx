import React, { useState } from "react";
import CardFilter from "./CardFilter";
import './card.css';

interface CardProps {
  card: {
    name: string;
    icon: string;
    amount: number;
    percentage: number;
  };
}

function Card({ card }: CardProps) {
  const [filter, setFilter] = useState<string>('TodayFilter');

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  return (
    <div className="col-xxl-4 col-md-6">
      <div className="card info-card sales-card">
        <CardFilter filterChange={handleFilterChange} />
        <div className="card-body">
          <h5 className="card-title">
            {card.name} <span>| {filter}</span>
          </h5>
          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-cemter">
              <i className={card.icon}></i>
            </div>
            <h6>
              {card.name === "Revenue"
                ? "$" + card.amount.toLocaleString("en-us")
                : card.amount.toLocaleString("en-us")}
            </h6>
            <span
              className={`${
                card.percentage > 0 ? "text-success" : "text-danger"
              } small pt-1 fw-bold`}
            >
              {card.percentage > 0
                ? (card.percentage * 100).toFixed(2)
                : (-card.percentage * 100).toFixed(2)}
              %
            </span>
            <span className="text-muted small pt-2 ps-1">
              {card.percentage > 0 ? 'increase' : 'decrease'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
