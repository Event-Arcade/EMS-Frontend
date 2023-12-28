import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Authentication.css";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const handlelogin = (_: React.MouseEvent) => {
    navigate("/dashboard");
  };
  return (
    <div className="form-container sign-in">
      <form>
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
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>

        <button onClick={handlelogin}>Sign In</button>
      </form>
    </div>
  );
}
