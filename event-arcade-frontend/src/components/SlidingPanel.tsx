import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import SlidingPic1 from "../assets/SlidingPic1.jpg";
import SlidingPic2 from "../assets/SlidingPic2.jpg";
import SlidingPic3 from "../assets/SlidingPic3.jpg";

export default function SlidingPanel() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          style={{ height: 800 }}
          className="d-block w-100"
          src={SlidingPic3}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5 style={{ fontSize: 50, color: "white", fontFamily: "Dotum" }}>
            First slide label
          </h5>
          <p
            style={{
              fontSize: 30,
              color: "white",
              fontFamily: "Copperplate Gothic",
            }}
          >
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </p>
          <Button variant="warning" style={{color:"white",width:100}}>Visit</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: 800 }}
          className="d-block w-100"
          src={SlidingPic2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5 style={{ fontSize: 50, color: "white", fontFamily: "Dotum" }}>
            Second slide label
          </h5>
          <p
            style={{
              fontSize: 30,
              color: "white",
              fontFamily: "Copperplate Gothic",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <Button variant="warning" style={{color:"white",width:100}}>Visit</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: 800 }}
          className="d-block w-100"
          src={SlidingPic1}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5 style={{ fontSize: 50, color: "white", fontFamily: "Dotum" }}>
            Third slide label
          </h5>
          <p
            style={{
              fontSize: 30,
              color: "white",
              fontFamily: "Copperplate Gothic",
            }}
          >
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
          <Button variant="warning" style={{color:"white",width:100}}>Visit</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
