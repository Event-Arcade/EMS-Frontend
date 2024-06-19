import { useState } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import AdminStaticResourceList from "../../features/adminStaticResources/AdminStaticResourceList";
import CreateAdminStaticResourceForm from "../../features/adminStaticResources/CreateAdminStaticResourceForm";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer/Footer";

export default function StaticResourceManagementPage() {
  const [isSideBarVisible, setIsSideBarVisible] = useState(true);

  const getSideBarState = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };
  return (
    <>
      <div className="page-content-ad">
        {!isSideBarVisible ? (
          <div className="col-lg-2"></div>
        ) : (
          <div className="col-lg-1"></div>
        )}
        <div className="col-lg-7" style={{ margin: "40px 40px 40px 0px" }}>
          <PageTitle page={"Static Resources"} title={""}  />
          <CreateAdminStaticResourceForm />
          <AdminStaticResourceList />
        </div>
        <div className="col-lg-2" style={{ background: "none" }}></div>
      </div>
    </>
  );
}
