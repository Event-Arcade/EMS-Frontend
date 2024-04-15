import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./editProfile.css"; // Custom CSS for additional styling
import FormFooter from "../../components/Footer/FormFooter";

const EditProfile = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
    <div className="edit-form">
      <div className="edit-form-heading">Profile Setting</div>
      <div className="EditFormcontainer">
        <div style={{ margin: "10px", paddingLeft:'200px' }}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
              <Form.Label column md="2">First name</Form.Label>
              <Col md="4">
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue="Event"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="validationCustom02">
              <Form.Label column md="2">Last name</Form.Label>
              <Col md="4">
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  defaultValue="Arcade"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="validationCustom03">
              <Form.Label column md="2">Email</Form.Label>
              <Col md="4">
                <Form.Control
                  required
                  type="email"
                  placeholder="example@example.com"
                  defaultValue="eventarcade@gmail.com"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom04">
              <Form.Label column md="2">City</Form.Label>
              <Col md="4">
                <Form.Control type="text" placeholder="Street" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="validationCustom05">
              <Form.Label column md="2">State</Form.Label>
              <Col md="4">
                <Form.Control type="text" placeholder="City" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="validationCustom04">
              <Form.Label column md="2">Province</Form.Label>
              <Col md="4">
                <Form.Control type="text" placeholder="Province" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="validationCustom07">
              <Form.Label column md="2">Phone Number</Form.Label>
              <Col md="4">
                <Form.Control
                  required
                  type="tel"
                  placeholder="+94 xx xxx xxxx"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom08">
              <Form.Label column md="2">Location</Form.Label>
              <Col md="4">
                <Form.Control type="text" placeholder="Longitude" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="validationCustom09">
              <Form.Label column md="2"></Form.Label>
              <Col md="4">
                <Form.Control type="text" placeholder="Latitude" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            {/* Buttons */}
            <Form.Group as={Row} className="mb-3">
              <Col md={{ span: 9, offset: 3 }}>
                <Button type="submit" className="custom-update-button">
                  Update Profile
                </Button>
                <Button className="custom-delete-button">Delete Account</Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
      <FormFooter />
    </div>

    </>
  );
};

export default EditProfile;
