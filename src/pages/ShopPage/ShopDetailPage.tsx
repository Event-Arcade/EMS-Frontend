import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Modal } from "react-bootstrap";
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

  // conformation dialog state
  const [show, setShow] = useState(false);

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

  // conformation dialog handlers
  const handleDeleteConform = async () => {
    try {
      const resposne = await dispatch(
        shopDelete(currentShopId as unknown as number)
      ).unwrap();
      handleClose();
      if (resposne) {
        await dispatch(getCurrentUser()).unwrap();
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // conformation dialog handlers
  const handleClose = () => setShow(false);

  return (
    <>
      <Container className="shop-page-container">
        <div
          className="shop-header"
          style={{
            backgroundImage: `url(${currentShop?.backgroundImageURL})`,
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
          <ServiceList services={currentShopServices} />
        </div>
        {user?.id == currentShop?.ownerId && (
          <>
            <div className="update-button">
              <Popup
                trigger={
                  <Button variant="warning" className="button " style={{borderRadius:"20px", width:"200px"}}>
                    {" "}
                    Add New Service{" "}
                  </Button>
                }
                modal
              >
                {
                  // @ts-ignore
                  (close) => (
                    <CreateShopService
                      close={close}
                      shopId={currentShopId || 0}
                    />
                  )
                }
              </Popup>
            </div>
            <div className="update-button">
              <Popup
                trigger={
                  <Button className="button" variant="warning" style={{borderRadius:"20px", width:"200px"}}> Update Shop Details </Button>
                }
                modal
              >
                {
                  // @ts-ignore
                  (close) => <UpdateShop close={close} shop={currentShop} />
                }
              </Popup>
            </div>
            <div className="update-button">
            <Button
              variant="outline-danger"
              style={{borderRadius:"20px", width:"200px"}}
              onClick={() => {
                setShow(true);
              }}
            >
              Delete Shop
            </Button>
            </div>
          </>
        )}
      </Container>

      {/* conformation dialog for shop delete */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this shop?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Shop Name: {currentShop?.name}</li>
            <li>Shop Description: {currentShop?.description}</li>
          </ul>
          <p>
            This action cannot be undone. Are you sure you want to delete this
            shop?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleDeleteConform}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
