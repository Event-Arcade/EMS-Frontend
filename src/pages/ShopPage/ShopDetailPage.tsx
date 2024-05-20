import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import SlidingPanel from "../../components/slidingPanel/SlidingPanel";
import PageTitle from "../../components/pageTitle/PageTitle";
import { useAppSelector } from "../../store/hooks";
import Shop from "../../interfaces/Shop";
import ServiceList from "../../components/serviceList/ServiceList";
import ShopService from "../../interfaces/ShopService";
import Header from "../../components/header/Header";
import { Popup } from "reactjs-popup";
import CreateShopService from "../../features/shopServices/CreateShopService";
import "./shopPage.css";
import UpdateShop from "../../features/shops/UpdateShopDetails";

export default function ShopDetailPage() {
  const { shops } = useAppSelector((state) => state.shop);
  const { shopServices } = useAppSelector((state) => state.service);
  const [shop, setShop] = useState<Shop>();
  const [services, setServices] = useState<ShopService[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const shop = shops.find((shop) => shop.ownerId === id);
      if (shop) {
        setShop(shop);
        const tempShopServices = shopServices.filter(
          (service) => service.shopId === (shop.id as unknown as number)
        );
        setServices(tempShopServices);
      } else {
        navigate("/");
      }
    }
  }, [id, shops, shopServices, navigate]);

  return (
    <>
      <Header getSideBarVisibility={function (): void {}} />
      <Container className="shop-page-container">
        <div
          className="shop-header"
          style={{
            backgroundImage: `url(${shop?.backgroundImageURL})`,
          }}
        >
          <div className="shop-header-overlay"></div>
          <div className="shop-header-content">
            <h1>{shop?.name}</h1>
          </div>
        </div>
        <div className="shop-info">
          <h1>{shop?.name}</h1>
          <p>{shop?.description}</p>
          <p>Owner ID: {shop?.ownerId}</p>
          <p>Rating: {shop?.rating}</p>
        </div>
        <div className="service-list">
          <PageTitle title="Services" page={`Shop/${shop?.id}`} />
          <ServiceList services={services} />
        </div>
        <div className="update-button">
        <Popup trigger={<Button variant="success" className="button "> Add New Service </Button>} modal>
            {(close) => <CreateShopService close={close} shopId={shop?.id} />}
          </Popup>
        </div>
        <div className="update-button">
          
          <Popup trigger={<Button className="button"> Update Shop Details </Button>} modal>
            {(close) => <UpdateShop close={close} shop={shop}/>}
          </Popup>
        </div>
      </Container>
      <Footer />
    </>
  );
}
