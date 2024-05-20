import "../nav.css";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setLogout } from "../../../../features/accounts/UserAccountSlice";
import { useNavigate } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import { Popup } from "reactjs-popup";
import ShopForm from "../../../../features/shops/ShopForm/ShopForm";

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
    <Dropdown align="end" className="nav-item pe-3">
      <Dropdown.Toggle
        as="a"
        className="nav-link nav-profile d-flex align-items-center pe-0"
      >
        <Image
          src={user?.profilePictureURL}
          alt="Profile"
          className="rounded-circle"
          roundedCircle
        />
        <span className="d-none d-md-block ps-2 mx-2">{user?.firstName}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="profile">
        <Dropdown.Header>
          <div className="d-flex flex-column">
            <h6>{`${user?.firstName} ${user?.lastName}`}</h6>
            <span>{user?.email}</span>
          </div>
        </Dropdown.Header>

        <Dropdown.Divider />

        <Dropdown.Item onClick={() => navigate("/editProfile")}>
          <i className="bi bi-gear"></i>
          <span>Account setting</span>
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item onClick={() => navigate("/help")}>
          <i className="bi bi-question-circle"></i>
          <span>Need Help?</span>
        </Dropdown.Item>

        {user?.role === "client" && (
          <>
            <Dropdown.Divider />
            <Popup
              trigger={
                <Dropdown.Item>
                  <i className="bi bi-plus-circle"></i>
                  <span>Create Shop</span>
                </Dropdown.Item>
              }
              modal
            >
              {(close) => <ShopForm close={close} />}
            </Popup>
          </>
        )}

        {user?.role === "vendor" && (
          <>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => navigate(`/shop/${user.id}`)}>
              <i className="bi bi-bag-check"></i>
              <span>Go to My Shop</span>
            </Dropdown.Item>
          </>
        )}

        <Dropdown.Divider />

        <Dropdown.Item onClick={handleSignOut}>
          <i className="bi bi-arrow-bar-right"></i>
          <span>Sign Out</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavAvatar;
