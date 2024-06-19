import React from "react";
import { Card, Button, Badge, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./shopServiceCard.css"; // Custom CSS file for additional styling
import ShopService from "../../interfaces/ShopService";
import defaultImageUrl from "../../assets/SlidingPic1.jpg"

interface ShopServiceCardProps {
  shopService: ShopService;
}

const ShopServiceCard: React.FC<ShopServiceCardProps> = ({ shopService }) => {
  const navigate = useNavigate();
  const defaultImageUrl = "../../assets/SlidingPic1.jpg";

  return (
    <Card className="shop-service-card">
      <Carousel>
        {shopService.shopServiceStaticResourcesURLs && shopService.shopServiceStaticResourcesURLs.length > 0 ? (
          shopService.shopServiceStaticResourcesURLs.map((url, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 shop-service-card-img"
                src={url}
                alt={`Slide ${index}`}
              />
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img
              className="d-block w-100 shop-service-card-img"
              src={defaultImageUrl}
              alt="Default"
            />
          </Carousel.Item>
        )}
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
