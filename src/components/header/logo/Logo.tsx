import "./logo.css";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-between">
      <a
        onClick={() => {
          navigate("/");
        }}
        className="logo d-flex align-items-center"
      >
        <img alt="" src="/src/assets/SiteLogo.png" />
        <span className="d-none d-lg-block">Event Arcade</span>
      </a>
    </div>
  );
}

export default Logo;
