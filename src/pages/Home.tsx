import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import NumberList from "../components/NumberList/NumberList";
import { PictureCard } from "../components/PictureCard";
import SlidingPanel from "../components/SlidingPanel";
import "../components/TextStyle.css";
import VideoGallery from "../components/videoGallery/VideoGallery";
import Header from "./Dashboard/Header";

export default function Home() {
  return (
    <>
      <div className="page-content">
        <Header />
        <br></br>
        <SlidingPanel />
        <div className="picture-card-text">Popular Services</div>
        <PictureCard />
        <NumberList />
        <Banner />
        <div className="picture-card-text">Featured Videos</div>
        <VideoGallery />
        <Footer />
      </div>
    </>
  );
}
