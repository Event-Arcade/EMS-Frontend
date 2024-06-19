import { useState, MouseEvent, ChangeEvent } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./authenticationModal.css";
import { getCurrentUser, signupUser } from "../UserAccountSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    street: "",
    city: "",
    postalCode: "",
    province: "",
    longitude: "",
    latitude: "",
    profilePicture: null as File | null,
  });
  const { loading } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(" Passwords do not match! ");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    try {
      const resposne = await dispatch(signupUser(formDataToSend)).unwrap();
      if (resposne) {
        await dispatch(getCurrentUser());
        if (location.pathname !== "/dashboard") {
          navigate(location.pathname);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        
        <span>Use your email for registration</span>
        <div className="scrollable-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {!loading ? (
          <button type="submit">Sign Up</button>
        ) : (
          <button disabled type="submit">
            Loading ...
          </button>
        )}
      </form>
    </div>
  );
}
