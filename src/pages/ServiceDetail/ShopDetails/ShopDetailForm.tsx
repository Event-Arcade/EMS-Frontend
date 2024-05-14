import React from "react";
import "./shopDetailForm.css";
import SmallPictureBox from "./SmallPictureBox";
import ServiceDescription from "../Description/ServiceDescription";
import ButtonSection from "../Button/ButtonSection";

function ShopDetailForm() {
  return (
    <div className="sd-form">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-4">
          <SmallPictureBox />
        </div>
        <div className="col-lg-5">
          <ServiceDescription />
          <ButtonSection />
        </div>
        <div className="col-lg-1"></div>
      </div>
    </div>
  );
}

export default ShopDetailForm;
