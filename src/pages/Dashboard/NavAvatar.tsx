import React from 'react'
import messages1 from "../../assets/img/messages1.jpg"
import messages2 from "../../assets/img/messages2.jpg"
import messages3 from "../../assets/img/messages3.jpg"
import profileImg from "../../assets/img/profileImg.jpg"
import './nav.css'

function NavAvatar() {
  return (
    <li className="nav-item dropdown pe-3">
      <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
        {/* <i className="bi bi-chat-left-text"></i> */}
        <img src={profileImg} alt='Profile' className='rounded-circle'/>
        <span className="d-none d-md-block dropdown-toggle ps-2">Lahiru Madhuwantha</span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>Saman</h6>
          <span>Hotel Slike</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item d-flex align-items-center"
          href='/editProfile'>
            <i className="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item d-flex align-items-center"
          href='users-profile.html'>
            <i className="bi bi-gear"></i>
            <span>Account setting</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item d-flex align-items-center"
          href='users-profile.html'>
            <i className="bi bi-question-circle"></i>
            <span>Need Help?</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item d-flex align-items-center"
          href='/'>
            <i className="bi bi-arrow-bar-right"></i>
            <span>Sign Out</span>
          </a>
        </li>
      </ul>
    </li>
  )
}

export default NavAvatar