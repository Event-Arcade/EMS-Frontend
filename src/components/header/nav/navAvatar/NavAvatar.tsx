import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setLogout } from "../../../../features/accounts/UserAccountSlice";
import { useNavigate } from "react-router-dom";
import { Badge, Dropdown, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ShopForm from "../../../../features/shops/ShopForm";
import { setChatBarVisibility, setChatInboxVisibility } from "../../../../features/chats/ChatSlice";

function NavAvatar() {
  const { user } = useAppSelector((state) => state.account);
  const { shops } = useAppSelector((state) => state.shop);
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(setLogout());
    dispatch(setChatBarVisibility(false));
    dispatch(setChatInboxVisibility(false));
    navigate("/");
  };

  useEffect(() => {}, [user, shops]);

  const handleGotoMyShop = () => {
    if (!user) return;
    const shop = shops.find((shop) => shop.ownerId === user.id);
    if (shop) {
      navigate(`/shop/${shop.id}`);
    } else {
      toast.error("You don't have any shop yet");
      navigate("/addshopservice");
    }
  };

  //TODO: change this badge component into online status like messanger
  return (
    <>
      <Dropdown align="end" className="nav-item pe-3">
        <Dropdown.Toggle
          as="a"
          className="nav-link nav-profile d-flex align-items-center pe-0"
        >
          <Image src={user?.profilePictureURL} roundedCircle />
          <Badge bg="success">.</Badge>
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
              <Dropdown.Item onClick={handleShow}>
                <i className="bi bi-plus-circle"></i>
                <span>Create Shop</span>
              </Dropdown.Item>
            </>
          )}

          {user?.role === "vendor" && (
            <>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleGotoMyShop}>
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
      <ShopForm show={show} handleClose={handleClose} />
    </>
  );
}

export default NavAvatar;
