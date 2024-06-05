import PageTitle from "../../components/pageTitle/PageTitle";
import VendorSubPackageTable from "../../components/vendorSubPackageTable/VendorSubPackageTable";

export default function VendorDashboardPage() {


  return (
    <>
      <div className="page-content-ad">
        <div className="col-lg-7" style={{ margin: "100px 40px 40px 70px" }}>
          <PageTitle title="vendor" page="Vendor Dashboard" />
        </div>
      </div>
        <VendorSubPackageTable />
    </>
  );
}
