import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./nav.css";
import NavNotice from "./NavNotice";
import NavMessage from "./NavMessage";
import NavAvatar from "./NavAvatar";

function Nav() {
  const navigate = useNavigate();
  const lacation = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if the user is logged in
    const userLoggedIn = checkIfUserIsLoggedIn();
    setIsLoggedIn(userLoggedIn);
  }, []);
  const checkIfUserIsLoggedIn = () => {
    //  logic to check if the user is logged in
    const token = localStorage.getItem("token"); // Check if token exists in localStorage
    return !!token; // Return true if token exists, otherwise false
  };
  const handleSignIn = () => {
    navigate("/auth");
  };

  const handleSignOut = () => {
    //  function to handle user sign out
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update state to indicate that user is logged out
    if (location.pathname !== "/") {
      navigate("/");
    }
  };
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        {!isLoggedIn ? (
          <li className="nav-item">
            <button onClick={handleSignIn} className="nav-link-btn-home">
              Sign In
            </button>
          </li>
        ) : (
          <>
            <NavNotice />
            <NavMessage />
            <NavAvatar handleSignOut={handleSignOut} />
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
