import { useState } from "react";
import MiniCalender from "../../components/MiniCalender/MiniCalender";
import PageTitle from "../../components/pageTitle/PageTitle";
import RecentSales from "../../components/planTable/RecentSales";
import ServiceList from "../../components/serviceList/ServiceList";
import "./clientDashBoardPage.css";
import { useAppSelector } from "../../store/hooks";
import PackageTable from "../../components/PackageTable/PackageTable";

function ClientDashBoardPage() {
  const { shopServices } = useAppSelector((state) => state.service);

  return (
    <>
      <main
        id="main"
        className={`main`}
      >
        <section className="dashboard section" style={{ paddingTop: 0 }}>
          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                <div className="col-12">
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
                </div>
                <PackageTable />
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
