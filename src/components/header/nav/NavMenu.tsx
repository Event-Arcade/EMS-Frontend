import "./nav.css";
import NavNotice from "./navNotice/NavNotice";
import NavMessage from "./navMessage/NavMessage";
import NavAvatar from "./navAvatar/NavAvatar";
import { useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import chatService from "../../../services/chatService";
function NavMenu({ handleShowSignUp }: { handleShowSignUp: () => void }) {
  const { isLoggedIn, user } = useAppSelector((state) => state.account);

  useEffect(() => {
    if (user) {
      chatService.startConnection();
      chatService.onReceiveMessage((message: any) => {
        console.log(message);
      });

      chatService.setUserActive(user?.id || "");
    } else {
      chatService.stopConnection();
    }
  }, [user]);

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
            <NavMessage chatService={chatService} />
            <NavAvatar />
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavMenu;
