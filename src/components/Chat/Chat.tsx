import React, { useCallback, useEffect, useRef, useState } from "react";
import "./chat.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  chatGetUserInboxMessages,
  chatSendMessage,
  setSenderId,
  setChatBarVisibility,
  setChatInboxVisibility,
  chatGetUserInbox,
} from "../../features/chats/ChatSlice";
import { Badge } from "react-bootstrap";
import ChatInbox from "../../interfaces/ChatInbox";
import { getNewChatInbox } from "../../services/chatService";

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    senderId,
    loading,
    myChatInboxs,
    myChatInbox,
    chatBarVisibility,
    chatInboxVisibility,
  } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.account);
  const [currentChatInbox, setCurrentChatInbox] = useState<ChatInbox>();
  const [currentMessage, setCurrentMessage] = useState("");

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async () => {
    if (user?.id) {
      const msg = await dispatch(
        chatSendMessage({
          receiverId: senderId,
          message: currentMessage,
        })
      ).unwrap();
      if (msg) {
        setCurrentMessage("");
        console.log("Message sent: ", msg);
        scrollToBottom();
      }
    }
  };

  const handleInboxClose = () => {
    dispatch(setChatInboxVisibility(false));
    dispatch(setSenderId(""));
  };

  const handleMessageClick = async (id: string) => {
    dispatch(setSenderId(id));
    dispatch(setChatInboxVisibility(true));
  };

  const setChatInbox = useCallback(async () => {
    if (senderId !== "") {
      const temp = myChatInboxs.find((cht) => cht.id === senderId);
      if (temp) {
        setCurrentChatInbox(temp);
        const result = await dispatch(
          chatGetUserInboxMessages(senderId)
        ).unwrap();
        if (result) {
          dispatch(setChatInboxVisibility(true));
          scrollToBottom();
        }
      } else {
        const result = await getNewChatInbox(senderId);
        if (result) {
          setCurrentChatInbox(result);
          dispatch(setChatInboxVisibility(true));
          scrollToBottom();
        }
      }
    } else {
      return;
    }
  }, [chatInboxVisibility, myChatInbox]);

  useEffect(() => {
    setChatInbox();
  }, [senderId]);

  return (
    <div className={`chat-window ${chatBarVisibility ? "visible" : ""}`}>
      <div className="chat-header">
        <i
          className="bi bi-x-lg "
          onClick={() => {
            dispatch(setChatBarVisibility(false));
          }}
          style={{}}
        ></i>
      </div>
      <div className="chat-content">
        <div className="chat">
          <div className="messages">
            <h1>Messages</h1>
            <hr />
            {myChatInboxs.map((cht) => (
              <>
                <div
                  className="message"
                  onClick={() => {
                    handleMessageClick(cht?.id ?? "");
                  }}
                >
                  <img src={cht?.profilePictureURL} alt="" />
                  {cht.unreadMessages && cht.unreadMessages > 0 && (
                    <Badge bg="secondary">{cht.unreadMessages}</Badge>
                  )}
                  {cht.isActive && <Badge bg="primary">Online</Badge>}
                  <span>{cht.firstName}</span>
                  <p>{cht.lastMessage}</p>
                  <p>{cht.lastMessageDate?.toString()}</p>
                </div>
                <hr />
              </>
            ))}
          </div>
          {chatInboxVisibility && (
            <div className="chatBox">
              <div className="top">
                <div className="user">
                  <img src={currentChatInbox?.profilePictureURL || ""} alt="" />
                  {currentChatInbox?.firstName}
                </div>
                <span className="close" onClick={handleInboxClose}>
                  X
                </span>
              </div>
              <div className="center">
                {myChatInbox.map((msg_rc, idx) => (
                  <div
                    className={
                      msg_rc.senderId !== senderId
                        ? "chatMessage own"
                        : "chatMessage"
                    }
                  >
                    <p>{msg_rc.message}</p>
                    <span>{String(msg_rc.date)}</span>
                  </div>
                ))}

                <div ref={messagesEndRef} className="my-5" />
              </div>
              <div className="bottom">
                <textarea
                  placeholder="Type a message"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                />

                {loading ? (
                  <button>Sending</button>
                ) : (
                  <button onClick={handleSendMessage}>Send</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
