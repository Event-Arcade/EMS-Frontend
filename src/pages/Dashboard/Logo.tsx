import React from "react";
import "./logo.css";

function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href="/" className="logo d-flex align-items-center">
      <img
            alt=""
            src="/src/assets/SiteLogo.png"
           
          />
        <span className="d-none d-lg-block">Event Arcade</span>
      </a>
      <i
        className="bi bi-list toggle-sidebar-btn" onClick={handleToggleSideBar}
        style={{ cursor: 'pointer' }}>
      </i>
    </div>
  );
}

export default Logo;
