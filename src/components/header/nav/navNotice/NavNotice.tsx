import React from "react";

function NavNotice() {
  return (
    <li className="nav-item dropdown">
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-bell"></i>
        <span className="badge bg-primary badge-number">4</span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notification">
        <li className="dropdown-header">
          You have 4 notifications
          <a href="#">
            <span className="badge rounded-pill bg-primary p-2 ms-2">
              View all
            </span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="notification-item">
          <i className="bi bi-exclamation-circle text-warning"></i>
          <div>
            <h4>Lorem Ipsum 01</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit 01</p>
            <p>30 min ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="notification-item">
          <i className="bi bi-exclamation-circle text-danger"></i>
          <div>
            <h4>Lorem Ipsum 02</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit 02</p>
            <p>1 hr ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="notification-item">
          <i className="bi bi-exclamation-circle text-success"></i>
          <div>
            <h4>Lorem Ipsum 03</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit 03</p>
            <p>2 hr ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="notification-item">
          <i className="bi bi-exclamation-circle text-primary"></i>
          <div>
            <h4>Lorem Ipsum 04</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit 04</p>
            <p>4 hr ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="dropdown-footer">
          <a href="#">View all notifications</a>
        </li>
      </ul>
    </li>
  );
}

export default NavNotice;
