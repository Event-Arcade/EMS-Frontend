import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useAppSelector } from "../../store/hooks";
import "./pictureCard.css"
import { useNavigate } from "react-router-dom";

export const PictureCard = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const { shopServices } = useAppSelector((state) => state.service);

  const cardsPerPage = 8; // 2 rows of 4 cards each
  const totalPages = Math.ceil(shopServices.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = shopServices.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Row xs={1} md={4} className="g-4 picture-card-row">
        {currentCards.map((service, idx) => (
          <Col key={idx} className="picture-card-col">
            <Card className="picture-card">
              <Card.Img
                variant="top"
                src={
                  (service.shopServiceStaticResourcesURLs &&
                    service.shopServiceStaticResourcesURLs[0]) ||
                  " "
                }
                className="picture-card-img"
              />
              <Card.Body className="picture-card-body">
                <Card.Title className="picture-card-title">
                  {service.name}
                </Card.Title>
                <Card.Text className="picture-card-text">
                  {service.description}
                </Card.Text>
                <Button
                  variant="primary"
                  className="bg-orange picture-card-button"
                  onClick={() => {
                    navigate(`/shop-service/${service.id}`);
                  }}
                >
                  Visit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="pagination">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          variant="secondary"
          className="pagination-button"
        >
          Previous
        </Button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          variant="warning"
          className="pagination-button"
        >
          Next
        </Button>
      </div>
    </>
  );
};
