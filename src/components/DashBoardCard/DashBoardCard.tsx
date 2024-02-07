import Card from "react-bootstrap/Card";

function DashBoardCard() {
  return (
    <><div className="dashboard-container">
      {["Light"].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === "light" ? "dark" : "white"}
          style={{ width: "18rem" }}
          className="mb-2"
        >
          <Card.Header>Plan 01</Card.Header>
          <Card.Body>
            {/* <Card.Title>{variant} Card Title </Card.Title> */}
            <Card.Text>
              Function Type : Wedding
              <br />
              Location : Colombo
              <br />
              Date : 20 Feb 2024
              <br />
              Venue : Avendra Garden
              <br />
              Catering : Ishan Hotel
              <br />
              Decoration : Nimal Decorators
              <br />
              Entertainment: FlashBack Music Band
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      </div>
    </>
  );
}

export default DashBoardCard;
