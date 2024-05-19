import {  useNavigate } from "react-router-dom";
import "./nav.css";
import NavNotice from "./navNotice/NavNotice";
import NavMessage from "./navMessage/NavMessage";
import NavAvatar from "./navAvatar/NavAvatar";
import { useAppSelector } from "../../../store/hooks";

function Nav() {
  const navigate = useNavigate();
  const {isLoggedIn} = useAppSelector((state) => state.account);  

  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        {!isLoggedIn ? (
          <li className="nav-item">
            <button onClick={()=>{navigate("/auth")}} className="nav-link-btn-home">
              Sign In
            </button>
          </li>
        ) : (
          <>
            <NavNotice />
            <NavMessage />
            <NavAvatar/>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
