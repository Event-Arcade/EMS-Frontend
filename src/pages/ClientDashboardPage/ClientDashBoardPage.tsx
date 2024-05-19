import MiniCalender from '../../components/MiniCalender/MiniCalender';
import PageTitle from '../../components/pageTitle/PageTitle'
import RecentSales from '../../components/planTable/RecentSales';
import ServiceList from '../../components/serviceList/ServiceList';
import DashboardBanner from './DashboardBanner';
import './clientDashBoardPage.css'
import Shop1 from "../../assets/SlidingPic1.jpg";
import Shop2 from "../../assets/SlidingPic2.jpg";
import Shop3 from "../../assets/SlidingPic3.jpg";

interface ClientDashBoardPageProps {
  isSidebarVisible: boolean;
}

function ClientDashBoardPage({isSidebarVisible} : ClientDashBoardPageProps) {

  const servicesData = [
    {
      title: "Hotel Araliya",
      description: "Luxurious hotel with great amenities.",
      src: Shop1,
    },
    {
      title: "Lassna Flora",
      description: "Beautiful floral arrangements for any occasion.",
      src: Shop2,
    },
    {
      title: "DJ Mash",
      description: "Professional DJ services for parties and events.",
      src: Shop3,
    },
    {
      title: "Hotel Araliya",
      description: "Luxurious hotel with great amenities.",
      src: Shop1,
    },
    {
      title: "Lassna Flora",
      description: "Beautiful floral arrangements for any occasion.",
      src: Shop2,
    },
    {
      title: "DJ Mash",
      description: "Professional DJ services for parties and events.",
      src: Shop3,
    },
    {
      title: "Hotel Araliya",
      description: "Luxurious hotel with great amenities.",
      src: Shop1,
    },
    {
      title: "Lassna Flora",
      description: "Beautiful floral arrangements for any occasion.",
      src: Shop2,
    },
    {
      title: "DJ Mash",
      description: "Professional DJ services for parties and events.",
      src: Shop3,
    },
    // Add more services as needed
  ];

  
  return (
    <main id='main' className={`main ${isSidebarVisible ? '' : 'main-centered'}`}>
      <PageTitle page="Dashboard"/>
      <section className="dashboard section" style={{ paddingTop: 0 }}>
      <DashboardBanner />
      <div className="row">
        <div className="col-lg-9">
          <h1
            style={{
              fontWeight: 600,
              display: "flex",
              marginTop: "60px",
              marginBottom: "40px",
              justifyContent: "center",
              color: "rgb(117, 117, 119)",
            }}
          >
            My Services
          </h1>
          <div className="row">
            {/* <ShopCard title="Hotel Araliya" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop1} />
            <ShopCard title="Lassna Flora" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop2}/>
            <ShopCard title="DJ Mash" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop3}/> */}

            <div className="col-12">
              <ServiceList services={servicesData} />
              <h1
                style={{
                  fontWeight: 600,
                  display: "flex",
                  marginTop: "60px",
                  marginBottom: "40px",
                  justifyContent: "center",
                  color: "rgb(117, 117, 119)",
                }}
              >
                My Plans
              </h1>
              <RecentSales />
            </div>
          </div>
        </div>
        <div
          className="col-lg-3"
          style={{ background: "rgb(248, 245, 192) ", paddingTop: "10px" }}
        >
          <h1
            style={{
              fontWeight: 600,
              display: "flex",
              marginTop: "60px",
              marginBottom: "60px",
              justifyContent: "center",
              color: "rgb(117, 117, 119)",
            }}
          >
            Calender
          </h1>
          <MiniCalender />
        </div>
      </div>
    </section>

    </main>
  )
}

export default ClientDashBoardPage