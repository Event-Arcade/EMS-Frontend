import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./ButtonStyle.css";
import { useAppSelector } from "../store/hooks";

export const PictureCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {shopServices} = useAppSelector((state) => state.service);

  const cardsPerPage = 5; // 2 rows of 5 cards each
  const totalPages = Math.ceil(shopServices.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = shopServices.slice(startIndex, startIndex + cardsPerPage);

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

  const colStyle = {
    padding: "25px",
    margin: "0",
    backgroundColor:"#E0E0E0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
  };

  return (
    <>
      <Row
        xs={1}
        md={5}
        className="g-4"
        style={{ paddingLeft: "150px", paddingRight: "150px",marginTop:"100px"}}
      >
        {shopServices.map((service, idx) => (
          <Col key={idx} style={colStyle}>
            <Card style={{ width: "210px" }}>
              <Card.Img variant="top" src={service.shopServiceStaticResourcesURLs && service.shopServiceStaticResourcesURLs[0] || " "} />
              <Card.Body>
                <Card.Title style={{ fontSize: "15px", fontWeight: 600 }}>
                  {service.name}
                </Card.Title>
                <Card.Text style={{ fontSize: "10px" }}>{service.description}</Card.Text>
                <Button
                  variant="primary"
                  className="bg-orange"
                  style={{
                    width: "100px",
                    borderColor: "red",
                    borderRadius: "20px",
                  }}
                >
                  Visit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          variant="secondary"
          style={{ marginRight: '10px' }}
        >
          Previous
        </Button>
        <span style={{ alignSelf: 'center' }}>Page {currentPage} of {totalPages}</span>
        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          variant="secondary"
          style={{ marginLeft: '10px' }}
        >
          Next
        </Button>
      </div>
    </>
  );
};
