import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthentication= (_: React.MouseEvent) => {
    navigate('/auth');
  };

  const handleLogout = (_: React.MouseEvent) => {
    setIsLoggedIn(false);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
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
          <Nav.Link href="#Home"
            className="me-5">Home</Nav.Link>
            <Nav.Link href="#About Us"
            className="me-5">About Us</Nav.Link>
            <Nav.Link href="#Contact Us"
            className="me-5">Contact Us</Nav.Link>
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
            {isLoggedIn ? (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
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
