import React from 'react'
import messages1 from "../../assets/img/messages1.jpg"
import messages2 from "../../assets/img/messages2.jpg"
import messages3 from "../../assets/img/messages3.jpg"


function NavMessage() {
  return (
    <li className="nav-item dropdown">
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-chat-left-text"></i>
        <span className="badge bg-success badge-number">3</span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
        <li className="dropdown-header">
          You have 3 new messages
          <a href="#">
            <span className="badge rounded-pill bg-primary p-2 ms-2">
              View all
            </span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="message-item">
          <img src={messages1} alt='' className='rounded-circle'/>
          <div>
            <h4>Maria Hudson</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit 01</p>
            <p>30 min ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="message-item">
          <img src={messages2} alt='' className='rounded-circle'/>
          <div>
            <h4>Anna Nelson</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit 01</p>
            <p>1 hr ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="message-item">
          <img src= {messages3} alt='' className='rounded-circle'/>
          <div>
            <h4>John weak</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit 01</p>
            <p>2 hr ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="dropdown-footer">
          <a href="#">View all messages</a>
        </li>
      </ul>
    </li>
  )
}

export default NavMessage