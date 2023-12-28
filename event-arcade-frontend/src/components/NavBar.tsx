import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

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
    navigate('/auth');
    onAuthentication();
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Navbar fixed="top"  collapseOnSelect expand="lg" className="bg-body-tertiary">
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
        <Navbar.Collapse id="responsive-navbar-nav">
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
                <NavDropdown.Item href="#action3">Edit Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Register as Vendor
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="danger" onClick={handleAuthentication}>
                Signin
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
