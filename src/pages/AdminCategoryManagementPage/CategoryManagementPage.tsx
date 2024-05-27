import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import PageTitle from "../../components/pageTitle/PageTitle";
import CategoryList from "../../features/categories/CategoryList";
import CreateCategoryForm from "../../features/categories/CreateCategoryForm";

export default function CategoryManagementPage() {
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
        <div className="col-lg-7" style={{ margin: "100px 40px 40px 70px" }}>
          <PageTitle page={"Category Management"} title={""} />
          <CreateCategoryForm />
          <CategoryList />
        </div>
        <div className="col-lg-2" style={{ background: "none" }}></div>
      </div>
      <Footer />
    </>
  );
}
