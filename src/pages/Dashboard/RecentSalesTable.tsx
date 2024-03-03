import React from "react";

interface RecentSalesTableProps {
  items: {
    _id: number;
    number: string;
    customer: string;
    product: string;
    price: number;
    status: string;
  }[];
}

function RecentSalesTable({ items }: RecentSalesTableProps) {
  const handleStatus = (status: string): string => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "danger";
      default:
        return "success";
    }
  };

  return (
    <table className="table table-borderless datatable">
      <thead className="table-light">
        <tr>
          <th scope="col">Ref</th>
          <th scope="col">Category</th>
          <th scope="col">Provider</th>
          <th scope="col">Price</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <tr key={item._id}>
              <th scope="row">
                <a href="#">{item.number}</a>
              </th>
              <td>{item.customer}</td>
              <td>
                <a href="#" className="text-primary">
                  {item.product}
                </a>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <span className={`badge bg-${handleStatus(item.status)}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default RecentSalesTable;
