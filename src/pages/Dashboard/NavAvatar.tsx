import profileImg from "../../assets/img/profileImg.jpg";
import "./nav.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLogout } from "../../features/accounts/UserAccountSlice";
import { useNavigate } from "react-router-dom";

function NavAvatar() {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(setLogout());
    navigate("/");
  };
  return (
    <li className="nav-item dropdown pe-3">
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        {/* <i className="bi bi-chat-left-text"></i> */}
        <img
          src={user?.profilePictureUrl || profileImg}
          alt="Profile"
          className="rounded-circle"
        />
        <span className="d-none d-md-block dropdown-toggle ps-2">
          {user?.firstName}
        </span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>{user?.firstName + " " + user?.lastName}</h6>
          <span>{user?.email}</span>
        </li>
        {/* <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="users-profile.html"
          >
            <i className="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li> */}
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            onClick={() => {
              navigate("/editProfile");
            }}
          >
            <i className="bi bi-gear"></i>
            <span>Account setting</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            onClick={() => {
              navigate("/help");
            }}
          >
            {
              // TODO: Add help page}
            }
            <i className="bi bi-question-circle"></i>
            <span>Need Help?</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        {user?.role === "client" && (
          <>
            <li>
              <a
                className="dropdown-item d-flex align-items-center"
                onClick={() => {
                  navigate("/createshop");
                }}
              >
                <i className="bi bi-bag-heart"></i>
                <span>Create Shop</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
          </>
        )}
        {user?.role === "vendor" && (
          <>
            <li>
              <a
                className="dropdown-item d-flex align-items-center"
                onClick={() => {
                  navigate("/shop");
                }}
              >
                <i className="bi bi-bag-check"></i>
                <span>Go to My Shop</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
          </>
        )}
        <li>
          <button
            onClick={handleSignOut}
            className="dropdown-item d-flex align-items-center"
          >
            <i className="bi bi-arrow-bar-right"></i>
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </li>
  );
}

export default NavAvatar;
