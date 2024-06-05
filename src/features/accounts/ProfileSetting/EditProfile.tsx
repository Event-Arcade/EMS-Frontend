import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Spinner,
  Image,
  Modal,
} from "react-bootstrap";
import { User } from "../../../interfaces/User";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  updateUser,
  userAccountUpdatePassword,
} from "../UserAccountSlice";

export default function EditProfile({ close }: { close: () => void }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.account);

  // Modal for account delete conformation
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [error, setError] = useState("");

  // Modal for account delete conformation
  const [show, setShow] = useState(false);

  const [currentUser, setCurrentUser] = useState<User>({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postalCode: "",
    province: "",
    longitude: 0,
    latitude: 0,
    email: "",
    phoneNumber: "",
    profilePictureFile: undefined,
  });

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  // Modal for account delete conformation
  const handleClose = () => {
    setShow(false);
  };

  const handleDeleteConformation = async () => {
    try {
      handleClose();
      const response = await dispatch(deleteUser()).unwrap();
      if (response) {
        navigate("/");
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  // Modal for account delete conformation
  const handleCloseUpdatePasswordModal = () => {
    setShowUpdatePasswordForm(false);
    setError("");
    setCurrentPassword("");
    setNewPassword("");
    setReNewPassword("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]:
        name === "longitude" || name === "latitude" ? parseFloat(value) : value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentUser({
        ...currentUser,
        profilePictureFile: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //get the location details
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCurrentUser({
          ...currentUser,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    const formData = new FormData();
    formData.append("firstName", currentUser.firstName);
    formData.append("lastName", currentUser.lastName);
    formData.append("street", currentUser.street);
    formData.append("city", currentUser.city);
    formData.append("postalCode", currentUser.postalCode);
    formData.append("province", currentUser.province);
    formData.append("longitude", currentUser.longitude.toString());
    formData.append("latitude", currentUser.latitude.toString());
    formData.append("phoneNumber", currentUser.phoneNumber);
    formData.append("email", currentUser.email);
    if (currentUser.profilePictureFile) {
      formData.append("profilePicture", currentUser.profilePictureFile);
    }
    try {
      await dispatch(updateUser(formData)).unwrap();
      setCurrentUser({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        postalCode: "",
        province: "",
        longitude: 0,
        latitude: 0,
        email: "",
        phoneNumber: "",
        profilePictureFile: undefined,
      });
      user?.role === "admin"
        ? navigate("/admin/dashboard")
        : user?.role === "client"
        ? navigate("/dashboard")
        : navigate("/vendor/dashboard");
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const handleUpdateNewPassword = async () => {
    if (newPassword !== reNewPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const data = new FormData();
      data.append("oldPassword", currentPassword);
      data.append("newPassword", newPassword);

      await dispatch(userAccountUpdatePassword(data));
      handleCloseUpdatePasswordModal();
    } catch (e) {
      setError("Incorrect current password");
    }
  };

  return (
    <>
      <Container className="mt-4">
        <h4 className="mb-1">Edit Your Details</h4>
        <Row className="mb-3 justify-content-center">
          <Col md="auto">
            <Image
              src={`${currentUser.profilePictureURL}`}
              rounded
              width={150}
              className="mb-3"
            />
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={currentUser.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={currentUser.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={currentUser.street}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={currentUser.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formPostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={currentUser.postalCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formProvince">
                <Form.Label>Province</Form.Label>
                <Form.Control
                  type="text"
                  name="province"
                  value={currentUser.province}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formProfilePictureFile" className="mt-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mt-4">
              {loading ? (
                <Button variant="success" className="mt-3 mx-auto">
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mx-2"
                  />
                  Updating ...
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3 mx-auto"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="warning"
                    className="mx-4 mt-3"
                    onClick={() => {
                      setShowUpdatePasswordForm(true);
                    }}
                  >
                    Update Password
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShow(true);
                    }}
                    className="mt-3"
                  >
                    Delete Account
                  </Button>
                  <Button
                    variant="secondary"
                    className="mt-3 mx-5"
                    onClick={() => {
                      user?.role === "admin"
                        ? navigate("/admin/dashboard")
                        : user?.role === "client"
                        ? navigate("/dashboard")
                        : navigate("/vendor/dashboard");
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Form>
      </Container>

      {/* Modal for updating password */}
      <Modal
        show={showUpdatePasswordForm}
        onHide={handleCloseUpdatePasswordModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                autoFocus
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Re-Enter New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setReNewPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdatePasswordModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateNewPassword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for account delete conformation */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting account will remove all your data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Are you sure you want to delete your account?</li>
            <li>
              This action cannot be undone. All your data will be permanently
              removed.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteConformation}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
