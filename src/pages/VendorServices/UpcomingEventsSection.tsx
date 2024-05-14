import React from 'react';
import { Table } from 'react-bootstrap';

const UpcomingEventsSection: React.FC = () => {
  const events = [
    { refNumber: '001', serviceType: 'Catering', date: '2024-10-15'},
    { refNumber: '002', serviceType: 'Entertainment', date: '20224-05-20'},
    { refNumber: '002', serviceType: 'Entertainment', date: '20224-05-20'},

  ];

  const calculateRemainingTime = (date: string) => {
    const eventDate = new Date(date);
    const currentDate = new Date();
    const remainingTime = eventDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  return (
    <Table striped bordered hover style={{marginTop:"60px"}}>
      <thead>
        <tr>
          <th>Ref Number</th>
          <th>Service Type</th>
          <th>Date</th>
          <th>Remaining Time</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td>{event.refNumber}</td>
            <td>{event.serviceType}</td>
            <td>{event.date}</td>
            <td>{calculateRemainingTime(event.date)} days</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

};

export default UpcomingEventsSection;