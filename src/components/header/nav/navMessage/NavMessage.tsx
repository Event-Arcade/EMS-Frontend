import { useMemo } from "react";
import Chat from "../../../Chat/Chat";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  chatSetChatAsReaded,
  setChatBarVisibility,
  setChatInboxVisibility,
  setSenderId,
} from "../../../../features/chats/ChatSlice";
import calculateArrivedTime from "../../../../util/calculateArrivedTime";

function NavMessage() {
  const { myChatInboxs } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const unreadMsgConut = useMemo(() => {
    return myChatInboxs.filter((msg) =>
      msg.unreadMessages ? msg.unreadMessages > 0 : false
    ).length;
  }, [myChatInboxs]);

  const handleOpenChat = () => {
    dispatch(setChatBarVisibility(true));
    dispatch(setChatInboxVisibility(false));
  };

  const handleGotoInbox = async (userId: string) => {
    dispatch(setChatBarVisibility(true));
    dispatch(setChatInboxVisibility(true));
    dispatch(setSenderId(userId));
    await dispatch(chatSetChatAsReaded(userId));
  };

  return (
    <>
      <li className="nav-item dropdown">
        <a className="nav-link nav-icon" data-bs-toggle={"dropdown"}>
          <i className="bi bi-envelope-fill"></i>
          {unreadMsgConut > 0 && (
            <span className="badge bg-danger badge-number">
              {unreadMsgConut}
            </span>
          )}
        </a>
        {unreadMsgConut > 0 ? (
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
            <li className="dropdown-header">
              You have {unreadMsgConut} new messages
              <a>
                <span
                  className="badge rounded-pill bg-warning p-2 ms-2"
                  onClick={handleOpenChat}
                >
                  View all
                </span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            {/* only show the leatest 3 chat inboxes only */}
            {unreadMsgConut > 3
              ? myChatInboxs
                  .filter((msg) =>
                    msg.unreadMessages ? msg.unreadMessages > 0 : false
                  )
                  .slice(0, 3)
                  .map((usr) => (
                    <>
                      <li
                        className="message-item"
                        onClick={() => {
                          handleGotoInbox(usr.id);
                        }}
                      >
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
                  ))
              : myChatInboxs
                  .filter((msg) =>
                    msg.unreadMessages ? msg.unreadMessages > 0 : false
                  )
                  .map((usr, indx) => (
                    <>
                      <li
                        key={indx}
                        className="message-item"
                        onClick={() => {
                          handleGotoInbox(usr.id);
                        }}
                      >
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
              <a>View all messages</a>
            </li>
          </ul>
        ) : (
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
            <li className="dropdown-header">
              You have no new messages
              <a>
                <span
                  className="badge rounded-pill bg-warning p-2 ms-2"
                  onClick={handleOpenChat}
                >
                  View all
                </span>
              </a>
            </li>
          </ul>
        )}
      </li>
      <Chat />
    </>
  );
}

export default NavMessage;
