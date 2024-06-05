import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ServiceList from "../../components/serviceList/ServiceList";
import { Popup } from "reactjs-popup";
import CreateShopService from "../../features/shopServices/CreateShopService";
import "./shopPage.css";
import UpdateShop from "../../features/shops/UpdateShopDetails";
import { shopDelete } from "../../features/shops/ShopSlice";
import { getCurrentUser } from "../../features/accounts/UserAccountSlice";

export default function ShopDetailPage() {
  const { shops } = useAppSelector((state) => state.shop);
  const { shopServices } = useAppSelector((state) => state.service);
  const { user } = useAppSelector((state) => state.account);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentShopId = useMemo(() => {
    return id ? Number(id) : null;
  }, [id]);

  const currentShop = useMemo(() => {
    return shops.find((s) => s.id == currentShopId);
  }, [shops, currentShopId]);

  const currentShopServices = useMemo(() => {
    return shopServices.filter((s) => s.shopId == currentShopId);
  }, [shopServices, currentShopId]);

  useEffect(() => {
    if (!currentShopId) {
      navigate("/");
    }
  }, [shops, shopServices]);

  const handleDelete = async () => {
    // TODO: add confirmation dialog
    try {
      const resposne = await dispatch(
        shopDelete(currentShopId as unknown as number)
      ).unwrap();
      if (resposne) {
        await dispatch(getCurrentUser()).unwrap();
        navigate("/");
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
            backgroundImage: `url(${
              currentShop?.backgroundImageURL
            })`,
          }}
        >
          <div className="shop-header-overlay"></div>
          <div className="shop-header-content">
            <h1>{currentShop?.name}</h1>
          </div>
        </div>
        <div className="shop-info">
          <h1>{currentShop?.name}</h1>
          <p>{currentShop?.description}</p>
          <p>Owner ID: {currentShop?.ownerId}</p>
          <p>Rating: {currentShop?.rating}</p>
        </div>
        <div className="service-list">
          <ServiceList
            services={currentShopServices}
          />
        </div>
        {user?.id == currentShop?.ownerId &&
          <>
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
                {
                  // @ts-ignore
                  (close) => (
                    <CreateShopService close={close} shopId={currentShopId || 0} />
                  )
                }
              </Popup>
            </div>
            <div className="update-button">
              <Popup
                trigger={
                  <Button className="button"> Update Shop Details </Button>
                }
                modal
              >
                {
                  // @ts-ignore
                  (close) => <UpdateShop close={close} shop={currentShop} />
                }
              </Popup>
            </div>
            <Button variant="danger" onClick={handleDelete}>
              Delete Shop
            </Button>
          </>
        }
      </Container>
    </>
  );
}
