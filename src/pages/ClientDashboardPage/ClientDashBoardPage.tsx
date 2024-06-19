import MiniCalender from "../../components/MiniCalender/MiniCalender";
import "./clientDashBoardPage.css";
import { useAppSelector } from "../../store/hooks";
import PackageTable from "../../components/PackageTable/PackageTable";
import "./clientDashBoardPage.css";
import PageTitle from "../../components/pageTitle/PageTitle";
import { Col, Row } from "react-bootstrap";

function ClientDashBoardPage() {
  const { shopServices } = useAppSelector((state) => state.service);

  return (
    <>
      {/* <main
        id="main"
        className={`main`}
      > */}
      <section className="dashboard-section" style={{ paddingTop: 40 }}>
        <section
          className="dashboard-section-header"
          style={{ paddingLeft: "80px" }}
        >
          <PageTitle page={"User Dashboard"} title={""} />
          <Row className="mb-4">
            <Col>
              <h4 className="dashboard-main-topic" style={{ color: "#f68905" }}>
                Dashboard
              </h4>
              <h5 style={{ marginTop: "50px" }}>My Plans</h5>
            </Col>
          </Row>
        </section>
        <div>
          {/* <div className="col-lg-9">
              <div className="row">
                <div className="col-12"> */}
          {/* <h1
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
          </h1> */}
          {/* </div> */}
          <PackageTable />
          {/* </div> */}
          {/* </div> */}
          {/* <div
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
            </div> */}
        </div>
      </section>
      {/* </main> */}
    </>
  );
}

export default ClientDashBoardPage;
