import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import SlidingPic1 from "./../../assets/images/HomepageSlidingPannel/SlidingPic1.jpg";
import SlidingPic2 from "./../../assets/images/HomepageSlidingPannel/SlidingPic2.jpg";
import SlidingPic3 from "./../../assets/images/HomepageSlidingPannel/SlidingPic3.jpg";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

export default function SlidingPanel() {
  const navigate = useNavigate();
  const { shopServices } = useAppSelector((state) => state.service);

  if (shopServices.length === 0) {
    return (
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            style={{ height: 700, filter: "brightness(90%)" }}
            className="d-block w-100"
            src={SlidingPic3}
            alt="First slide"
          />
          <Carousel.Caption style={{ paddingBottom: "100px" }}>
            <h5
              style={{
                fontSize: 70,
                color: "white",
                fontFamily: "Dotum",
                paddingBottom: "50px",
                fontWeight: 600,
              }}
            >
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
              Embark on a journey of unforgettable celebrations with Event
              Arcade. From meticulous planning to flawless execution, we've got
              your celebrations covered. Start creating unforgettable moments
              today!{" "}
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
  } else {
    return (
      <Carousel data-bs-theme="dark">
        {shopServices.map((service) => (
          <Carousel.Item key={service.id}>
            <img
              style={{ height: 700 }}
              className="d-block w-100"
              src={
                service.shopServiceStaticResourcesURLs
                  ? service.shopServiceStaticResourcesURLs[0]
                  : ""
              }
              alt={SlidingPic1}
            />
            <Carousel.Caption>
              <h5
                style={{
                  fontSize: 50,
                  color: "white",
                  fontFamily: "Dotum",
                }}
              >
                {service.name}
              </h5>
              <p
                style={{
                  fontSize: 30,
                  color: "white",
                  fontFamily: "Copperplate Gothic",
                }}
              >
                {service.description}
              </p>
              <Button
                variant="warning"
                style={{ color: "white", width: 100 }}
                onClick={() => {
                  navigate(`/shop-service/${service.id}`);
                }}
              >
                Visit
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}
