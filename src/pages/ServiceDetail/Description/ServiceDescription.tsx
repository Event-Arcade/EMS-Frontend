import React from "react";
import "./serviceDescription.css";

function ServiceDescription() {
  return (
    <>
      <div className="service-description">
        {/* <p>Service Type <span>:</span>Venue</p>
      <p>Availability <span>:</span>Available</p>
      <p>Rating <span>:</span>4.5</p>
       */}
        {/* <div className="row">
          <div className="col-lg-3" style={{ background: "red" }}>
            <p>Service Type</p>
            <p>Availability</p>
            <p>Rating</p>
          </div>
          <div className="col-lg-9" style={{ background: "blue" }}>
            <p>
              <span>:</span>Venue
            </p>
            <p>
              <span>:</span>Available
            </p>
            <p>
              <span>:</span>4.5
            </p>
            <p><span>:</span>AvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailableAvailable</p>
          </div>
        </div> */}
        <dl className="row">
          <dt className="col-sm-3">Service Type</dt>
          <dd className="col-sm-9">Venue</dd>

          <dt className="col-sm-3">Availability</dt>
          <dd className="col-sm-9">Available</dd>

          <dt className="col-sm-3">Rating</dt>
          <dd className="col-sm-9"><span style={{color:'orange'}}>&#9733;&#9733;&#9733;&#9733;&#9734;</span><span>(4.5)</span></dd>

          <dt className="col-sm-3 text-truncate">Description</dt>
          <dd className="col-sm-9">
            This can be useful when space is tight. Adds an ellipsis at the
            end.This can be useful when space is tight. Adds an ellipsis at the
            end.
          </dd>
        </dl>
      </div>
    </>
  );
}

export default ServiceDescription;
