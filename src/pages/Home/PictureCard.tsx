import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../../components/ButtonStyle.css";
import SlidingPic1 from "../../assets/SlidingPic1.jpg";
import SlidingPic2 from "../../assets/SlidingPic2.jpg";
import SlidingPic3 from "../../assets/SlidingPic3.jpg";
import { red } from "@mui/material/colors";

export const PictureCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5; // 2 rows of 5 cards each
  const imageSources = [
    SlidingPic1,
    SlidingPic2,
    SlidingPic3,
    SlidingPic1,
    SlidingPic2,
    SlidingPic1,
    SlidingPic2,
    SlidingPic3,
    SlidingPic1,
    SlidingPic2,
    SlidingPic1,
    SlidingPic2,
  ];

  const totalPages = Math.ceil(imageSources.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = imageSources.slice(startIndex, startIndex + cardsPerPage);

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
        {currentCards.map((src, idx) => (
          <Col key={idx} style={colStyle}>
            <Card style={{ width: "210px" }}>
              <Card.Img variant="top" src={src} />
              <Card.Body>
                <Card.Title style={{ fontSize: "15px", fontWeight: 600 }}>
                  Hotel Sleek
                </Card.Title>
                <Card.Text style={{ fontSize: "10px" }}>Kegalle</Card.Text>
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
