import React, { useCallback, useEffect, useRef, useState } from "react";
import "./chat.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { User } from "../../interfaces/User";
import { getAccountById } from "../../services/authService";
import { sendChatMessage } from "../../features/chats/ChatSlice";
import ChatMessage from "../../interfaces/ChatMessage";

// Define the types for the Chat component props
interface ChatProps {
  isVisible: boolean; // Boolean value indicating whether the chat window is visible
  onClose: () => void; // Function to handle closing the chat window
  chatClient: any;
}

const Chat: React.FC<ChatProps> = ({ isVisible, onClose, chatClient }) => {
  const { isVisibleChat, senderId, loading, myMessages } = useAppSelector(
    (state) => state.chat
  );
  const { user } = useAppSelector((state) => state.account);
  const [sender, setSender] = useState<User>();
  const [chat, setChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [prevMessagesMine, setPrevMessagesMine] = useState<ChatMessage[]>([]);
  const [prevMessagesReciever, setPrevMessagesReciever] = useState<
    ChatMessage[]
  >([]);
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const init = useCallback(async () => {
    setChat(isVisibleChat);
    if (senderId) {
      const responseUser = await getAccountById(senderId);
      if (responseUser) {
        setSender(responseUser);
      }
    }
    scrollToBottom();
  }, [isVisibleChat, senderId]);

  useEffect(() => {
    init();
    scrollToBottom();
  }, [init]);

  useEffect(() => {
    if (!chat) {
      setCurrentMessage("");
    }
    const msgs = myMessages.filter(
      (m) => m.senderId === user?.id || m.receiverId === senderId
    );
    if (msgs) {
      if (msgs.length > 0) {
        const mine = msgs.filter((m) => m.senderId === user?.id);
        const reciever = msgs.filter((m) => m.senderId === senderId);
        setPrevMessagesMine(mine);
        setPrevMessagesReciever(reciever);
      }
    }
    scrollToBottom();
  }, [chat, myMessages]);

  const handleMessageClick = () => {
    setChat(true);
  };

  const handleSendMessage = async () => {
    if (user?.id) {
      const msg = await dispatch(
        sendChatMessage({
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
                {prevMessagesReciever.map((msg_rc, idx) => (
                  <div className="chatMessage">
                    <p >{msg_rc.message}</p>
                    <span >{String(msg_rc.date)}</span>
                  </div>
                ))}

                {prevMessagesMine.map((msg_my, idx) => (
                  <div  className="chatMessage own">
                    <p >{msg_my.message}</p>
                    <span >{String(msg_my.date)}</span>
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
