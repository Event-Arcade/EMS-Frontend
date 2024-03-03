import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface ShopCardProps {
  title: string;
  description: string;
  src: string;
}

const ShopCard: React.FC<ShopCardProps> = ({ title, description, src }) => {
  return (
    <Card style={{ width: '16rem', padding: 0, margin: '10px', marginLeft:'15px'}}>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title style={{ fontSize: '15px', fontWeight: 600 }}>{title}</Card.Title>
        <Card.Text style={{ fontSize: '10px' }}>{description}</Card.Text>
        <Button style={{ background: '#e78309', borderWidth: 0, width: 100 }}>Visit</Button>
      </Card.Body>
    </Card>
  );
}

export default ShopCard;
