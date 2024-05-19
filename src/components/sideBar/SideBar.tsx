import "./sideBar.css";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  isVisible: boolean;
}

export default function SideBar({ isVisible }: SideBarProps) {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAppSelector((state) => state.account);

  return (
    <aside
      id="sidebar"
      className={`sidebar ${isVisible ? "visible" : "hidden"}`}
    >
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            onClick={() => {
              if (isLoggedIn) {
                if (user?.role == "admin") {
                  navigate("/admin/dashboard");
                } else if (user?.role == "client") {
                  navigate("/dashboard");
                } else if (user?.role == "vendor") {
                  navigate("/vendor/dashboard");
                }
              } else {
                navigate("/auth");
              }
            }}
          >
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>
        {user?.role != "admin" && (
          <li className="nav-item">
            <a className="nav-link" href="/calendar">
              <i className="bi bi-calendar2"></i>
              <span>Calendar</span>
            </a>
          </li>
        )}
        {user?.role == "client" && (
          <li className="nav-item">
            <a className="nav-link" href="/startpage">
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
                  navigate("/admin/static-resource-management");
                }}
              >
                <i className="bi bi-gear"></i>
                <span>Static Resorces</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/");
                }}
              >
                <i className="bi bi-gear"></i>
                <span>Vendors</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/");
                }}
              >
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
                  navigate(`/shop/${user?.id}`);
                }}
              >
                <i className="bi bi-gear"></i>
                <span>My Shop</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/");
                }}
              >
                <i className="bi bi-gear"></i>
                <span>Orders</span>
              </a>
            </li>
          </>
        )}
        <li className="nav-item">
          <a className="nav-link" href="/setting">
            <i className="bi bi-gear"></i>
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

// TODO: Implement Vendors and Clients Lists
