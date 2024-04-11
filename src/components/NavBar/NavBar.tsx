import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../NavBar/NavBar.css";

interface NavBarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onAuthentication: () => void;
}

export default function NavBar({
  isAuthenticated,
  onLogout,
  onAuthentication,
}: NavBarProps) {
  const navigate = useNavigate();

  const handleAuthentication = () => {
    navigate("/auth");
    onAuthentication();
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleVendorRegistration = () => {
    navigate("/vendorRegistration");
  };

  const handleEditProfile = () => {
    navigate("/editProfile");
  };

  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary custom-navbar-width"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/src/assets/SiteLogo.png"
            width="100"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="me-auto">
            <Nav.Link href="#Home" className="me-5">
              Home
            </Nav.Link>
            <Nav.Link href="#About Us" className="me-5">
              About Us
            </Nav.Link>
            <Nav.Link href="#Contact Us" className="me-5">
              Contact Us
            </Nav.Link>
          </Nav>
          <div className="nav-icons">
            <a href="#" className="icon">
              <i
                className="fa fa-envelope-open nav-icons-black"
                aria-hidden="true"
              ></i>
            </a>
            <a href="#" className="icon">
              <i className="fa fa-bell nav-icons-black " aria-hidden="true"></i>
            </a>
          </div>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-warning" className="me-5">
              Search
            </Button>
            {isAuthenticated ? (
              <NavDropdown title="Profile" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3" onClick={handleEditProfile}>
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action4"
                  onClick={handleVendorRegistration}
                >
                  Register as Vendor
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                className="nav-signin-button"
                onClick={handleAuthentication}
              >
                Signin
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
