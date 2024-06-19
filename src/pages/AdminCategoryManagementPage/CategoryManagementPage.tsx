import PageTitle from "../../components/pageTitle/PageTitle";
import CategoryList from "../../features/categories/CategoryList";
import CreateCategoryForm from "../../features/categories/CreateCategoryForm";

export default function CategoryManagementPage() {
  return (
    <>
      <div className="page-content-ad">
        <div className="col-lg-7" style={{ margin: "40px 40px 40px 40px" }}>
          <PageTitle page={"Category Management"} title={""} />
          <CreateCategoryForm />
          <CategoryList />
        </div>
        <div className="col-lg-2" style={{ background: "none" }}></div>
      </div>
    </>
  );
}
