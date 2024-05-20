import React from "react";
import { Card, Button, Badge, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./shopServiceCard.css"; // Custom CSS file for additional styling

interface ShopService {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  shopServiceStaticResourcesURLs: string[];
}

interface ShopServiceCardProps {
  shopService: ShopService;
}

const ShopServiceCard: React.FC<ShopServiceCardProps> = ({ shopService }) => {
  const navigate = useNavigate();

  const isVideo = (url: string) => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const extension = url.split('.').pop()?.split('?')[0];
    return videoExtensions.includes(extension || '');
  };

  return (
    <Card className="shop-service-card">
      <Carousel>
        {shopService.shopServiceStaticResourcesURLs.map((url, index) => (
          <Carousel.Item key={index}>
            {isVideo(url) ? (
              <video
                className="d-block w-100 shop-service-card-img"
                controls
              >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                className="d-block w-100 shop-service-card-img"
                src={url}
                alt={`Slide ${index}`}
              />
            )}
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body className="shop-service-card-body">
        <Card.Title className="shop-service-card-title">
          {shopService.name}
        </Card.Title>
        <Card.Text className="shop-service-card-text">
          {shopService.description}
        </Card.Text>
        <div className="shop-service-card-footer">
          <Card.Text className="shop-service-card-price">
            ${shopService.price}
          </Card.Text>
          <Badge bg="warning" text="dark">
            {shopService.rating} <i className="fa fa-star"></i>
          </Badge>
        </div>
        <Button
          className="shop-service-card-button"
          onClick={() => navigate(`/shop-service/${shopService.id}`)}
        >
          Visit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ShopServiceCard;
