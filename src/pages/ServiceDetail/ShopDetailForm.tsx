import React from "react";
import "./shopDetailForm.css";
import SmallPictureBox from "./SmallPictureBox";

function ShopDetailForm() {
  return (
    <div className="sd-form">
      <div className="row">
        <div className="col-lg-2" style={{ background: "red" }}></div>
        <div className="col-lg-4" style={{ background: "blue" }}>
          <SmallPictureBox/>
        </div>
        <div className="col-lg-4" style={{ background: "black" }}></div>
        <div className="col-lg-2" style={{ background: "pink" }}></div>
      </div>
    </div>
  );
}

export default ShopDetailForm;
