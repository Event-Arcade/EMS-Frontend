import "./pageTitle.css";

interface PageTitleProps{
  title: string;
  page: string
}

function PageTitle({ title, page }: PageTitleProps) {
  return (
    <div className="pagetitle">
      <h1>{title}</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a >
              <i className="bi bi-house-door"></i>
            </a>
          </li>
          
          <li className="breadcrumb-item active">{page}</li>
        </ol>
      </nav>
    </div>
  );
}

export default PageTitle;
