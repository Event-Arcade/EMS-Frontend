import { useNavigate } from "react-router-dom";
import "./banner.css";
import bannerImg from "./bannerImg.png";
import { useAppSelector } from "../../store/hooks";

function Banner() {
  const { user } = useAppSelector((state) => state.account);
  const navigate = useNavigate();

  const handleStart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/startpage");
  };

  return (
    <div className="banner-body">
      <div className="banner-left">
        <div className="banner-text">
          <h1 className="banner-text-heading">Find the Perfect Venue</h1>
          <p className="banner-text-paragraph">
            Create memories that last a lifetime.Unveil the magic of
            unforgettable moments with Event Arcade. From intimate gatherings to
            grand celebrations, we turn your dreams into reality. Your journey
            to extraordinary events starts here.
          </p>
          <hr />
          <button className="custom-banner-button" onClick={handleStart}>
            Lets Start
          </button>
        </div>
      </div>
      <div className="banner-right">
        <img
          style={{ width: "100%", height: "100%" }}
          src={bannerImg}
          alt="banner"
        />
      </div>
    </div>
  );
}

export default Banner;
