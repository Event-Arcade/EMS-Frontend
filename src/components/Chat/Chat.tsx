import React, { useCallback, useEffect, useState } from "react";
import "./chat.css";
import { useAppSelector } from "../../store/hooks";
import { User } from "../../interfaces/User";
import { getAccountById } from "../../services/authService";

// Define the types for the Chat component props
interface ChatProps {
  isVisible: boolean; // Boolean value indicating whether the chat window is visible
  onClose: () => void; // Function to handle closing the chat window
  chatClient: any;
}

const Chat: React.FC<ChatProps> = ({ isVisible, onClose, chatClient }) => {
  const { isVisibleChat, senderId } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.account);
  const [sender, setSender] = useState<User>();
  const [chat, setChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const init = useCallback(async () => {
    setChat(isVisibleChat);
    if (senderId) {
      const responseUser = await getAccountById(senderId);
      if (responseUser) {
        setSender(responseUser);
      }
    }
  }, [isVisibleChat, senderId]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!chat) {
      setCurrentMessage("");
    }
  }, [chat]);

  const handleMessageClick = () => {
    setChat(true);
  };

  const handleSendMessage = async () => {
    if (user?.id) {
      await chatClient.sendMessage(user.id, senderId, currentMessage);
    }
  };

  return (
    <div className={`chat-window ${isVisible ? "visible" : ""}`}>
      <div className="chat-header">
        <i className="bi bi-x-lg " onClick={onClose} style={{}}></i>
      </div>
      <div className="chat-content">
        <div className="chat">
          <div className="messages">
            <h1>Messages</h1>
            <div className="message" onClick={handleMessageClick}>
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <span>John John</span>
              <p>Lorem ipsum dolor sit amet...</p>
            </div>
            <div className="message">
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <span>John John</span>
              <p>Lorem ipsum dolor sit amet...</p>
            </div>
            <div className="message">
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <span>John John</span>
              <p>Lorem ipsum dolor sit amet...</p>
            </div>
            <div className="message">
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <span>John John</span>
              <p>Lorem ipsum dolor sit amet...</p>
            </div>
            <div className="message">
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <span>John John</span>
              <p>Lorem ipsum dolor sit amet...</p>
            </div>
            <div className="message">
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <span>John John</span>
              <p>Lorem ipsum dolor sit amet...</p>
            </div>
          </div>
          {chat && (
            <div className="chatBox">
              <div className="top">
                <div className="user">
                  <img src={sender?.profilePictureURL || ""} alt="" />
                  {sender?.firstName}
                </div>
                <span className="close" onClick={() => setChat(false)}>
                  X
                </span>
              </div>
              <div className="center">
                {/* <div className="chatMessage">
                  <p>Lorem ipsum dolor sit amet</p>
                  <span>1 hour ago</span>
                </div> */}
              </div>
              <div className="bottom">
                <textarea
                  placeholder="Type a message"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
