import React, { useState } from "react";
import "./serviceDetailPage.css";
import Header from "../../Dashboard/Header";
import { red } from "@mui/material/colors";
import SmallPictureBox from "../ShopDetails/SmallPictureBox";
import ShopPageHeading from "../ShopDetails/ShopPageHeading";
import ShopDetailForm from "../ShopDetails/ShopDetailForm";
import Footer from "../../../components/Footer/Footer";
import FeedbackSection from "../Feeddback/FeedbackSection";

const ServiceDetailPage: React.FC = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  const [isShopFormOpen, setIsShopFormOpen] = useState(false);

  const openShopForm = () => {
    setIsShopFormOpen(true);
  };
  return (
    <>
      <Header toggleSideBar={toggleSideBar} />
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
        <FeedbackSection />
        <Footer />
      </div>
    </>
  );
};

export default ServiceDetailPage;
