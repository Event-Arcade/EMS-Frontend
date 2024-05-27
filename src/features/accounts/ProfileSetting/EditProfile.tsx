import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Spinner,
  Image,
} from "react-bootstrap";
import { User } from "../../../interfaces/User";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { deleteUser, updateUser } from "../UserAccountSlice";
import axios from "axios";

export default function EditProfile({ close }: { close: () => void }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.account);

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

  const getFile = useCallback(
    async (url: string) => {
      const response = await axios.get(url, {
        responseType: "blob",
      });
      if (response.data) {
        const file = new File([response.data], "profilePicture", {
          type: response.data.type,
        });
        setCurrentUser({
          ...currentUser,
          profilePictureFile: file,
        });
      }
    },
    [currentUser]
  );

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      if (user?.profilePictureURL) {
        getFile(user.profilePictureURL);
      }
    }
  }, [user]);

  const handleDelete = async () => {
    try {
      // TODO : Add a confirmation dialog before deleting the account
      const response = await dispatch(deleteUser()).unwrap();
      if (response) {
        navigate("/");
      }
    } catch (e) {
      console.error("Error:", e);
    }
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

  return (
    <Container className="mt-4">
      <h4 className="mb-1">Edit Your Details</h4>
      <Row className="mb-3 justify-content-center">
        <Col md="auto">
          <Image
            src={`${currentUser.profilePictureURL}`}
            rounded
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
            <Form.Group controlId="formLongitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="number"
                name="longitude"
                value={currentUser.longitude}
                onChange={handleChange}
                required
                step="any"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLatitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="number"
                name="latitude"
                value={currentUser.latitude}
                onChange={handleChange}
                required
                step="any"
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
          <Col md={6}>
            {loading ? (
              <Button variant="success" className="mt-3">
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
                <Button variant="primary" type="submit" className="mt-3">
                  Save Changes
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  className="mx-4 mt-3"
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
  );
}
