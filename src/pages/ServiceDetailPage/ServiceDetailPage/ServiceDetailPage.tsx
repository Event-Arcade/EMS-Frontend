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

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams();
  const { feedBacks } = useAppSelector((state) => state.feedback);
  const { shopServices } = useAppSelector((state) => state.service);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [serviceFeedbacks, setServiceFeedbacks] = useState<FeedBack[]>([]);

  useEffect(() => {
    const feedbacks = feedBacks.filter(
      (feedback) => feedback.serviceId === parseInt(id || "")
    );
    setServiceFeedbacks(feedbacks);
  }, [feedBacks, id, shopServices]);

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  const [isShopFormOpen, setIsShopFormOpen] = useState(false);

  const openShopForm = () => {
    setIsShopFormOpen(true);
  };
  return (
    <>
      {/* { //TODO: not impleneted} */}
      <Header
        getSideBarVisibility={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className={`sd-page ${isShopFormOpen ? "blur-background" : ""}`}>
        {/* <div className="row">
      <div className="col-lg-3" style={{background:"red"}}>
        <SmallPictureBox/>
      </div>
      <div className="col-lg-4" style={{background:"blue"}}></div>
      <div className="col-lg-5" style={{background:"green"}}></div>
      </div> */}
        <ShopPageHeading />
        <ShopDetailForm />
        <FeedbackList feedbacks={serviceFeedbacks} />
        <Footer />
      </div>
    </>
  );
};

export default ServiceDetailPage;
