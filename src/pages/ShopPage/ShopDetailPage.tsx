import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/pageTitle/PageTitle";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Shop from "../../interfaces/Shop";
import ServiceList from "../../components/serviceList/ServiceList";
import ShopService from "../../interfaces/ShopService";
import Header from "../../components/header/Header";
import { Popup } from "reactjs-popup";
import CreateShopService from "../../features/shopServices/CreateShopService";
import "./shopPage.css";
import UpdateShop from "../../features/shops/UpdateShopDetails";
import { shopDelete } from "../../features/shops/ShopSlice";
import { getCurrentUser } from "../../features/accounts/UserAccountSlice";
import { toast } from "react-toastify";

export default function ShopDetailPage() {
  const { shops } = useAppSelector((state) => state.shop);
  const { shopServices } = useAppSelector((state) => state.service);
  const [shop, setShop] = useState<Shop>();
  const [services, setServices] = useState<ShopService[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      const tempShop = shops.find((shop) => shop.id == Number(id));
      if (tempShop) {
        setShop(tempShop);
        const tempShopServices = shopServices.filter(
          (service) => service.shopId == tempShop.id
        );
        setServices(tempShopServices);
      } else {
        toast.error("Shop not found");
        navigate("/");
      }
    }
  }, [id, shops, shopServices]);

  const handleDelete = async () => {
    // TODO: add confirmation dialog
    try {
      if (shop) {
        const resposne = await dispatch(
          shopDelete(shop.id as unknown as number)
        ).unwrap();
        if (resposne) {
          await dispatch(getCurrentUser()).unwrap();
          navigate("/");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
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
          <ServiceList services={services} />
        </div>
        <div className="update-button">
          <Popup
            trigger={
              <Button variant="success" className="button ">
                {" "}
                Add New Service{" "}
              </Button>
            }
            modal
          >
            {(close) => <CreateShopService close={close} shopId={shop?.id} />}
          </Popup>
        </div>
        <div className="update-button">
          <Popup
            trigger={<Button className="button"> Update Shop Details </Button>}
            modal
          >
            {(close) => <UpdateShop close={close} shop={shop} />}
          </Popup>
        </div>
        <Button variant="danger" onClick={handleDelete}>
          Delete Shop
        </Button>
      </Container>
      <Footer />
    </>
  );
}
