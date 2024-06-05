import "./nav.css";
import NavNotice from "./navNotice/NavNotice";
import NavMessage from "./navMessage/NavMessage";
import NavAvatar from "./navAvatar/NavAvatar";
import { useAppSelector } from "../../../store/hooks";

function NavMenu({ handleShowSignUp }: { handleShowSignUp: () => void }) {
  const { isLoggedIn, user } = useAppSelector((state) => state.account);



  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        {!isLoggedIn ? (
          <li className="nav-item">
            <button onClick={handleShowSignUp} className="nav-link-btn-home">
              Sign In
            </button>
          </li>
        ) : (
          <>
            <NavNotice />
            <NavMessage />
            <NavAvatar />
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavMenu;
