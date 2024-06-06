import "./sideBar.css";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Shop from "../../interfaces/Shop";

interface SideBarProps {
  isVisible: boolean;
}

export default function SideBar({ isVisible }: SideBarProps) {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAppSelector((state) => state.account);
  const { shops } = useAppSelector((state) => state.shop);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    setIsSidebarVisible(isVisible);
  }, [isVisible]);

  const userShop = useMemo(() => {
    if (user?.role === "vendor") {
      return shops.find((shop) => shop.ownerId === user.id);
    }
    return null;
  }, [shops, user]);

  return (
    <aside
      id="sidebar"
      className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}
    >
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            onClick={() => {
              if (isLoggedIn) {
                if (user?.role == "admin") {
                  setIsSidebarVisible(false);
                  navigate("/admin/dashboard");
                } else if (user?.role == "client") {
                  setIsSidebarVisible(false);
                  navigate("/dashboard");
                } else if (user?.role == "vendor") {
                  setIsSidebarVisible(false);
                  navigate("/vendor/dashboard");
                }
              } else {
                setIsSidebarVisible(false);
                navigate("/");
              }
            }}
          >
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>
        {user?.role != "admin" && (
          <li
            className="nav-item"
            onClick={() => {
              setIsSidebarVisible(false);
              navigate("/calendar");
            }}
          >
            <a className="nav-link">
              <i className="bi bi-calendar2"></i>
              <span>Calendar</span>
            </a>
          </li>
        )}
        {user?.role == "client" && (
          <li
            className="nav-item"
            onClick={() => {
              setIsSidebarVisible(false);
              navigate("/startpage");
            }}
          >
            <a className="nav-link">
              <i className="bi bi-patch-plus"></i>
              <span>Create Plan</span>
            </a>
          </li>
        )}
        {user?.role == "admin" && (
          <>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  setIsSidebarVisible(false);
                  navigate("/admin/category-management");
                }}
              >
                <i className="bi bi-gear"></i>
                <span>Category</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  setIsSidebarVisible(false);
                  navigate("/admin/static-resource-management");
                }}
              >
                <i className="bi bi-gear"></i>
                <span>Static Resorces</span>
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => {
                setIsSidebarVisible(false);
                navigate("/admin/vendor-details");
              }}
            >
              <a className="nav-link">
                <i className="bi bi-gear"></i>
                <span>Vendors</span>
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => {
                setIsSidebarVisible(false);
                navigate("/admin/client-details");
              }}
            >
              <a className="nav-link">
                <i className="bi bi-gear"></i>
                <span>Clients</span>
              </a>
            </li>
          </>
        )}

        {user?.role == "vendor" && (
          <>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  setIsSidebarVisible(false);
                  navigate(`/shop/${userShop?.id}`);
                }}
              >
                <i className="bi bi-gear"></i>
                <span>My Shop</span>
              </a>
            </li>
          </>
        )}
        <li
          className="nav-item"
          onClick={() => {
            setIsSidebarVisible(false);
            navigate("/help-resources");
          }}
        >
          <a className="nav-link">
            <i className="bi bi-gear"></i>
            <span>Help Guides</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}


