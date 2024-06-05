import Banner from "../../components/Banner/Banner";
import SlidingPanel from "../../components/slidingPanel/SlidingPanel";
import "../../components/TextStyle.css";
import VideoGallery from "../../components/videoGallery/VideoGallery";
import { PictureCard } from "../../components/PictureCard";

export default function HomePage() {
  return (
    <>
      <div className="page-content">
        <SlidingPanel />
        <div className="picture-card-text">Popular Services</div>
        <PictureCard />
        {/* <ServiceList services={servicesData} />  */}
        <Banner />
        <div className="picture-card-text">Featured Videos</div>
        <VideoGallery />
      </div>
    </>
  );
}
