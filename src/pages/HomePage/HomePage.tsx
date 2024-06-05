import Banner from "../../components/Banner/Banner";
import SlidingPanel from "../../components/slidingPanel/SlidingPanel";
import "../../components/TextStyle.css";
import { PictureCard } from "../../components/PictureCard";

export default function HomePage() {
  return (
    <>
      <div className="page-content">
        <SlidingPanel />
        <div className="picture-card-text">Popular Services</div>
        <PictureCard />
        <Banner />
      </div>
    </>
  );
}
