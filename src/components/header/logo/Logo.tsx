import "./logo.css";

function Logo() {
  
  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href="/" className="logo d-flex align-items-center">
      <img
            alt=""
            src="/src/assets/SiteLogo.png"
           
          />
        <span className="d-none d-lg-block">Event Arcade</span>
      </a>
    </div>
  );
}

export default Logo;
