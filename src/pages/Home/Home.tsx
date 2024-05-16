import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import NumberList from "../../components/NumberList/NumberList";
// import PictureCard from "./PictureCard";
import SlidingPanel from "../../components/SlidingPanel";
import "../../components/TextStyle.css";
import VideoGallery from "../../components/videoGallery/VideoGallery";
import Header from "../Dashboard/Header";
import { PictureCard } from "./PictureCard";
// import ServiceList from "./PictureCard";

export default function Home() {

  const servicesData = [
    {
      title: "Hotel Araliya",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      src: "https://th.bing.com/th/id/OIP.iY0Zsh7Irc0izbWnibaoLQHaEW?w=314&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      title: "Lassna Flora",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      src: "https://th.bing.com/th/id/R.138008e2bd443a6331ee5fddec5fd8bd?rik=pZwj%2bIxpbipBHA&riu=http%3a%2f%2fwww.pulse.lk%2fwp-content%2fuploads%2f2016%2f08%2fLassana-Flora-01-exterior.jpg&ehk=9bwMj2MLeM35z1zfHLtdw0GYArjJVksFRQoCu40wyNg%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      title: "DJ Mash",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      src: "https://th.bing.com/th/id/OIP.HGgZnjTd-c47IWSfNNCOXAHaHa?rs=1&pid=ImgDetMain",
    },

    {
      title: "Beach Hills",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      src: "https://th.bing.com/th?id=OIF.k%2bJ8SVBCerBVTQXyr7pRjA&rs=1&pid=ImgDetMain",
    },

    {
      title: "Rangadara",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      src: "https://th.bing.com/th/id/R.906088ad55fa17f886ccf207fd40b9bb?rik=caWSr4ms0Rdxrw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-OTvmxGCBvBQ%2fTwzyTq4HSNI%2fAAAAAAAAG8Q%2f5_lpsDkJy4U%2fs1600%2fCHANNA%2b4.jpg&ehk=CX1N7aI%2fhjgt6pLqzJbSYljE6QwIyZhfqsDJIgmDmN0%3d&risl=&pid=ImgRaw&r=0",
    },

    {
      title: "Rangadara",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      src: "https://th.bing.com/th/id/R.906088ad55fa17f886ccf207fd40b9bb?rik=caWSr4ms0Rdxrw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-OTvmxGCBvBQ%2fTwzyTq4HSNI%2fAAAAAAAAG8Q%2f5_lpsDkJy4U%2fs1600%2fCHANNA%2b4.jpg&ehk=CX1N7aI%2fhjgt6pLqzJbSYljE6QwIyZhfqsDJIgmDmN0%3d&risl=&pid=ImgRaw&r=0",
    },
    
  ]
  return (
    <>
      <div className="page-content">
        <Header
          toggleSideBar={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <br></br>
        <SlidingPanel />
        <div className="picture-card-text">Popular Services</div>
        <PictureCard />
        {/* <ServiceList services={servicesData} />  */}
        {/* <NumberList /> */}
        <Banner />
        <div className="picture-card-text">Featured Videos</div>
        <VideoGallery />
        <Footer />
      </div>
    </>
  );
}
