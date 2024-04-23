
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { getCurrentUser, update } from "../../services/authService";
import "./editProfile.css"; 
import FormFooter from "../../components/Footer/FormFooter";

interface UserProfileData {
  Name: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  province: string;
  longitude: string;
  latitude: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: string;
}

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfileData>();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getCurrentUser();
        setValue("Name", userData.normalizedUserName);
        setValue("lastName", userData.lastName);
        setValue("street", userData.street);
        setValue("city", userData.city);
        setValue("postalCode", userData.postalCode);
        setValue("province", userData.province);
        setValue("longitude", userData.longitude);
        setValue("latitude", userData.latitude);
        setValue("email", userData.email);
        setValue("profilePicture", userData.profilePicture);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load user data");
        setLoading(false);
      }
    };
    
    fetchData();
  }, [setValue]);
  
  const onSubmit = async (data: UserProfileData) => {
    const success = await update(data);
    if (success) {
      toast.success("Profile updated successfully");
      navigate(-1);
    } else {
      toast.error("Failed to update profile");
    }
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
                Name
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="text"
                  {...register("Name", { required: true })}
                  placeholder="Name"
                />
                {errors.Name && <span>This field is required</span>}
              </Col>
            </Form.Group>

            {/* Last Name */}
            {/* <Form.Group
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
            </Form.Group> */}

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

            {/* Email */}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom09"
            >
              <Form.Label column md="2">
                Email
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="example@example.com"
                />
                {errors.email && <span>This field is required</span>}
              </Col>
            </Form.Group>

            {/* Password */}
            {/* <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom10"
            >
              <Form.Label column md="2">
                Password
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Password"
                />
                {errors.password && <span>This field is required</span>}
              </Col>
            </Form.Group> */}

            {/* Confirm Password */}
            {/* <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom11"
            >
              <Form.Label column md="2">
                Confirm Password
              </Form.Label>
              <Col md="4">
                <Form.Control
                  type="password"
                  {...register("confirmPassword", { required: true })}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && <span>This field is required</span>}
              </Col>
            </Form.Group> */}

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
                <Form.Control
                  type="file"
                  {...register("profilePicture")}
                  accept="image/*"
                />
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
                    window.history.back();
                  }}
                >
                  Cancel
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


