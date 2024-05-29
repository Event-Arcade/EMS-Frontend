import { useState } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import Footer from "../../components/Footer/Footer";
import VendorSubPackageTable from "../../components/vendorSubPackageTable/VendorSubPackageTable";

export default function VendorDashboardPage() {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const getSideBarState = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  return (
    <>
      <div className="page-content-ad">
        {isSideBarVisible ? (
          <div className="col-lg-2"></div>
        ) : (
          <div className="col-lg-1"></div>
        )}
        <div className="col-lg-7" style={{ margin: "100px 40px 40px 70px" }}>
          <PageTitle title="vendor" page="Vendor Dashboard" />
        </div>
      </div>
        <VendorSubPackageTable />
      <Footer />
    </>
  );
}
