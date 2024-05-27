import React, { useState, useEffect } from 'react';
// import './recentSales.css'
import CardFilter from './CardFilter';
import RecentSalesTable from './RecentSalesTable';

function RecentSales() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState<string>('Today'); 

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };


  return (
    <div className="card recent-sales overflow-auto">
      <CardFilter filterChange={handleFilterChange} />

      <div className="card-body">
        <h5 className="card-title">
          Plan Details<span>| Plan 01</span>
        </h5>
        <RecentSalesTable items={items} />
      </div>
    </div>
  );
}

export default RecentSales;
