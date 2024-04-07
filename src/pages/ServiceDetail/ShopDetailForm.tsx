import React from "react";
import "./shopDetailForm.css";
import SmallPictureBox from "./SmallPictureBox";
import ServiceDescription from "./ServiceDescription";
import ButtonSection from "./ButtonSection";

function ShopDetailForm() {
  return (
    <div className="sd-form">
      <div className="row">
        <div className="col-lg-2" style={{ background: "purple" }}></div>
        <div className="col-lg-4" style={{ background: "blue" }}>
          <SmallPictureBox />
        </div>
        <div className="col-lg-5" style={{ background: "black" }}>
          <ServiceDescription />
          <ButtonSection/>
        </div>
        <div className="col-lg-1" style={{ background: "pink" }}></div>
      </div>
    </div>
  );
}

export default ShopDetailForm;
