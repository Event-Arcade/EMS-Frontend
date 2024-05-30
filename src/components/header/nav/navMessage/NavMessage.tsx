import React, { useEffect, useState } from "react";
import messages1 from "./messages1.jpg";
import messages2 from "./messages2.jpg";
import messages3 from "./messages3.jpg";
import Chat from "../../../Chat/Chat";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toggleChat } from "../../../../features/chats/ChatSlice";

function NavMessage({chatService}: {chatService: any}) {
  const [chatVisible, setChatVisible] = useState(false);
  const { isVisibleChat } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const handleOpenChat = () => {
    setChatVisible(true);
  };

  const handleCloseChat = () => {
    setChatVisible(false);
    dispatch(toggleChat(false));
  };
  useEffect(() => {
    if (isVisibleChat) {
      setChatVisible(true);
    } else {
      setChatVisible(false);
    }
  }, [isVisibleChat]);

  return (
    <>
      <li className="nav-item dropdown">
        <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
          <i className="bi bi-chat-left-text"></i>
          <span className="badge bg-success badge-number">3</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
          <li className="dropdown-header">
            You have 3 new messages
            <a href="#">
              <span
                className="badge rounded-pill bg-primary p-2 ms-2"
                onClick={handleOpenChat}
              >
                View all
              </span>
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li className="message-item">
            <img src={messages1} alt="" className="rounded-circle" />
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
            <img src={messages2} alt="" className="rounded-circle" />
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
            <img src={messages3} alt="" className="rounded-circle" />
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
      <Chat
        isVisible={chatVisible}
        onClose={handleCloseChat}
        chatClient={chatService}
      />
    </>
  );
}

export default NavMessage;
