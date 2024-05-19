import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import SlidingPic1 from "./SlidingPic1.jpg";
import SlidingPic2 from "./SlidingPic2.jpg";
import SlidingPic3 from "./SlidingPic3.jpg";

export default function SlidingPanel() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          style={{ height: 700, filter: 'brightness(90%)' }}
          className="d-block w-100"
          src={SlidingPic3}
          alt="First slide"
        />
        <Carousel.Caption style={{paddingBottom:'100px'}}>
          <h5 style={{ fontSize: 70, color: "white", fontFamily: "Dotum" ,paddingBottom:'50px',fontWeight:600}}>
            Welcome To Event Arcade
          </h5>
          <hr></hr>
          <p
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: "Copperplate Gothic",
            }}
          >
            Embark on a journey of unforgettable celebrations with Event Arcade.
            From meticulous planning to flawless execution, we've got your
            celebrations covered. Start creating unforgettable moments today!{" "}
          </p>
          <Button variant="warning" style={{ color: "white", width: 100 }}>
            Visit
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: 700 }}
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
          <Button variant="warning" style={{ color: "white", width: 100 }}>
            Visit
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: 700 }}
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
          <Button variant="warning" style={{ color: "white", width: 100 }}>
            Visit
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
