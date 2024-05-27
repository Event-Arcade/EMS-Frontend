import React, { useEffect, useState } from "react";
import "./serviceDetailPage.css";
import Header from "../../../components/header/Header";
import ShopPageHeading from "../ShopDetails/ShopPageHeading";
import ShopDetailForm from "../ShopDetails/ShopDetailForm";
import Footer from "../../../components/Footer/Footer";
import FeedbackList from "../../../features/feedBacks/FeeddbackList/FeedbackList";
import { useAppSelector } from "../../../store/hooks";
import { useParams } from "react-router-dom";
import FeedBack from "../../../interfaces/FeedBack";
import ShopService from "../../../interfaces/ShopService";
import Shop from "../../../interfaces/Shop";

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams();
  const { feedBacks } = useAppSelector((state) => state.feedback);
  const { shopServices } = useAppSelector((state) => state.service);
  const { shops } = useAppSelector((state) => state.shop);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [serviceFeedbacks, setServiceFeedbacks] = useState<FeedBack[]>([]);
  const [currentShopService, setCurrentShopService] = useState<ShopService>();
  const [currentShop, setCurrentShop] = useState<Shop>();
  useEffect(() => {
    const feedbacks = feedBacks.filter(
      (feedback) => feedback.serviceId === parseInt(id!)
    );

    const tempService = shopServices.find(
      (service) => service.id === parseInt(id!)
    );
    const tempShop = shops.find((s) => s.id === tempService?.shopId);
    setCurrentShop(tempShop);
    setCurrentShopService(tempService);
    setServiceFeedbacks(feedbacks);
  }, [feedBacks, id, shopServices, shops]);

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  const [isShopFormOpen, setIsShopFormOpen] = useState(false);

  const openShopForm = () => {
    setIsShopFormOpen(true);
  };
  return (
    <>
      <div className={`sd-page ${isShopFormOpen ? "blur-background" : ""}`}>
        <ShopPageHeading />
        <ShopDetailForm />
        <FeedbackList
          feedbacks={serviceFeedbacks}
          shopOwner={`${currentShop?.ownerId}`}
          serviceId={parseInt(id!)}
        />
        <Footer />
      </div>
    </>
  );
};

export default ServiceDetailPage;
