import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
//import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "../components/Form.css";
import FormFooter from "../components/Footer/FormFooter";

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
      <div className="EditFormcontainer">
        <div style={{ margin: "20px" }}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue="Event"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  defaultValue="Arcade"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        <Form.Label>Username</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Username"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group> */}
            </Row>
            <Row>
              <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="example@example.com"
                  defaultValue="eventarcade@gmail.com"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Street" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="City" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom06">
                <Form.Label>Province</Form.Label>
                <Form.Control type="text" placeholder="Province" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="5" controlId="validationCustom07">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  placeholder="+94 xx xxx xxxx"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom08">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Longitude" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom09">
                <Form.Label></Form.Label>
                <Form.Control type="text" placeholder="Latitude" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Row>
            <Button type="submit" className="custom-update-button">Update Profile</Button>
            <Button
            className="custom-delete-button">Delete Account</Button>
            </Row>
          </Form>         
        </div>
      </div>
      <FormFooter />
    </>
  );
};

export default EditProfile;
