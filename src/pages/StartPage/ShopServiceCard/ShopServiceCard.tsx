import { Badge, Carousel } from "react-bootstrap";
import "./shopServiceCard.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addSubPackage } from "../../../features/package/PackageSlice";
import SubPackage from '../../../interfaces/SubPackage';

interface ShopService {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  shopServiceStaticResourcesURLs: string[];
}

export default function ShopServiceCard({
  shopService,
}: {
  shopService: ShopService;
}) {
  const naviagate = useNavigate();
  const dispatch = useAppDispatch();
  const { description, orderDate } = useAppSelector((state) => state.package);

  const handleClick = () => {
    const data: SubPackage = {
      description: description,
      orderTime: orderDate,
      serviceId: shopService.id,
    };
    try {
      dispatch(addSubPackage(data));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="Service-form-item">
      <Carousel>
        {shopService.shopServiceStaticResourcesURLs &&
          shopService.shopServiceStaticResourcesURLs.map((url, index) => (
            <Carousel.Item key={index}>
              <div className="Service-form-img">
                <img src={url} alt={`Slide ${index}`} />
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
      <div className="Service-form-content">
        <div className="Service-form-title">{shopService.name}</div>
        <div className="Service-form-des">{shopService.description}</div>
        <div className="Service-form-price">{shopService.price}</div>
        <div className="Service-form-rating">
          <Badge bg="warning" text="dark">
            {shopService.rating} <i className="fa fa-star"></i>
          </Badge>
        </div>
        <div className="Service-form-button-row">
          <button className="Service-form-add" onClick={handleClick}>
            Book
          </button>
          <button
            className="Service-form-visit"
            onClick={() => {
              naviagate(`/shop-service/${shopService.id}`);
            }}
          >
            Visit
          </button>
        </div>
      </div>
    </div>
  );
}
