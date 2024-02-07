import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../components/ButtonStyle.css"
import SlidingPic1 from "../assets/SlidingPic1.jpg";
import SlidingPic2 from "../assets/SlidingPic2.jpg";
import SlidingPic3 from "../assets/SlidingPic3.jpg";


export const PictureCard = () => {
  const colStyle = {
    padding: '25px',
  };
  const cardStyle = {
    width: '100%', 
    height: '100%', 
  };
  const imageSources = [SlidingPic1, SlidingPic2, SlidingPic3, SlidingPic1];


  return (
    <Row  xs={1} md={4} className="g-4" >
      {imageSources.map((src, idx) => (
        <Col key={idx} style={colStyle} >
          <Card style={cardStyle}>
            <Card.Img variant="top" src={src} />
            <Card.Body>
              <Card.Title>Hotel Sleek</Card.Title>
              <Card.Text>
                Kegalle
              </Card.Text>
              <Button variant="primary" className='bg-orange '>Visit</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
