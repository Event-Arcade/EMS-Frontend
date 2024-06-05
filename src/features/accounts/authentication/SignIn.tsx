import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./authenticationModal.css";
import { MouseEvent } from "react";
import { loginUser } from "../UserAccountSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export default function SignIn() {
  const { isLoggedIn, user, loading } = useAppSelector(
    (state) => state.account
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "vendor") {
        console.log(location);
        navigate("/vendor/dashboard");
      } else if (user?.role === "client") {
        if (location.pathname !== "/dashboard") {
          navigate(location.pathname);
        } else {
          navigate("/dashboard");
        }
      }
    }
  }, [user, isLoggedIn]);

  return (
    <div className="form-container sign-in">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fa-brands fa-google-plus-g"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <span>or use your email password</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? (
          <button disabled type="submit">
            Loading ...
          </button>
        ) : (
          <button type="submit">Sign In</button>
        )}
      </form>
    </div>
  );
}
