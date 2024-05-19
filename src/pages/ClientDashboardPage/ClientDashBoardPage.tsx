import { useState } from "react";
import MiniCalender from "../../components/MiniCalender/MiniCalender";
import Header from "../../components/header/Header";
import PageTitle from "../../components/pageTitle/PageTitle";
import RecentSales from "../../components/planTable/RecentSales";
import ServiceList from "../../components/serviceList/ServiceList";
import DashboardBanner from "./DashboardBanner";
import "./clientDashBoardPage.css";
import { useAppSelector } from "../../store/hooks";

function ClientDashBoardPage() {
  const {shopServices} = useAppSelector((state)=>state.service);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const getSidebarState = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <>
      <Header getSideBarVisibility={getSidebarState} />
      <main
        id="main"
        className={`main ${isSidebarVisible ? "" : "main-centered"}`}
      >
        <PageTitle title={"Client"} page="Dashboard" />
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
                Check Out This Services
              </h1>
              <div className="row">
                {/* <ShopCard title="Hotel Araliya" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop1} />
            <ShopCard title="Lassna Flora" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop2}/>
            <ShopCard title="DJ Mash" description="Some quick example text to build on the card title and make up the bulk of the card's content." src={Shop3}/> */}

                <div className="col-12">
                  <ServiceList services={shopServices} />
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
    </>
  );
}

export default ClientDashBoardPage;
