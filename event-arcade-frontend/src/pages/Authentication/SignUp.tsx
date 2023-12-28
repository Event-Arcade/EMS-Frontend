import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Authentication.css";

export default function SignUp() {
  return (
    <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
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
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Address" />

            <button>Sign Up</button>
          </form>
        </div>
  )
}
