import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./shopPage.css";
import SlidingPanel from "../../components/slidingPanel/SlidingPanel";
import PageTitle from "../../components/pageTitle/PageTitle";
import { useAppSelector } from "../../store/hooks";
import Shop from "../../interfaces/Shop";
import ServiceList from "../../components/serviceList/ServiceList";
import ShopService from "../../interfaces/ShopService";
import { Button } from "react-bootstrap";

export default function ShopDetailPage() {
  const { shops } = useAppSelector((state) => state.shop);
  const { shopServices } = useAppSelector((state) => state.service);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
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
          (service) => service.shopId === shop.id
        );
        setServices(tempShopServices);
      } else {
        //TODO : implement not found page
        navigate("/");
      }
    }
  }, [id]);

  const getSideBarState = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };
  return (
    <>
      <div className="page-content-ad">
        {isSideBarVisible ? (
          <div className="col-lg-2"></div>
        ) : (
          <div className="col-lg-1"></div>
        )}
        <div className="col-lg-7" style={{ margin: "100px 40px 40px 70px" }}>
          <PageTitle page="Admin Dashboard" />
          <SlidingPanel />
          {
            /* {
            Display shop details
          } */
            shop && (
              <div className="shop-details">
                <div className="shop-image">
                  <img src={shop.backgroundImageUrl} alt="shop" />
                </div>
                <div className="shop-info">
                  <h1>{shop.name}</h1>
                  <p>{shop.description}</p>
                  <p>{shop.ownerId}</p>
                  <p>{shop.rating}</p>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className="col-lg-2" style={{ background: "none" }}></div>
      {/* //TODO: Add a button and form for add new service */}
      <Button
        onClick={() => {
          navigate("/vendor/add-new-serivce");
        }}
      >
        Add New Service
      </Button>
      <ServiceList services={services} />
      <Footer />
    </>
  );
}
