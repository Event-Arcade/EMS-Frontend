import { useEffect, useState } from "react";
import "./authenticationModal.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Modal } from "react-bootstrap";
import { useAppSelector } from "../../../store/hooks";

export default function AuthenticationModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: any;
}) {
  const [containerToggle, setContainerToggle] = useState(true);
  const {isLoggedIn} = useAppSelector((state) => state.account);

  useEffect(() => {
    if(isLoggedIn){
      handleClose();
    }
  }, [isLoggedIn, handleClose]);

  const handleToggle = () => {
    setContainerToggle(!containerToggle);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Body>
        <div
          className={containerToggle ? "authcontainer" : "authcontainer active"}
        >
          {/* Sign Up Form */}
          <SignUp />

          {/* Sign In Form */}
          <SignIn />

          {/* Toggle Container */}
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="hidden" id="login" onClick={handleToggle}>
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Welcome to Event Arcade</h1>
                <p>Enter your personal details and start the journey with us</p>
                <button className="hidden" id="register" onClick={handleToggle}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
