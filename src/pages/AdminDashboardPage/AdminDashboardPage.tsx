import { useState } from "react";
import "./adminDashboardPage.css";
import PageTitle from "../../components/pageTitle/PageTitle";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer/Footer";

export default function AdminDashboardPage() {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const getSideBarState = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };


  return (
    <>
      <Header getSideBarVisibility={getSideBarState} />
      <div className="page-content-ad">
        {isSideBarVisible ?<div className="col-lg-2"></div>: <div className="col-lg-1"></div>}
        <div className="col-lg-7" style={{ margin: "100px 40px 40px 70px" }}>
          <PageTitle page="Admin Dashboard" />
          <h1> **** Not Implement ****</h1>
        </div>
        <div className="col-lg-2" style={{ background: "none" }}></div>
      </div>
      <Footer />
    </>
  );
}
