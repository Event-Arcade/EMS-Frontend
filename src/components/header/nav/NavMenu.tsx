import "./nav.css";
import NavNotice from "./navNotice/NavNotice";
import NavMessage from "./navMessage/NavMessage";
import NavAvatar from "./navAvatar/NavAvatar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useCallback, useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr"; // Import the necessary package
import {
  chatGetUserInbox,
  pushNewMessage,
  toggleUserActiveState,
} from "../../../features/chats/ChatSlice";
import { get } from "http";

function NavMenu({ handleShowSignUp }: { handleShowSignUp: () => void }) {
  const { isLoggedIn, user } = useAppSelector((state) => state.account);
  const {
    myChatInbox,
    myChatInboxs,
    senderId,
    chatInboxVisibility,
    chatBarVisibility,
  } = useAppSelector((state) => state.chat);
  const [chatClient, setChatClient] = useState<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      const newConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5257/personalChatHub", {
          withCredentials: false,
        })
        .withAutomaticReconnect()
        .build();

      setChatClient(newConnection);
    } else {
      chatClient?.stop();
      setChatClient(undefined);
    }
  }, [user]);

  const init = useCallback(() => {
    // Event listeners
    chatClient?.on("ReceiveMessage", (message: any) => {
      console.log("Message received: ", message);
      //check chat inbox is open
      if (senderId !== "" && chatInboxVisibility && chatBarVisibility) {
        if (message.senderId === senderId) {
          dispatch(pushNewMessage(message));
        }
      } else {
        dispatch(chatGetUserInbox(message.senderId));
      }
    });
    chatClient?.on("UserConnected", (message: any) => {
      console.log("User connected: ", message);
      dispatch(toggleUserActiveState(message));
    });
    chatClient?.on("UserOffline", (message: any) => {
      console.log("User offline: ", message);
      dispatch(toggleUserActiveState(message));
    });
  }, [chatClient]);

  useEffect(() => {
    if (chatClient) {
      chatClient.start().then(() => {
        console.log("Connection started:");
        chatClient.invoke("SetActive", user?.id);
      });
      init();
    }
    return () => {
      if (chatClient) {
        chatClient.stop().then(() => {
          console.log("Connection stopped");
        });
      }
    };
  }, [chatClient]);

  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        {!isLoggedIn ? (
          <li className="nav-item">
            <button onClick={handleShowSignUp} className="nav-link-btn-home">
              Sign In
            </button>
          </li>
        ) : (
          <>
            <NavNotice />
            <NavMessage />
            <NavAvatar />
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavMenu;
