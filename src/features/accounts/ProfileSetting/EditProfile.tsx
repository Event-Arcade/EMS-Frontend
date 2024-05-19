import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./editProfile.css";
import FormFooter from "../../../components/Footer/FormFooter";
import { useForm } from "react-hook-form";
import { User } from "../../../interfaces/User";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import { updateUser } from "../UserAccountSlice";

const EditProfile = () => {
  const { loading, user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>();

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("street", user.street);
      setValue("city", user.city);
      setValue("postalCode", user.postalCode);
      setValue("province", user.province);
      setValue("longitude", user.longitude);
      setValue("latitude", user.latitude);
    }
  }, [user, setValue]);

  const onSubmit = async (data: User) => {
    const updatedUserDetails = new FormData();
    updatedUserDetails.append("firstName", data.firstName);
    updatedUserDetails.append("lastName", data.lastName);
    updatedUserDetails.append("street", data.street);
    updatedUserDetails.append("city", data.city);
    updatedUserDetails.append("postalCode", data.postalCode);
    updatedUserDetails.append("province", data.province);
    updatedUserDetails.append("longitude", data.longitude.toString()); // Convert to string
    updatedUserDetails.append("latitude", data.latitude.toString()); // Convert to string

    dispatch(updateUser(updatedUserDetails));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-form">
      <div className="edit-form-heading">Profile Setting</div>
      <div className="EditFormcontainer">
        <div style={{ margin: "10px", paddingLeft: "200px" }}>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom01"
            >
              <Form.Label column md="2">
                First Name
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="text"
                  {...register("firstName", { required: true })}
                  placeholder="First Name"
                />
                {errors.firstName && <span>This field is required</span>}
              </Col>
            </Form.Group>

            {/* Last Name */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom02"
            >
              <Form.Label column md="2">
                Last Name
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="text"
                  {...register("lastName", { required: true })}
                  placeholder="Last Name"
                />
                {errors.lastName && <span>This field is required</span>}
              </Col>
            </Form.Group>

            {/* Street */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom03"
            >
              <Form.Label column md="2">
                Street
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="text"
                  {...register("street", { required: true })}
                  placeholder="Street"
                />
                {errors.street && <span>This field is required</span>}
              </Col>
            </Form.Group>

            {/* City */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom04"
            >
              <Form.Label column md="2">
                City
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="text"
                  {...register("city", { required: true })}
                  placeholder="City"
                />
                {errors.city && <span>This field is required</span>}
              </Col>
            </Form.Group>

            {/* Postal Code */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom05"
            >
              <Form.Label column md="2">
                Postal Code
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="text"
                  {...register("postalCode", { required: true })}
                  placeholder="Postal Code"
                />
                {errors.postalCode && <span>This field is required</span>}
              </Col>
            </Form.Group>

            {/* Province */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom06"
            >
              <Form.Label column md="2">
                Province
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="text"
                  {...register("province", { required: true })}
                  placeholder="Province"
                />
                {errors.province && <span>This field is required</span>}
              </Col>
            </Form.Group>

            {/* Longitude */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom07"
            >
              <Form.Label column md="2">
                Longitude
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="text"
                  {...register("longitude", { required: true })}
                  placeholder="Longitude"
                />
                {errors.longitude && <span>This field is required</span>}
              </Col>
            </Form.Group>

            {/* Latitude */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom08"
            >
              <Form.Label column md="2">
                Latitude
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="text"
                  {...register("latitude", { required: true })}
                  placeholder="Latitude"
                />
                {errors.latitude && <span>This field is required</span>}
              </Col>
            </Form.Group>

            {/* Profile Picture */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom12"
            >
              <Form.Label column md="2">
                Profile Picture
              </Form.Label>
              <Col md="4">
                <Form.Control type="file" {...register("profilePictureUrl")} />
              </Col>
            </Form.Group>

            {/* Submit Button */}
            <Form.Group as={Row} className="mb-3">
              <Col md={{ span: 9, offset: 3 }}>
                <Button type="submit" className="custom-update-button">
                  Update Profile
                </Button>
                <Button
                  type="button"
                  className="custom-cancel-button"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Go Back
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
      <FormFooter />
    </div>
  );
};

export default EditProfile;
