import Banner from "../../components/Banner/Banner";
import SlidingPanel from "../../components/slidingPanel/SlidingPanel";
import "../../components/TextStyle.css";
import { PictureCard } from "../../components/PictureCard/PictureCard";

export default function HomePage() {
  return (
    <>
      <div className="page-content">
        <SlidingPanel />
        <div className="picture-card-main-text">Popular Services</div>
        <hr className="picture-card-line"></hr>
        <PictureCard />
        <Banner />
      </div>
    </>
  );
}
