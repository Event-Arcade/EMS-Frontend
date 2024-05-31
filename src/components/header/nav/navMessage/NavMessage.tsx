import { useEffect, useState } from "react";
import Chat from "../../../Chat/Chat";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  setChatBarVisibility,
  setChatInboxVisibility,
} from "../../../../features/chats/ChatSlice";

function NavMessage() {
  const [unreadMsgConut, setUnreadMsgCount] = useState(0);
  const { chatBarVisibility: isVisibleChat } = useAppSelector(
    (state) => state.chat
  );
  const { user } = useAppSelector((state) => state.account);
  const { myChatInboxs } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const handleOpenChat = () => {
    dispatch(setChatBarVisibility(true));
    dispatch(setChatInboxVisibility(false));
  };

  const handleSideChatList = () => {
    if (unreadMsgConut === 0) {
      dispatch(setChatBarVisibility(!isVisibleChat));
    } else {
      return;
    }
  };

  const calculateArrivedTime = (date?: Date) => {
    if(!date) return;
    // Calculate the time difference between the current date and the date the message was sent in minutes or hours or days and return as a string
    const currentDate = new Date();
    const messageDate = new Date(date);
    const timeDifference = currentDate.getTime() - messageDate.getTime();
    const minutes = Math.floor(timeDifference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  useEffect(() => {
    if (user) {
      const unreadMsgs = myChatInboxs.filter((cht) => cht.isRead === false);
      setUnreadMsgCount(unreadMsgs.length);
    }
  }, [myChatInboxs]);

  return (
    <>
      <li className="nav-item dropdown" onClick={handleSideChatList}>
        <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
          <i className="bi bi-chat-left-text"></i>
          {unreadMsgConut > 0 && (
            <span className="badge bg-success badge-number">
              {unreadMsgConut}
            </span>
          )}
        </a>
        {unreadMsgConut > 0 && (
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
            <li className="dropdown-header">
              You have {unreadMsgConut} new messages
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
            {myChatInboxs.map((usr) => (
              <>
                <li className="message-item">
                  <img
                    src={usr.profilePictureURL}
                    alt=""
                    className="rounded-circle"
                  />
                  <div>
                    <h4>{usr.firstName}</h4>
                    <p>{usr.lastMessage}</p>
                    <p>{calculateArrivedTime(usr.lastMessageDate)}</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </>
            ))}
            <li className="dropdown-footer" onClick={handleOpenChat}>
              <a href="#">View all messages</a>
            </li>
          </ul>
        )}
      </li>
      <Chat />
    </>
  );
}

export default NavMessage;
