import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../components/ButtonStyle.css";
import SlidingPic1 from "../assets/SlidingPic1.jpg";
import SlidingPic2 from "../assets/SlidingPic2.jpg";
import SlidingPic3 from "../assets/SlidingPic3.jpg";

export const PictureCard = () => {
  const colStyle = {
    padding: "25px",
  };
  const cardStyle = {
    width: "100%",
    height: "100%",
  };
  const imageSources = [
    SlidingPic1,
    SlidingPic2,
    SlidingPic3,
    SlidingPic1,
    SlidingPic2,
  ];

  return (
    <Row
      xs={1}
      md={5}
      className="g-4"
      style={{ paddingLeft: "80px", paddingRight: "80px" }}
    >
      {imageSources.map((src, idx) => (
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
                className="bg-orange "
                style={{
                  width: "100px",
                  borderColor: "red",
                  borderRadius: "20px"
                }}
              >
                Visit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
