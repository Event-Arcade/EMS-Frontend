import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface ShopCardProps {
  title: string;
  description: string;
  src: string;
}

const ServiceCard: React.FC<ShopCardProps> = ({ title, description, src }) => {
  return (
    <Card style={{ width: "200px", gap: 0, padding: 0, margin: "20px", height: "300px", alignItems: "center" }}>
      <Card.Img style={{ width: "100%", height: "150px" }} variant="top" src={src} />
      <Card.Body>
        <Card.Title style={{ fontSize: '15px', fontWeight: 600 }}>{title}</Card.Title>
        <Card.Text style={{ fontSize: '10px' }}>{description}</Card.Text>
        <Button style={{ background: '#e78309', borderWidth: 0, width: 100 }} href='/vendorServices'>Visit</Button>
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;
